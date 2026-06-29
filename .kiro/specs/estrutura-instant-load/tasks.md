# Tasks: estrutura-instant-load

## Task List

- [x] 1. Refatorar `page.tsx` para Server Component síncrono
  - [x] 1.1 Remover `async` da função `Estrutura` e remover o `await getAllOneDrivePhotos()`
  - [x] 1.2 Remover a lógica de construção do `photoMap` e do `dynamicSections` do `page.tsx`
  - [x] 1.3 Remover o import de `getAllOneDrivePhotos` de `page.tsx`
  - [x] 1.4 Substituir o bloco de renderização das seções pelo componente `OneDrivePhotosLoader`, passando o array `sections` como prop

- [x] 2. Criar o componente `OneDrivePhotosLoader`
  - [x] 2.1 Criar o arquivo `src/components/OneDrivePhotosLoader.tsx` com diretiva `'use client'`
  - [x] 2.2 Implementar estado `photoMap` (inicialmente `{}`) e `photosLoading` (inicialmente `true`)
  - [x] 2.3 Implementar `useEffect` que chama `getAllOneDrivePhotos()` uma única vez após montagem, constrói o `photoMap` e atualiza o estado
  - [x] 2.4 Implementar tratamento de erro silencioso no `catch` (sem exibir mensagem ao usuário), garantindo que `photosLoading` vai para `false` no `finally`
  - [x] 2.5 Renderizar os componentes `StructureSection` passando `photoMap`, `photosLoading`, e as props estáticas de cada seção

- [x] 3. Atualizar `StructureSection` para suportar skeleton e photoMap
  - [x] 3.1 Adicionar as props opcionais `photoMap?: Record<string, string>` e `photosLoading?: boolean` à interface `StructureSectionProps`
  - [x] 3.2 Implementar a função auxiliar `resolveImageSrc` que determina se deve exibir skeleton, imagem do OneDrive ou fallback local
  - [x] 3.3 No render da imagem ativa (Image Side), substituir o `<Image>` por lógica condicional: skeleton quando `showSkeleton=true`, `<Image>` com `transition-opacity duration-300` quando `showSkeleton=false`
  - [x] 3.4 Garantir que o skeleton tem `absolute inset-0` e `animate-pulse bg-slate-200` para manter as dimensões do contêiner sem layout shift
  - [x] 3.5 Garantir que todo o conteúdo textual (título, descrição, capacidade, fabricante, observações) continua sendo renderizado independentemente do estado do `photoMap`

- [x] 4. Verificar que `PhysicalStructureSection` não foi alterado
  - [x] 4.1 Confirmar que `src/components/PhysicalStructureSection.tsx` não recebeu nenhuma modificação e continua funcionando de forma independente

- [x] 5. Testes
  - [x] 5.1 Escrever testes de propriedade (fast-check) para a função de construção do `photoMap` (Property 1)
  - [x] 5.2 Escrever testes de propriedade para a lógica de `resolveImageSrc`: skeleton para imagens locais durante loading (Property 2), imagem OneDrive quando há correspondência (Property 3), fallback quando não há correspondência (Property 4)
  - [x] 5.3 Escrever testes de propriedade para renderização de conteúdo textual independente do photoMap (Property 5)
  - [x] 5.4 Escrever testes de exemplo para `OneDrivePhotosLoader`: chamada única após montagem, comportamento silencioso em caso de erro, ausência de re-fetch em re-renders
  - [x] 5.5 Escrever teste de exemplo verificando que a página renderiza as 7 seções com seus IDs corretos
