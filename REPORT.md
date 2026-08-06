# REPORT — Site institucional Croniu (marketing)

## Escopo e commits

Repositório dedicado [`palexsfc10/croniu-site`](https://github.com/palexsfc10/croniu-site), independente do monorepo do produto, branch `feature/marketing-site`.

| Item | Valor |
|---|---|
| Path local | `C:\projetos\croniu-site` |
| Remoto | `https://github.com/palexsfc10/croniu-site.git` |
| Base SHA (`main`) | `f7f07a3fb35673e7ff7b1810f70fe9f8034306ed` |
| SHA final (`feature/marketing-site`) | ver tip com `git rev-parse HEAD` após o último commit deste relatório |
| Push realizado | **Não** — trabalho permanece local |
| Deploy / DNS / merge | **Não realizado** |
| Alteração no monorepo `C:\projetos\croniu` | **Nenhuma** (worktree do monorepo removido deste path; status do monorepo inalterado nesta tarefa) |

Commits nesta branch (após o commit inicial em `main`):

1. `273660d` — scaffold Next.js 16 + brand/UI
2. `516fb08` — landing completa (11 seções)
3. `bb0ee45` — SEO + páginas legais placeholder
4. `9112404` — visual-check + relatório
5. `b6a2b79` … `d20b41a` — ajustes de tip SHA / encoding do relatório
6. *(este commit)* — relatório consolidado UTF-8

## Estrutura entregue

```
src/app/          page, layout, globals, 404, privacidade, termos, robots, sitemap, OG
src/components/   brand, ui, landing (seções + demos de IA)
src/lib/          site.ts, analytics.ts
public/icons/
scripts/visual-check.mjs
.env.example, .gitignore, README.md, REPORT.md
```

## Variáveis de ambiente

| Variável | Padrão |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://croniu.com.br` |
| `NEXT_PUBLIC_APP_URL` | `https://app.croniu.com.br` |
| `NEXT_PUBLIC_PRICE_CENTS` | `2990` |
| `NEXT_PUBLIC_TRIAL_DAYS` | `7` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | vazio (omitido do rodapé) |
| `NEXT_PUBLIC_AI_ACTION_DEMOS` | `false` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `false` |

CTAs de cadastro/login usam apenas `NEXT_PUBLIC_APP_URL` + `/register` e `/login` (centralizado em `src/lib/site.ts`).

## Como rodar

```bash
cd C:\projetos\croniu-site
npm install
cp .env.example .env.local   # opcional
npm run dev                  # http://localhost:3001
```

Gates: `npm run lint` · `npm run typecheck` · `npm run test` · `npm run build` · `npm run visual-check`

## Resultado dos gates (revalidado)

| Gate | Resultado |
|---|---|
| lint | OK (0 erros / 0 warnings) |
| typecheck | OK |
| test | OK — 21 testes |
| build | OK — rotas estáticas geradas |
| visual-check | OK — sem overflow em 360/390/768/1024/1440 |

## Pendências honestas

1. Texto jurídico definitivo de Privacidade e Termos
2. Política formal de cancelamento/reembolso
3. E-mail oficial de suporte (`NEXT_PUBLIC_SUPPORT_EMAIL`)
4. Fornecedor de analytics
5. `npm audit` high em deps internas do Next 16.2.x (upgrade para 16.3 fora do escopo)
6. Varredura axe/Lighthouse formal não executada

## Confirmações

- Trabalho restrito a `C:\projetos\croniu-site`
- Monorepo Croniu **não** foi alterado por esta entrega
- Sem push, deploy, merge ou DNS
- Sem segredos versionados (apenas `.env.example`)
- Identidade recriada (wordmark/tokens) coerente com o produto; sem copiar código privado de domínio do monorepo
