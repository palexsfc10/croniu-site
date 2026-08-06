# REPORT â€” Site institucional Croniu (marketing)

## Escopo e commits

RepositÃ³rio dedicado `croniu-site`, independente do monorepo do produto, branch `feature/marketing-site`.

| Item | Valor |
|---|---|
| Base SHA (main, antes deste trabalho) | `f7f07a3fb35673e7ff7b1810f70fe9f8034306ed` |
| SHA final (branch `feature/marketing-site`) | `f4b08ead180e8a03aa265f227b75091b425dcd58` |
| Push realizado | **NÃ£o** â€” trabalho permanece local |
| Deploy / DNS / merge | **NÃ£o realizado** |
| AlteraÃ§Ã£o no monorepo `C:\projetos\croniu` | **Nenhuma** (verificado via `git status` antes e depois â€” apenas o estado prÃ©-existente, nÃ£o relacionado a esta tarefa) |

Commits nesta branch (do mais antigo ao mais novo, apÃ³s o commit inicial vazio):

1. `273660d` â€” `chore: scaffold Next.js 16 marketing site with brand and UI primitives`
2. `516fb08` â€” `feat: add full landing page with all required sections`
3. `bb0ee45` â€” `feat: add SEO metadata assets and legal placeholder pages`
4. `9112404` â€” `docs: add visual-check script and delivery report`
5. `b6a2b79` â€” `docs: fix final commit SHA reference in REPORT.md`

O tip exato apÃ³s este documento Ã© obtido com `git rev-parse HEAD` na branch `feature/marketing-site`.

## Estrutura entregue

```
src/app/
  page.tsx, layout.tsx, globals.css, not-found.tsx
  privacidade/page.tsx, termos/page.tsx
  robots.ts, sitemap.ts, opengraph-image.tsx, twitter-image.tsx, apple-icon.tsx
src/components/
  brand/brand-wordmark.tsx (+ teste)
  ui/ (button, badge, card, container, section-heading, icons) (+ teste do button)
  landing/ (site-header, site-footer, hero, pain-before-after, ai-dark-section,
            daily-focus, features-bento, audience, how-it-works, client-portal,
            pricing, faq, final-cta, ai-chat-demo, cycle-cards-stack) (+ 4 testes)
src/lib/
  site.ts (config de env + preÃ§o/URLs), analytics.ts (stub), cn.ts, og-image.tsx (markup OG)
public/icons/icon.svg
scripts/visual-check.mjs (checagem de overflow horizontal via Playwright)
.env.example, .gitignore, README.md, REPORT.md
```

Todas as 11 seÃ§Ãµes da landing pedidas estÃ£o implementadas na home (`src/app/page.tsx`), com header sticky e footer conforme especificaÃ§Ã£o.

## VariÃ¡veis de ambiente

Definidas em `.env.example` com os valores/documentaÃ§Ã£o pedidos:

