---
name: Alinhamento do grid de treliça no hero
description: Valores exatos que alinham o texto e a linha horizontal do hero à treliça — nunca alterar
type: constraint
---
O alinhamento do hero com o grid (treliça) já está definido e NÃO pode ser alterado em nenhuma outra tarefa:

- SVG: `h-[calc(100%-160px)]` em `TrussGrid` (src/routes/index.tsx)
- Bloco de texto: `bottom-[109px] lg:bottom-[calc(12.663%+11px)]`
- Linha/rodapé do hero: `lg:top-[calc(87.337%+21px)]` com `pt-4 sm:pt-6`

**Why:** esses valores casam com a linha horizontal do viewBox (y=1223.59). Qualquer mudança de padding, delay ou layout no hero deve preservá-los.