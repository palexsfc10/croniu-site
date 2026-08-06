# Croniu — site institucional

Landing page de marketing para [croniu.com.br](https://croniu.com.br).

Repositório dedicado, independente do monorepo do produto. Next.js 16 (App Router), React 19, TypeScript estrito, Tailwind 4.

## Local

```bash
npm install
cp .env.example .env.local   # opcional, valores padrão já cobrem dev local
npm run dev
```

Abra http://localhost:3001 (porta padrão local; `npm start` em produção/Vercel usa a porta `3000` por padrão da plataforma).

## Variáveis de ambiente

| Variável | Função |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site (SEO / Open Graph / sitemap). Padrão `https://croniu.com.br` |
| `NEXT_PUBLIC_APP_URL` | Base do app de profissionais (cadastro/login). Padrão `https://app.croniu.com.br` |
| `NEXT_PUBLIC_PRICE_CENTS` | Preço exibido em centavos. Padrão `2990` (R$ 29,90) |
| `NEXT_PUBLIC_TRIAL_DAYS` | Dias de teste grátis. Padrão `7` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | E-mail de suporte no rodapé (omitido se vazio) |
| `NEXT_PUBLIC_AI_ACTION_DEMOS` | `true` habilita exemplos estendidos de ações de escrita da IA (com confirmação). Padrão `false` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Liga o stub de analytics (sem fornecedor configurado ainda). Padrão `false` |

## Gates

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Estrutura

```
src/app/            páginas (home, privacidade, termos), SEO (robots, sitemap, OG image), not-found
src/components/brand/     wordmark Croniu
src/components/ui/        primitivos de UI (botão, cartão, badge, container)
src/components/landing/   seções da landing page
src/lib/            configuração de site (env) e stub de analytics
public/icons/       ícones estáticos
```

## Escopo

Somente marketing institucional. Não altera backend, billing, DNS, produto ou infraestrutura. Não faz deploy nem push — esse repositório é desenvolvido localmente na branch `feature/marketing-site`.

Ver `REPORT.md` para o relatório de entrega (SHAs, gates, pendências).
