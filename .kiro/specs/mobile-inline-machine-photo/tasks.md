# Tasks

## Task List

- [x] 1. Ocultar Image Side no mobile
  - [x] 1.1 Adicionar `hidden lg:block` ao container `<div className="lg:w-1/2 w-full">` do Image Side em `StructureSection.tsx`
  - [x] 1.2 Verificar que o Image Side continua visível no desktop (classes `lg:w-1/2` preservadas)

- [x] 2. Adicionar bloco de foto inline no card expandido
  - [x] 2.1 Dentro do `motion.div` expansível existente (após os detalhes textuais de capacidade/fabricante/observações), adicionar container `<div className="mt-4 block lg:hidden">` com `relative aspect-[4/3] w-full rounded-xl overflow-hidden`
  - [x] 2.2 Dentro do container, adicionar `AnimatePresence mode="wait"` envolvendo a lógica de renderização da foto
  - [x] 2.3 Implementar lógica condicional usando `resolveImageSrc(item.image, photoMap ?? {}, photosLoading ?? false)`:
    - Se `showSkeleton`: renderizar `motion.div` com `key="skeleton"` e `className="absolute inset-0 animate-pulse bg-slate-200"`
    - Se não skeleton: renderizar `motion.div` com `key={src ?? 'local'}`, `initial={{ opacity: 0, scale: 1.02 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.3 }}` contendo `Image` com `src={src}`, `fill`, `className="object-cover"`, `unoptimized={src.startsWith('http')}`

- [x] 3. Escrever testes de propriedade (PBT) com fast-check
  - [x] 3.1 Criar arquivo `src/components/__tests__/mobile-inline-machine-photo.test.tsx`
  - [x] 3.2 Implementar Property 1: para qualquer lista de items e activeIndex válido, o bloco de foto inline está presente apenas no card ativo (mínimo 100 iterações)
    - Tag: `Feature: mobile-inline-machine-photo, Property 1: foto inline presente apenas no card ativo`
  - [x] 3.3 Implementar Property 2: para qualquer item com src local e `photosLoading=true`, o skeleton é renderizado e `<img>` está ausente (mínimo 100 iterações)
    - Tag: `Feature: mobile-inline-machine-photo, Property 2: skeleton quando photosLoading e src local`
  - [x] 3.4 Implementar Property 3: para qualquer item e photoMap com a chave correspondente, o `src` do Image inline é igual ao valor do photoMap (mínimo 100 iterações)
    - Tag: `Feature: mobile-inline-machine-photo, Property 3: src da foto inline igual ao valor do photoMap`

- [x] 4. Escrever testes de exemplo (unit)
  - [x] 4.1 Image Side tem classe `hidden lg:block`
  - [x] 4.2 Foto inline tem classes `block lg:hidden`, `aspect-[4/3]`, `rounded-xl`, `overflow-hidden`, `w-full`
  - [x] 4.3 Componente `Image` da foto inline tem props `fill` e `className="object-cover"`
  - [x] 4.4 Fallback: chave ausente no `photoMap` → `src` do Image é o `originalSrc`
  - [x] 4.5 `AnimatePresence` com `mode="wait"` envolve o bloco de foto inline

- [x] 5. Validação final
  - [x] 5.1 Rodar `npx tsc --noEmit` para verificar ausência de erros de tipo
  - [x] 5.2 Rodar `vitest --run` para confirmar que todos os testes passam
