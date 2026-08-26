# Analytics — Google Tag Manager + GA4

## Visão geral

O site institucional usa **Google Tag Manager** como único ponto de entrada de
analytics. O GA4 (`G-PRTE55DL13`) é uma tag configurada **dentro** do
contêiner GTM (`GTM-NVQ74CPL`) — o código deste repositório nunca carrega
`gtag.js` diretamente, para não duplicar pageviews/eventos.

Todo o código vive em `src/lib/analytics/` (lógica pura, testável) e
`src/components/analytics/` (integração com React/Next.js). **Nenhum
componente de página chama `window.dataLayer.push` diretamente** — tudo passa
pelos helpers tipados de `src/lib/analytics/gtm.ts`.

## Variáveis de ambiente

| Variável | Onde configurar | Valor |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | **Somente** no ambiente "Production" do provedor de hosting (ex.: Vercel → Project Settings → Environment Variables → escopo "Production") | `GTM-NVQ74CPL` |

Regras de ativação (`src/lib/analytics/gtm.ts`, função `isGtmEnabled`):

```
GTM ativo  ⇔  NEXT_PUBLIC_GTM_ID definido  E  NODE_ENV === "production"
```

- **Local (`npm run dev`)**: `NODE_ENV=development` → sempre desativado, mesmo que alguém defina a variável em `.env.local` por engano.
- **Testes automatizados (`npm run test`)**: Vitest roda com `NODE_ENV=test` → sempre desativado; os testes que precisam simular "ativado" usam `vi.stubEnv` explicitamente.
- **Preview (Vercel)**: builda com `NODE_ENV=production` — a *única* coisa que impede o GTM de rodar em Preview é **não** definir `NEXT_PUBLIC_GTM_ID` nesse escopo. Configure a variável exclusivamente em "Production" no painel do provedor.
- **HML**: se um ambiente de HML for criado para este site, aplique a mesma regra — não definir a variável ali.
- **Produção**: definir `NEXT_PUBLIC_GTM_ID=GTM-NVQ74CPL` no escopo Production. Como é uma variável `NEXT_PUBLIC_*`, ela é embutida no bundle **no momento do build** — depois de configurá-la pela primeira vez é necessário disparar um novo build/deploy (o próximo push para `main` já resolve isso).

Sem a variável definida, o site funciona normalmente: nenhum script é
injetado, nenhum banner de cookies aparece, nenhuma chamada de tracking tem
efeito (todas viram no-op).

## Arquitetura

```
src/lib/analytics/
  gtm.ts        # gate de ativação + helpers tipados (trackCtaClick, trackSignUpStart, ...)
  consent.ts     # storage da escolha de cookies + push de Consent Mode (default/update)
  utm.ts         # allowlist de utm_*/gclid + função que anexa esses params a uma URL

src/components/analytics/
  gtm-scripts.tsx              # <Script> do contêiner (afterInteractive) + script de consent default (beforeInteractive) + <noscript> fallback
  consent-banner.tsx           # banner de cookies (Aceitar todos / Recusar opcionais / Configurar)
  cookie-preferences-link.tsx  # link no rodapé que reabre o banner
  tracking-params-provider.tsx # hook useTrackingParams() — lê utm_*/gclid da URL via useSyncExternalStore
  route-pageview-tracker.tsx   # dispara 1 page_view por mudança real de rota

src/components/landing/
  app-cta-link.tsx          # CTA que vai para app.croniu.com.br: injeta utm_*/gclid no href + dispara cta_click + sign_up_start|login_start
  hero-secondary-cta.tsx    # CTA interno (âncora na própria página): só cta_click
  pricing-view-tracker.tsx  # sentinela IntersectionObserver → pricing_view (uma vez por pageview)
```

Tudo é montado uma única vez em `src/app/layout.tsx` (raiz), então não há
risco de o contêiner ser instalado mais de uma vez.

## Eventos implementados

| Evento | Onde dispara | Parâmetros |
|---|---|---|
| `page_view` | Carga inicial + toda mudança real de rota (`RoutePageviewTracker`, via `usePathname`) | `page_location`, `page_path`, `page_title`, `page_referrer?` |
| `cta_click` | Todo clique em CTA (header, hero, pricing, final_cta) | `cta_name`, `cta_location`, `destination` |
| `sign_up_start` | Clique num CTA que leva a `/register` | `source`, `cta_location` |
| `login_start` | Clique num CTA que leva a `/login` | `cta_location` |
| `pricing_view` | Seção de preço entra ≥20% no viewport (uma vez por pageview) | — |
| `faq_interaction` | Abrir/fechar uma pergunta do FAQ | `question_id` (slug estável, nunca o texto da pergunta), `action: "open"\|"close"` |
| `feature_view` | **Não implementado** — `features-bento-section.tsx` é uma grade estática, sem abas/carrossel/modal. Helper `trackFeatureView` já existe em `gtm.ts`, pronto para uso se essa seção ganhar um componente interativo no futuro. |
| `whatsapp_click` | **Não implementado** — o site não tem hoje nenhum link clicável para WhatsApp (o número aparece como texto no FAQ/Termos, não como link `wa.me`). Helper `trackWhatsappClick` já existe em `gtm.ts`; use-o assim que um CTA de WhatsApp real for adicionado. |

