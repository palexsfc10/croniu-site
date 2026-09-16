# Demo harness — telas e vídeo a partir do produto real

Gera as imagens de `public/images/demo/` e o vídeo de demonstração rodando o
**front-end real do Croniu** (`apps/web` do repositório `croniu-app`) contra uma
API falsa com dados fictícios.

Por que assim, e não com screenshots tirados à mão:

- **Não envelhece.** Quando o produto muda, recapturar é reexecutar o script —
  não abrir um editor de imagem e recortar de novo.
- **É o produto de verdade.** Mesmo código, mesmos componentes, mesma
  tipografia. Nada de UI recriada, que é a regra já registrada em
  `ProductScreenshot`.
- **Sem dado real.** Marina Prado, seus clientes e seus valores são fictícios e
  vivem em `fixtures.mjs`. Nenhum ambiente real é acessado — nem produção, nem
  homologação. Isso também elimina o risco de vazar um badge de ambiente ou o
  nome de um cliente de verdade numa peça de marketing.

## Rodar

Precisa do repositório do produto por perto. O backend **não** é necessário: a
API falsa cobre os endpoints que essas telas pedem.

```bash
# 1) API falsa (porta 8010)
node scripts/demo-harness/fake-api.mjs

# 2) Front-end do produto apontando para ela (no repo croniu-app)
cd ../croniu-app/apps/web
API_PROXY_TARGET=http://127.0.0.1:8010 NEXT_PUBLIC_API_URL="" npx next dev --hostname 127.0.0.1 --port 3000

# 3) De volta aqui: capturar as telas e/ou gravar o vídeo
node scripts/demo-harness/capture.mjs
node scripts/demo-harness/record.mjs
```

Variáveis: `DEMO_APP_URL` (padrão `http://127.0.0.1:3000`) e `CHROMIUM_PATH`
quando o Chromium do Playwright estiver fora do caminho padrão.

O vídeo sai em `scripts/demo-harness/output/` (fora do Git) no formato `.webm`.
Para anúncios em redes que exigem H.264, converta:

```bash
ffmpeg -i output/<arquivo>.webm -c:v libx264 -crf 23 -pix_fmt yuv420p demo.mp4
```

## Quando uma tela quebrar

O `fake-api.mjs` registra toda rota pedida em `output/requests.log` e devolve 404 para
o que não conhece. Esse log é o caminho para descobrir o que falta: rode, veja
qual rota apareceu, e escreva o fixture correspondente.

Os formatos de resposta vêm dos tipos do próprio produto — `apps/web/src/lib/api.ts`
e os tipos locais de cada tela. Devolver o formato errado não dá erro de rede:
derruba a página com `TypeError` no cliente. Quando isso acontecer, o tipo no
código do produto é a fonte da verdade, não o palpite.
