# DESIGN — site do Croniu

Complementa o design system que já existe no código (tokens em
`src/app/globals.css`, primitivos em `src/components/ui/`). Este arquivo
registra **as decisões visuais e o que não fazer**, não repete os tokens.

## Tese visual

O Croniu vende controle da rotina para quem atende pessoas em ciclos. A página
é reconhecível por uma coisa: **ela mostra a tela real do produto em tamanho
que dá para ler**. Não por ilustração, não por mockup em perspectiva, não por
metáfora — pela interface, no enquadramento que prova a frase ao lado dela.

Público: personal trainers e profissionais de atendimento recorrente, quase
sempre chegando pelo celular.

## Telas do produto

Regra principal: **recorte, não janela inteira**.

As capturas em `public/images/demo/` são prints de viewport de um monitor
(3024×1800), geradas por `scripts/demo-harness` a partir do produto real com
dados fictícios. Exibir esse arquivo inteiro dentro de uma coluna de site dá
três problemas de uma vez:

1. o texto da interface cai para ~6px e nada é legível;
2. aparecem áreas vazias grandes, porque a tela do app tem menos conteúdo que
   o viewport que a capturou;
3. a última linha visível fica cortada no meio pelo limite do viewport, e o
   corte parece defeito.

Por isso as telas entram por `ProductCrop` (`src/components/ui/product-crop.tsx`),
que mostra só a região que sustenta a afirmação da seção. Ao definir um
recorte:

- **Comece e termine numa borda de cartão da tela real.** Cortar um item ao
  meio faz o enquadramento parecer defeito, não escolha. O limite é o
  conteúdo — as proporções dos recortes não precisam ser idênticas.
- **Dê um recorte próprio para o celular** (`cropMobile`), mais estreito e com
  menos itens. O recorte de desktop espremido em 358px volta a ~0,2× de
  escala, ou seja, ilegível de novo. O lado direito dessas telas é espaço
  vazio e distintivos que o texto da seção já afirma.
- **Nomeie a tela de origem** (`screen="Croniu · Agenda"`). Sem a faixa, o
  recorte vira mais um cartão do site. A faixa não simula uma janela inteira:
  ela só declara de onde o pedaço veio.
- **`sizes` descreve a imagem inteira, não o contêiner.** O recorte amplia a
  origem por `100 / crop.width`; por isso `ProductCrop` recebe a largura do
  contêiner e faz essa conta. Escrito errado, o Next entrega um arquivo
  pequeno e o texto sai borrado.
- Os pixels da captura nunca são alterados — o enquadramento é só CSS. Não
  existe arquivo derivado para manter em sincronia com o produto.

Custo aceito: o recorte de celular amplia bastante, então o telefone baixa a
maior variante do `srcset` (~120KB por tela, 490KB de imagens na home). A
legibilidade vale esse peso; se for preciso reduzir, reduza o número de telas
na página, não o zoom.

Nunca: recriar uma interface que não existe no produto, apresentar placeholder
como tela real, ou mostrar recurso que o Croniu não oferece. Quando a tela real
tem um elemento que a página não pode afirmar, recrie **apenas** os cartões
correspondentes com os mesmos rótulos e hierarquia, e comente o porquê no
componente (ver o cartão "Ciclo atual"/"Avaliações").

## Ritmo da página

A home tem oito blocos. O risco é todos terem a mesma cara: pílula colorida,
título serifado centralizado, parágrafo, imagem clara no meio de muito espaço
vazio — repetido cinco vezes seguidas.

- A abertura de seção continua centralizada (`SectionHeading`), porque ancora
  o assunto.
- **Dentro da seção de produto, as linhas são assimétricas e alinhadas à
  esquerda**, alternando o lado da imagem. É a quebra de ritmo no meio da
  página.
- No celular, o título vem sempre antes da imagem: um recorte de tela antes do
  próprio título chega sem contexto.
- Colunas de alturas diferentes alinham por `items-start`, não `items-end` —
  senão os rótulos das duas colunas ficam em linhas distintas e o desencontro
  parece acidental.

## Movimento

Movimento só onde ele explica algo: a convergência da rotina espalhada para o
workspace, e a entrada suave das composições acima da dobra. Nada de parallax
em toda seção, nem brilho decorativo sem função.

Todo movimento tem estado parado definido em `prefers-reduced-motion: reduce`,
e o estado parado precisa ser legível sozinho — barra de progresso cheia em vez
de vazia, nenhum avanço automático.

## Evidência antes de apresentar

`npm run visual-check` usa `fullPage`, que **não dispara o lazy-load**: as
capturas saem com molduras de produto em branco e não servem como prova de que
a imagem aparece para o visitante. Para avaliar visual, role a página de fato
antes de capturar (o script de sondagem usado nas revisões faz isso) e confirme
`img.complete && img.naturalWidth > 0`.

Cuidado ao medir nitidez: `naturalWidth` vem **corrigido pela densidade**
quando a imagem sai de um `srcset` com descritores `w`, então ele tende a
bater com o valor escrito em `sizes` mesmo quando o arquivo entregue é bem
maior. Compare o parâmetro `w` de `currentSrc` com `clientWidth ×
devicePixelRatio`.