`cta_location` usa um enum fechado: `header | hero | features | pricing | final_cta`.

### Por que `page_view` é disparado manualmente

O App Router do Next.js não recarrega a página em navegações internas. Em vez
de depender do listener de "History Change" do GTM (que pode duplicar ou
faltar dependendo de como a tag é configurada), o código dispara um evento
customizado `page_view` no dataLayer a cada mudança real de `pathname`
(`route-pageview-tracker.tsx`), com uma guarda por `ref` que impede duplicação
no primeiro carregamento (inclusive sob o duplo-render do React Strict Mode em
dev).

**Configuração necessária dentro do GTM** (feita no painel web do GTM — fora
do escopo deste repositório): na tag "Configuração do Google" (GA4), desative
o envio automático de `page_view` e crie um gatilho de "Evento
personalizado" ouvindo `page_view`, disparando a tag de evento
correspondente. Isso evita pageview duplicado (um do listener padrão do GTM +
um do nosso evento customizado).

## UTMs, gclid e a jornada entre os dois domínios

`src/lib/analytics/utm.ts` define a allowlist:

```
utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid
```

`tracking-params-provider.tsx` lê esses parâmetros da URL de pouso
(`window.location.search`, via `useSyncExternalStore` — não
`useSearchParams`, para a página continuar 100% estática, sem opt-out de
prerender). `app-cta-link.tsx` anexa os parâmetros encontrados à URL de
`app.croniu.com.br/register` ou `/login`, **sem nunca sobrescrever** um
parâmetro que já exista na URL de destino.

**`_ga` já é compartilhado entre `croniu.com.br` e `app.croniu.com.br`
automaticamente** — ambos são subdomínios do mesmo domínio registrável
(`croniu.com.br`), e o cookie `_ga` do gtag.js é definido, por padrão, no
domínio de nível superior (`.croniu.com.br`), não no subdomínio específico.
Isso significa que, assim que `app.croniu.com.br` também tiver o **mesmo**
contêiner/GA4 instalado, a jornada landing→cadastro é automaticamente unida
pelo GA4 via `client_id`, sem precisar de "cross-domain linking" (esse
recurso do GA4 é para domínios *diferentes*, não para subdomínios do mesmo
domínio). Os parâmetros UTM na URL são uma camada extra de robustez, não a
mecânica principal.

**Pendência explícita, fora deste repositório**: `app.croniu.com.br`
(repositório `croniu-app`) ainda não tem GTM/GA4 instalado. Enquanto isso não
acontecer, a jornada completa (visita → cadastro → conta criada) não pode ser
medida ponta a ponta — apenas o início do funil, do lado do site
institucional. Não alterei `croniu-app` nesta entrega (fora do escopo
autorizado). Ver "Eventos futuros" abaixo.

## Consentimento (LGPD + Consent Mode)

Categorias: **necessários** (sempre ativo, sem toggle), **analytics**,
**marketing** (nenhuma tag de marketing existe hoje — a categoria já está
preparada para quando existir).

- Antes de qualquer escolha, o Consent Mode é inicializado com **tudo
  negado** (`analytics_storage`, `ad_storage`, `ad_user_data`,
  `ad_personalization` = `denied`), via um script `beforeInteractive` que
  roda antes do contêiner GTM carregar (`gtm-scripts.tsx`,
  `GtmConsentDefaultScript`).
- A escolha é persistida em `localStorage` (`croniu_consent_v1`) e nunca
  expira — o banner não aparece de novo depois da primeira decisão.
- Um clique em "Preferências de cookies" no rodapé reabre o banner a
  qualquer momento (`cookie-preferences-link.tsx` + evento customizado
  `croniu:open-consent-preferences`).
- Nenhuma opção vem pré-marcada na visão "Configurar" — analytics e
  marketing começam desmarcados.
- O banner só é renderizado quando o GTM está de fato ativo
  (`isGtmEnabled()`); em local/preview/HML ele simplesmente não aparece.

**Pendência explícita**: o banner linka para `/privacidade`, que já existe e
é real (Política de Privacidade e Termos de Uso publicados nesta mesma
entrega — commit anterior). Nenhum texto jurídico foi inventado aqui.

