# Pacote Medieval — fundos, texturas e ornamentos

Inspirado no visual de manuscrito medieval (azul damasco, pergaminho, carmesim, dourado).
Abra **exemplo.html** no navegador para ver tudo funcionando junto.

## Pastas
| Pasta | O que tem | Como usar |
|---|---|---|
| 01-fundos | Damasco azul, damasco carmesim, papel claro, pergaminho (todos *-tile* se repetem sem emenda), pergaminho antigo e grunge escuro 1920px | `background-repeat: repeat` nos *tile*; `cover` nos de 1920 |
| 02-texturas-overlay | Padrões damasco em branco/preto transparente, granulado, manchas de papel, grunge claro | Coloque por cima da **sua cor** com `opacity` 0.1–0.4 ou `mix-blend-mode: overlay / soft-light` |
| 03-bordas-rasgadas | Bordas de papel rasgado (topo e base) em 5 cores + 2 máscaras SVG | Repetem na horizontal (`repeat-x`). As máscaras SVG pintam qualquer cor via `mask-image` |
| 04-ornamentos | Sol meio e inteiro, estrela, cruz flor-de-lis, hera nos 4 cantos, rolo de pergaminho, faixa turquesa, placa dourada | PNG + WebP transparentes |
| 05-elementos-svg | Setas, losangos (paginação), estrelas, cruz de canto, moldura, divisor, botões (ingresso, etiqueta, contorno), play | Vetores — escaláveis e recoloríveis |

## Recolorir os SVGs com a sua paleta
Os SVGs leem variáveis CSS quando colados **inline** no HTML:
```css
:root { --ornament: SUA_COR_DOURADA; --ornament-dark: SUA_COR_ESCURA; --ornament-line: SUA_COR_CLARA; }
```
Usados como `<img>` ou `background`, aparecem no dourado padrão — para mudar, abra o arquivo e troque o `#E3B04B`.

## Receitas prontas
`estilos-medievais.css` traz classes prontas: `.bg-damasco-azul`, `.bg-pergaminho`, `.bg-damasco-carmesim`,
`.bg-damasco-sua-cor`, `.granulado`, `.rasgo-topo`, `.rasgo-base`, `.rasgo-cor`, `.divisor-sol`, `.moldura`,
`.btn-ingresso`, `.btn-etiqueta`, `.btn-contorno`, `.faixa-titulo`, `.selo-estrela`, `.cantos-hera`.

## Dicas
- Prefira os `.webp` no site (mais leves); os `.png/.jpg` ficam como originais.
- Tamanhos de repetição sugeridos: damasco 450–650px, papel 1024px.
- Imagens geradas por IA para uso no seu projeto; não use o logotipo/arte oficial do jogo de referência.