- `NEXT_PUBLIC_SITE_URL=https://croniu.com.br`
- `NEXT_PUBLIC_APP_URL=https://app.croniu.com.br`
- `NEXT_PUBLIC_PRICE_CENTS=2990`
- `NEXT_PUBLIC_TRIAL_DAYS=7`
- `NEXT_PUBLIC_SUPPORT_EMAIL=` (vazio â€” rodapÃ© omite o e-mail quando vazio, comportamento testado)
- `NEXT_PUBLIC_AI_ACTION_DEMOS=false` (quando `true`, a seÃ§Ã£o de IA escura mostra um exemplo estendido de aÃ§Ã£o de escrita com confirmaÃ§Ã£o; comportamento coberto por teste)
- `NEXT_PUBLIC_ANALYTICS_ENABLED=false` (stub em `src/lib/analytics.ts`, nÃ£o dispara nada sem fornecedor)

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3001
```

Para validar produÃ§Ã£o localmente:

```bash
npm run build
npm run start                # http://localhost:3001
```

## Resultado dos gates

Todos executados em `C:\projetos\croniu-site`, Node/npm do ambiente local, no dia da entrega.

| Gate | Comando | Resultado |
|---|---|---|
| Install | `npm install` | âœ… OK (453 pacotes) |
| Lint | `npm run lint` | âœ… 0 erros, 0 warnings |
| Typecheck | `npm run typecheck` | âœ… sem erros |
| Testes | `npm run test` | âœ… 7 arquivos, 21 testes passando (Vitest + Testing Library) |
| Build | `npm run build` | âœ… build de produÃ§Ã£o concluÃ­do (Turbopack), 9 rotas geradas estaticamente |

Cobertura de testes inclui: `siteConfig`/`formatPriceBRL` (defaults do produto), acessibilidade do wordmark (`role=img` com nome "Croniu"), `Button` (link interno/externo/botÃ£o nativo), `SiteHeader` (CTAs apontando para `${NEXT_PUBLIC_APP_URL}/register` e `/login`, toggle do menu mobile), `SiteFooter` (copyright dinÃ¢mico, links legais, e-mail de suporte omitido quando vazio), `FaqSection` (honestidade sobre cancelamento pendente e nÃ£o cobranÃ§a automÃ¡tica de clientes, toggle do acordeÃ£o) e `AiDarkSection` (gate de `NEXT_PUBLIC_AI_ACTION_DEMOS` e conteÃºdo restrito a leituras verificadas por padrÃ£o).

### Nota sobre `npm audit`

`npm audit` reporta 3 vulnerabilidades "high" em `postcss`/`sharp`, ambas **dependÃªncias internas do prÃ³prio `next@16.2.11`** (usadas na pipeline de build/otimizaÃ§Ã£o de imagem do Next, nÃ£o em cÃ³digo exposto ao usuÃ¡rio final deste site estÃ¡tico). A correÃ§Ã£o sugerida pelo `npm audit fix --force` exigiria subir para `next@16.3.0`, fora da faixa `16.2.x` pedida nesta tarefa â€” nÃ£o aplicado. Fica registrado como pendÃªncia para quando a faixa de versÃ£o do Next puder ser revista.

## ValidaÃ§Ã£o visual

Script `scripts/visual-check.mjs` (Playwright + Chromium) percorreu `/`, `/privacidade` e `/termos` nas larguras **360, 390, 768, 1024 e 1440px** contra `next start` (produÃ§Ã£o local, porta 3001), comparando `document.documentElement.scrollWidth` com `clientWidth`.

**Resultado: nenhum overflow horizontal detectado em nenhuma combinaÃ§Ã£o de pÃ¡gina Ã— largura (15/15 ok).**

Screenshots completos foram salvos em `scripts/screenshots/` (pasta ignorada pelo Git â€” artefato de validaÃ§Ã£o local, nÃ£o versionado). InspeÃ§Ã£o visual manual das capturas em 360, 390 e 1440px confirmou: header sticky com wordmark e navegaÃ§Ã£o legÃ­veis, hero com o chat de IA e os cartÃµes de ciclo, seÃ§Ã£o escura de IA com contraste adequado, seÃ§Ãµes empilhando corretamente em mobile.

### Acessibilidade / preferÃªncias de movimento

- `:focus-visible` com contorno visÃ­vel (`outline` na cor `brand-700`) aplicado globalmente e nos componentes interativos (`Button`, header mobile, FAQ).
- AnimaÃ§Ã£o dos cartÃµes de ciclo usa o variant `motion-safe:` do Tailwind, que sÃ³ Ã© aplicado dentro de `@media (prefers-reduced-motion: no-preference)` â€” ou seja, Ã© automaticamente desativada quando o usuÃ¡rio pede reduÃ§Ã£o de movimento. `scroll-behavior: smooth` tambÃ©m Ã© revertido para `auto` sob `prefers-reduced-motion: reduce`.
- NÃ£o foi feita varredura automatizada de acessibilidade (ex.: axe) nesta entrega â€” apenas verificaÃ§Ã£o manual de foco/contraste/reduÃ§Ã£o de movimento.

## PendÃªncias (registradas conforme pedido, nÃ£o resolvidas silenciosamente)

1. **ConteÃºdo jurÃ­dico de Privacidade e Termos**: ambas as pÃ¡ginas sÃ£o placeholders explÃ­citos, com aviso de "conteÃºdo em preparaÃ§Ã£o" e apenas os fatos jÃ¡ confirmados pelo produto (isolamento multi-tenant, trial sem cartÃ£o, preÃ§o, sem cobranÃ§a automÃ¡tica de clientes). O texto jurÃ­dico definitivo (LGPD, bases legais, prazos) precisa ser escrito e revisado antes do lanÃ§amento comercial.
2. **PolÃ­tica de cancelamento**: o FAQ e os Termos deixam explÃ­cito que a polÃ­tica completa de cancelamento/reembolso ainda nÃ£o estÃ¡ definida e serÃ¡ publicada depois.
3. **E-mail de suporte**: `NEXT_PUBLIC_SUPPORT_EMAIL` estÃ¡ vazio por padrÃ£o; o rodapÃ© omite o contato atÃ© que um endereÃ§o oficial seja definido.
4. **Fornecedor de analytics**: `src/lib/analytics.ts` Ã© um stub que sÃ³ loga em desenvolvimento quando `NEXT_PUBLIC_ANALYTICS_ENABLED=true`; nenhum fornecedor (GA4, Plausible, etc.) foi integrado.
5. **`next start` + `output: "standalone"`**: com `output: "standalone"` ativo em `next.config.ts`, `next start` local imprime um aviso informativo ("`next start` does not work with `output: standalone`... use `node .next/standalone/server.js`"), mas o servidor sobe e responde normalmente (usado assim na validaÃ§Ã£o visual). Para Vercel isso nÃ£o Ã© um problema (a plataforma nÃ£o depende do modo standalone); para self-host/Docker, usar `node .next/standalone/server.js` conforme a prÃ³pria mensagem do Next.
6. **`npm audit`**: vulnerabilidades high em dependÃªncias internas do Next (`postcss`/`sharp`) sÃ³ resolvidas subindo para `next@16.3.0`, fora da faixa pedida â€” nÃ£o aplicado (ver seÃ§Ã£o de gates acima).
7. **Varredura formal de acessibilidade** (axe/Lighthouse) nÃ£o foi executada â€” apenas checagem manual de foco, contraste e `prefers-reduced-motion`.

## ConfirmaÃ§Ãµes finais

- Todo o trabalho ficou restrito a `C:\projetos\croniu-site`; nenhuma alteraÃ§Ã£o foi feita em `C:\projetos\croniu` ou em qualquer outro worktree do monorepo (confirmado via `git status` antes e depois desta tarefa).
- Nenhum `git push`, deploy, merge ou alteraÃ§Ã£o de DNS foi realizado.
- Nenhum segredo ou arquivo `.env` real foi commitado â€” apenas `.env.example` com placeholders/documentaÃ§Ã£o.
- Nenhum cÃ³digo privado do app/domÃ­nio do monorepo foi copiado; o conteÃºdo foi recriado a partir de fatos de produto documentados (preÃ§o, trial, capacidades de IA) e de decisÃµes de design descritas na tarefa.
