# REPORT — Site institucional Croniu (marketing)

## Escopo e commits

Repositório dedicado `croniu-site`, independente do monorepo do produto, branch `feature/marketing-site`.

| Item | Valor |
|---|---|
| Base SHA (main, antes deste trabalho) | `f7f07a3fb35673e7ff7b1810f70fe9f8034306ed` |
| SHA final (branch `feature/marketing-site`) | `911240495d94383c544fd05173b68026773e65dd` |
| Push realizado | **Não** — trabalho permanece local |
| Deploy / DNS / merge | **Não realizado** |
| Alteração no monorepo `C:\projetos\croniu` | **Nenhuma** (verificado via `git status` antes e depois — apenas o estado pré-existente, não relacionado a esta tarefa) |

Commits nesta branch (do mais antigo ao mais novo, após o commit inicial vazio):

1. `273660d` — `chore: scaffold Next.js 16 marketing site with brand and UI primitives`
2. `516fb08` — `feat: add full landing page with all required sections`
3. `bb0ee45` — `feat: add SEO metadata assets and legal placeholder pages`
4. `9112404` — `docs: add visual-check script and delivery report`

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
  site.ts (config de env + preço/URLs), analytics.ts (stub), cn.ts, og-image.tsx (markup OG)
public/icons/icon.svg
scripts/visual-check.mjs (checagem de overflow horizontal via Playwright)
.env.example, .gitignore, README.md, REPORT.md
```

Todas as 11 seções da landing pedidas estão implementadas na home (`src/app/page.tsx`), com header sticky e footer conforme especificação.

## Variáveis de ambiente

Definidas em `.env.example` com os valores/documentação pedidos:

- `NEXT_PUBLIC_SITE_URL=https://croniu.com.br`
- `NEXT_PUBLIC_APP_URL=https://app.croniu.com.br`
- `NEXT_PUBLIC_PRICE_CENTS=2990`
- `NEXT_PUBLIC_TRIAL_DAYS=7`
- `NEXT_PUBLIC_SUPPORT_EMAIL=` (vazio — rodapé omite o e-mail quando vazio, comportamento testado)
- `NEXT_PUBLIC_AI_ACTION_DEMOS=false` (quando `true`, a seção de IA escura mostra um exemplo estendido de ação de escrita com confirmação; comportamento coberto por teste)
- `NEXT_PUBLIC_ANALYTICS_ENABLED=false` (stub em `src/lib/analytics.ts`, não dispara nada sem fornecedor)

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3001
```

Para validar produção localmente:

```bash
npm run build
npm run start                # http://localhost:3001
```

## Resultado dos gates

Todos executados em `C:\projetos\croniu-site`, Node/npm do ambiente local, no dia da entrega.

| Gate | Comando | Resultado |
|---|---|---|
| Install | `npm install` | ✅ OK (453 pacotes) |
| Lint | `npm run lint` | ✅ 0 erros, 0 warnings |
| Typecheck | `npm run typecheck` | ✅ sem erros |
| Testes | `npm run test` | ✅ 7 arquivos, 21 testes passando (Vitest + Testing Library) |
| Build | `npm run build` | ✅ build de produção concluído (Turbopack), 9 rotas geradas estaticamente |

Cobertura de testes inclui: `siteConfig`/`formatPriceBRL` (defaults do produto), acessibilidade do wordmark (`role=img` com nome "Croniu"), `Button` (link interno/externo/botão nativo), `SiteHeader` (CTAs apontando para `${NEXT_PUBLIC_APP_URL}/register` e `/login`, toggle do menu mobile), `SiteFooter` (copyright dinâmico, links legais, e-mail de suporte omitido quando vazio), `FaqSection` (honestidade sobre cancelamento pendente e não cobrança automática de clientes, toggle do acordeão) e `AiDarkSection` (gate de `NEXT_PUBLIC_AI_ACTION_DEMOS` e conteúdo restrito a leituras verificadas por padrão).

### Nota sobre `npm audit`

`npm audit` reporta 3 vulnerabilidades "high" em `postcss`/`sharp`, ambas **dependências internas do próprio `next@16.2.11`** (usadas na pipeline de build/otimização de imagem do Next, não em código exposto ao usuário final deste site estático). A correção sugerida pelo `npm audit fix --force` exigiria subir para `next@16.3.0`, fora da faixa `16.2.x` pedida nesta tarefa — não aplicado. Fica registrado como pendência para quando a faixa de versão do Next puder ser revista.

## Validação visual

Script `scripts/visual-check.mjs` (Playwright + Chromium) percorreu `/`, `/privacidade` e `/termos` nas larguras **360, 390, 768, 1024 e 1440px** contra `next start` (produção local, porta 3001), comparando `document.documentElement.scrollWidth` com `clientWidth`.

**Resultado: nenhum overflow horizontal detectado em nenhuma combinação de página × largura (15/15 ok).**

Screenshots completos foram salvos em `scripts/screenshots/` (pasta ignorada pelo Git — artefato de validação local, não versionado). Inspeção visual manual das capturas em 360, 390 e 1440px confirmou: header sticky com wordmark e navegação legíveis, hero com o chat de IA e os cartões de ciclo, seção escura de IA com contraste adequado, seções empilhando corretamente em mobile.

### Acessibilidade / preferências de movimento

- `:focus-visible` com contorno visível (`outline` na cor `brand-700`) aplicado globalmente e nos componentes interativos (`Button`, header mobile, FAQ).
- Animação dos cartões de ciclo usa o variant `motion-safe:` do Tailwind, que só é aplicado dentro de `@media (prefers-reduced-motion: no-preference)` — ou seja, é automaticamente desativada quando o usuário pede redução de movimento. `scroll-behavior: smooth` também é revertido para `auto` sob `prefers-reduced-motion: reduce`.
- Não foi feita varredura automatizada de acessibilidade (ex.: axe) nesta entrega — apenas verificação manual de foco/contraste/redução de movimento.

## Pendências (registradas conforme pedido, não resolvidas silenciosamente)

1. **Conteúdo jurídico de Privacidade e Termos**: ambas as páginas são placeholders explícitos, com aviso de "conteúdo em preparação" e apenas os fatos já confirmados pelo produto (isolamento multi-tenant, trial sem cartão, preço, sem cobrança automática de clientes). O texto jurídico definitivo (LGPD, bases legais, prazos) precisa ser escrito e revisado antes do lançamento comercial.
2. **Política de cancelamento**: o FAQ e os Termos deixam explícito que a política completa de cancelamento/reembolso ainda não está definida e será publicada depois.
3. **E-mail de suporte**: `NEXT_PUBLIC_SUPPORT_EMAIL` está vazio por padrão; o rodapé omite o contato até que um endereço oficial seja definido.
4. **Fornecedor de analytics**: `src/lib/analytics.ts` é um stub que só loga em desenvolvimento quando `NEXT_PUBLIC_ANALYTICS_ENABLED=true`; nenhum fornecedor (GA4, Plausible, etc.) foi integrado.
5. **`next start` + `output: "standalone"`**: com `output: "standalone"` ativo em `next.config.ts`, `next start` local imprime um aviso informativo ("`next start` does not work with `output: standalone`... use `node .next/standalone/server.js`"), mas o servidor sobe e responde normalmente (usado assim na validação visual). Para Vercel isso não é um problema (a plataforma não depende do modo standalone); para self-host/Docker, usar `node .next/standalone/server.js` conforme a própria mensagem do Next.
6. **`npm audit`**: vulnerabilidades high em dependências internas do Next (`postcss`/`sharp`) só resolvidas subindo para `next@16.3.0`, fora da faixa pedida — não aplicado (ver seção de gates acima).
7. **Varredura formal de acessibilidade** (axe/Lighthouse) não foi executada — apenas checagem manual de foco, contraste e `prefers-reduced-motion`.

## Confirmações finais

- Todo o trabalho ficou restrito a `C:\projetos\croniu-site`; nenhuma alteração foi feita em `C:\projetos\croniu` ou em qualquer outro worktree do monorepo (confirmado via `git status` antes e depois desta tarefa).
- Nenhum `git push`, deploy, merge ou alteração de DNS foi realizado.
- Nenhum segredo ou arquivo `.env` real foi commitado — apenas `.env.example` com placeholders/documentação.
- Nenhum código privado do app/domínio do monorepo foi copiado; o conteúdo foi recriado a partir de fatos de produto documentados (preço, trial, capacidades de IA) e de decisões de design descritas na tarefa.
