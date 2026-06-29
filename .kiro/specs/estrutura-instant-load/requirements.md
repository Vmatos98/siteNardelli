# Requirements Document

## Introduction

A página `/estrutura` de um site Next.js para uma empresa de usinagem atualmente bloqueia a navegação enquanto aguarda a resposta da API do OneDrive antes de renderizar qualquer HTML. Isso causa uma experiência ruim: ao clicar no link "Estrutura" no menu, a página parece não responder por vários segundos.

Esta feature transforma a página para que ela abra imediatamente com os dados estáticos (imagens fallback locais) e, em paralelo, busque as fotos do OneDrive no lado do cliente, substituindo as imagens quando disponíveis e exibindo skeletons nas posições que ainda estão carregando.

## Glossary

- **Page**: O Server Component `src/app/estrutura/page.tsx` que renderiza a página `/estrutura`.
- **StructureSection**: Componente cliente `src/components/StructureSection.tsx` que exibe seções de máquinas com imagens e lista interativa.
- **PhysicalStructureSection**: Componente cliente `src/components/PhysicalStructureSection.tsx` que exibe a galeria de fotos da estrutura física.
- **OneDriveLoader**: Novo componente cliente responsável por buscar as fotos do OneDrive e distribuir as URLs para os demais componentes.
- **PhotoMap**: Dicionário em memória com chave `nameWithoutExt` (ex: `"e011"`) e valor URL da foto no OneDrive.
- **Fallback_Image**: Imagem local estática (ex: `/assets/e011.jpg`) usada enquanto a foto do OneDrive não está disponível.
- **Skeleton**: Placeholder visual animado exibido no lugar de uma imagem enquanto ela ainda está sendo carregada.
- **getAllOneDrivePhotos**: Server Action em `src/app/estrutura/actions.ts` que busca todas as fotos do álbum "estrutura" no OneDrive.
- **sections**: Array de dados estáticos definido em `page.tsx` contendo as seções de máquinas com imagens fallback locais.

## Requirements

### Requirement 1: Renderização Imediata da Página

**User Story:** Como visitante do site, quero que a página `/estrutura` abra imediatamente ao clicar no menu, para que eu tenha feedback visual instantâneo de que a navegação funcionou.

#### Acceptance Criteria

1. THE Page SHALL renderizar e exibir o HTML inicial em menos de 500ms após a navegação, independentemente do tempo de resposta da API do OneDrive.
2. THE Page SHALL exibir o Hero Section, o Header, o título "Parque de Máquinas" e todas as seções de máquinas com imagens fallback locais antes de qualquer requisição ao OneDrive ser concluída.
3. THE Page SHALL ser um Server Component síncrono (sem `await` de chamadas externas no corpo do componente), delegando a busca de dados ao OneDriveLoader.

---

### Requirement 2: Busca Assíncrona das Fotos no Cliente

**User Story:** Como visitante do site, quero que as fotos reais das máquinas sejam carregadas automaticamente em segundo plano, para que eu veja as imagens mais atualizadas sem precisar aguardar antes de ver a página.

#### Acceptance Criteria

1. THE OneDriveLoader SHALL invocar `getAllOneDrivePhotos()` via Server Action após a montagem do componente no cliente.
2. WHEN `getAllOneDrivePhotos()` retornar com sucesso, THE OneDriveLoader SHALL construir o PhotoMap e disponibilizá-lo para os componentes filhos.
3. WHEN `getAllOneDrivePhotos()` falhar com qualquer erro, THE OneDriveLoader SHALL manter as imagens fallback locais visíveis sem exibir mensagem de erro ao usuário.
4. THE OneDriveLoader SHALL iniciar a busca das fotos apenas uma vez por montagem do componente, sem re-fetches desnecessários.

---

### Requirement 3: Estado de Loading com Skeleton nas Imagens

**User Story:** Como visitante do site, quero ver um indicador visual nas imagens que ainda estão sendo carregadas do OneDrive, para que eu entenda que o conteúdo está chegando e a página não está quebrada.

#### Acceptance Criteria

1. WHILE o OneDriveLoader ainda não concluiu a busca das fotos, THE StructureSection SHALL exibir um Skeleton animado no lugar de cada imagem que possui correspondência esperada no OneDrive.
2. WHEN o PhotoMap estiver disponível e uma imagem tiver correspondência, THE StructureSection SHALL substituir o Skeleton pela imagem do OneDrive com uma transição suave de opacidade.
3. WHEN o PhotoMap estiver disponível e uma imagem não tiver correspondência no OneDrive, THE StructureSection SHALL exibir a Fallback_Image sem exibir Skeleton.
4. THE Skeleton SHALL ter as mesmas dimensões do contêiner de imagem que ocupa, mantendo o layout estável durante o carregamento (sem layout shift).
5. THE Skeleton SHALL utilizar animação de pulso (pulse) consistente com o design system existente no projeto (Tailwind CSS).

---

### Requirement 4: Substituição das Imagens sem Reflow de Layout

**User Story:** Como visitante do site, quero que a troca das imagens fallback pelas fotos do OneDrive aconteça de forma suave, para que a experiência não seja brusca ou cause saltos visuais na página.

#### Acceptance Criteria

1. WHEN uma foto do OneDrive é carregada, THE StructureSection SHALL substituir a imagem anterior com uma transição de opacidade de no mínimo 300ms.
2. THE Page SHALL manter dimensões e posicionamento de todos os elementos estáticos inalterados durante e após o carregamento das fotos do OneDrive.
3. THE PhysicalStructureSection SHALL manter seu comportamento de loading atual (spinner próprio) sem alterações, pois já implementa busca assíncrona independente.

---

### Requirement 5: Compatibilidade com a Estrutura Existente

**User Story:** Como desenvolvedor, quero que a refatoração não quebre nenhuma funcionalidade existente da página, para que os usuários continuem tendo acesso a todos os recursos atuais.

#### Acceptance Criteria

1. THE StructureSection SHALL continuar recebendo os dados de `sections` (título, descrição, capacidade, fabricante, observações) como props estáticas, sem dependência do OneDriveLoader para renderizar o conteúdo textual.
2. THE Page SHALL continuar renderizando todas as 7 seções de máquinas (precisao, cnc, torneamento, fresagem, mandrilhamento, tratamento, manutencao) com seus respectivos itens.
3. WHEN o OneDriveLoader não está disponível ou falha, THE StructureSection SHALL exibir as Fallback_Images locais para todos os itens, mantendo a página completamente funcional.
4. THE PhysicalStructureSection SHALL continuar funcionando de forma independente, buscando as fotos `e001` a `e010` via `getEstruturaPhotos()` sem alterações em seu comportamento.