## Proteção de PII e de rotas com token

- Todo evento passa por funções com assinatura TypeScript fechada
  (`CtaClickParams`, `FaqInteractionParams`, etc.) — não é possível, em tempo
  de compilação, passar um campo arbitrário (e-mail, nome, token) para dentro
  de um evento.
- `faq_interaction` envia `question_id` (slug curto, ex. `"cancelamento"`),
  nunca o texto da pergunta.
- Este site (`croniu.com.br`) não tem hoje nenhuma rota pública com token
  (`/entrar/[token]` e `/c/[token]` existem apenas em `app.croniu.com.br`,
  fora deste repositório). Ainda assim, `page_location` é montado a partir de
  `window.location.href` da própria página institucional, que nunca carrega
  esse tipo de parâmetro.

## Como validar (Tag Assistant / DebugView)

1. Configure `NEXT_PUBLIC_GTM_ID=GTM-NVQ74CPL` localmente só para este teste (`NEXT_PUBLIC_GTM_ID=GTM-NVQ74CPL NODE_ENV=production npm run build && npm run start`).
2. Instale a extensão **Tag Assistant** (Google) ou abra o **modo Preview** do GTM (dentro do próprio painel web do contêiner — não incluso neste repositório) e aponte para `http://localhost:3001`.
3. Confira a ordem dos eventos no painel: `consent (default)` → `gtm.js` → `page_view` → `gtm.dom` → `gtm.load`.
4. Interaja com o site (abra uma pergunta do FAQ, role até "Preço", clique em "Começar grátis") e confirme cada evento no Tag Assistant.
5. No **GA4 → Admin → DebugView** (com a extensão GA4 Debugger ou `?gtm_debug=x` habilitado), confirme que os eventos chegam com os parâmetros documentados acima e sem nenhum campo de texto livre.
6. Teste o consentimento: limpe `localStorage`, recarregue, confirme que `consent default` está `denied` e o banner aparece; clique "Aceitar todos"; confirme o `consent update` com tudo `granted`; recarregue de novo e confirme que o banner não volta a aparecer e que o `consent default` já nasce `granted`.

Sem acesso ao painel do GTM/GA4 (Preview/DebugView), a validação de rede feita
nesta entrega (ver relatório de entrega) confirma a sequência correta de
eventos no `dataLayer` do navegador — o *owner* da conta Google ainda precisa
confirmar visualmente no DebugView, pois isso depende de como a tag GA4 é
configurada dentro do contêiner (fora deste repositório).

## Marcar eventos como conversão (Key Event) no GA4

Depois de validar no DebugView, marcar como **Key Event** no GA4:

- `sign_up` *(evento futuro — ver abaixo)*
- `generate_lead` *(evento futuro)*
- `begin_checkout` *(evento futuro)*
- `purchase` *(evento futuro)*

`cta_click` e `pricing_view` são eventos de **análise**, não de conversão —
não marcar como Key Event.

## Eventos futuros (não implementados agora, de propósito)

O site institucional não deve *simular* uma conversão que só se conclui no
app ou no backend — isso inflaria os números artificialmente. `sign_up`,
`login`, `generate_lead`, `begin_checkout` e `purchase` só fazem sentido
quando implementados no `croniu-app` (onde a conta é de fato criada) ou no
backend (onde o pagamento é de fato processado). O que este repositório faz é
preservar a atribuição (UTMs + cookie `_ga` compartilhado) para que, quando
esses eventos existirem do lado do app, o GA4 consiga religar a conversão à
campanha de origem.

**Próximo passo recomendado**: instalar o mesmo contêiner GTM
(`GTM-NVQ74CPL`) em `app.croniu.com.br` e disparar `sign_up` lá, no momento
exato em que a conta é criada com sucesso — meu histórico de sessão já tem um
desenho detalhado disso (eventos `registration_started`, `profession_selected`,
`sign_up`, `email_verified`, `onboarding_completed`), pendente de autorização
explícita para alterar aquele repositório.

## Adicionando um evento novo sem duplicar a implementação

1. Adicione o tipo + helper em `src/lib/analytics/gtm.ts` (siga o padrão dos existentes: um tipo `XxxParams` com só os campos permitidos, uma função `trackXxx`).
2. Chame `trackXxx(...)` no ponto exato da interação — nunca chame `window.dataLayer.push` diretamente em um componente.
3. Adicione um teste em `gtm.test.ts` confirmando que o payload tem exatamente os campos documentados (nada a mais).
4. Documente o evento nesta tabela.
5. No painel do GTM, crie o gatilho de evento personalizado correspondente e a tag que deve disparar — isso é feito fora deste repositório, no modo Preview, e só publicado no contêiner depois de validado.
