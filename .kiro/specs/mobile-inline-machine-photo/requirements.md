# Requirements Document

## Introduction

No componente `StructureSection`, a seção "Parque de Máquinas" exibe uma lista de máquinas à esquerda e uma imagem grande à direita no layout desktop. No mobile, o layout empilha verticalmente, mas a imagem fica separada dos detalhes da máquina, forçando o usuário a rolar para baixo para ver a foto correspondente ao card expandido.

Esta feature adiciona a exibição inline da foto da máquina dentro do card expandido no mobile (telas < 1024px), eliminando a necessidade de rolagem. No desktop, o comportamento atual é preservado integralmente.

## Glossary

- **StructureSection**: Componente React localizado em `src/components/StructureSection.tsx` que renderiza uma seção de equipamentos com lista de cards e imagem lateral.
- **Card**: Elemento clicável que representa uma máquina na lista, podendo estar no estado colapsado ou expandido.
- **Card Expandido**: Estado do card após o usuário clicar nele, exibindo título, descrição e detalhes técnicos (capacidade, fabricante, observações).
- **Foto Inline**: Imagem da máquina renderizada dentro do card expandido, abaixo dos detalhes textuais, visível apenas no mobile.
- **Image Side**: Bloco de imagem grande à direita (desktop) ou abaixo da lista (mobile) atualmente presente no componente.
- **photoMap**: Objeto `Record<string, string>` que mapeia nomes de arquivo (sem extensão) para URLs de fotos do OneDrive.
- **photosLoading**: Booleano que indica se as fotos remotas ainda estão sendo carregadas.
- **Skeleton**: Placeholder animado exibido enquanto a foto está sendo carregada.
- **Mobile**: Viewport com largura inferior a 1024px (breakpoint `lg` do Tailwind CSS).
- **Desktop**: Viewport com largura igual ou superior a 1024px.

## Requirements

### Requirement 1: Exibição de foto inline no card expandido (mobile)

**User Story:** Como usuário mobile, quero ver a foto da máquina dentro do card expandido, para não precisar rolar a página para encontrar a imagem correspondente.

#### Acceptance Criteria

1. WHEN o usuário clica em um card no mobile, THE StructureSection SHALL exibir a foto da máquina inline, abaixo dos detalhes textuais (capacidade, fabricante, observações), dentro do mesmo card expandido.
2. WHEN o usuário clica em um card diferente no mobile, THE StructureSection SHALL substituir a foto inline pelo da máquina recém-selecionada.
3. WHILE o card está colapsado no mobile, THE StructureSection SHALL ocultar a foto inline desse card.
4. THE StructureSection SHALL exibir a foto inline exclusivamente em viewports com largura inferior a 1024px (breakpoint `lg`).
5. THE StructureSection SHALL manter o comportamento atual do Image Side em viewports com largura igual ou superior a 1024px, sem qualquer alteração.

### Requirement 2: Estado de loading e skeleton da foto inline

**User Story:** Como usuário mobile, quero ver um placeholder enquanto a foto carrega, para que a interface não quebre ou apresente espaços em branco inesperados.

#### Acceptance Criteria

1. WHEN `photosLoading` for `true` e a imagem do card ativo for um asset local (caminho iniciando com `/assets/`), THE StructureSection SHALL exibir um skeleton animado no lugar da foto inline.
2. WHEN `photosLoading` for `false` e a URL da foto estiver disponível no `photoMap`, THE StructureSection SHALL exibir a foto remota do OneDrive na foto inline.
3. IF a chave correspondente à imagem não existir no `photoMap`, THEN THE StructureSection SHALL exibir a imagem local original como fallback na foto inline.
4. THE StructureSection SHALL aplicar a função `resolveImageSrc` existente para determinar a fonte da foto inline, garantindo consistência com o Image Side do desktop.

### Requirement 3: Transição suave da foto inline

**User Story:** Como usuário mobile, quero que a foto apareça com uma animação suave ao expandir o card, para que a experiência seja consistente com o restante do design.

#### Acceptance Criteria

1. WHEN a foto inline se torna visível após a expansão do card, THE StructureSection SHALL animar a entrada da imagem com fade-in e leve escala (consistente com as animações `motion` existentes no componente).
2. WHEN o usuário troca de card ativo no mobile, THE StructureSection SHALL animar a transição entre fotos inline usando `AnimatePresence` com `mode="wait"`.
3. THE StructureSection SHALL utilizar a biblioteca `framer-motion` já presente no projeto para todas as animações da foto inline.

### Requirement 4: Ocultação do Image Side no mobile

**User Story:** Como usuário mobile, quero que a imagem grande separada seja ocultada, para evitar redundância com a foto inline já exibida dentro do card.

#### Acceptance Criteria

1. THE StructureSection SHALL ocultar o bloco Image Side em viewports com largura inferior a 1024px.
2. THE StructureSection SHALL exibir o bloco Image Side normalmente em viewports com largura igual ou superior a 1024px.
3. THE StructureSection SHALL implementar a ocultação via classes Tailwind CSS (`hidden lg:block` ou equivalente), sem lógica JavaScript adicional para controle de visibilidade.

### Requirement 5: Proporção e estilo da foto inline

**User Story:** Como usuário mobile, quero que a foto inline tenha proporções e estilo adequados ao contexto do card, para que a leitura e visualização sejam agradáveis.

#### Acceptance Criteria

1. THE StructureSection SHALL renderizar a foto inline com proporção de aspecto 4:3, consistente com o Image Side do desktop.
2. THE StructureSection SHALL aplicar bordas arredondadas (`rounded-xl` ou equivalente) e `overflow-hidden` na foto inline, mantendo consistência visual com o Image Side.
3. THE StructureSection SHALL renderizar a foto inline com largura total do card (`w-full`).
4. THE StructureSection SHALL utilizar o componente `Image` do Next.js com a prop `fill` e `object-cover` para a foto inline, garantindo cobertura correta do container.
