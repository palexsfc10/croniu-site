const DEFAULT_SITE_URL = "https://croniu.com.br";
const DEFAULT_APP_URL = "https://app.croniu.com.br";
const DEFAULT_PRICE_CENTS = 2990;
const DEFAULT_TRIAL_DAYS = 7;

function readBoolEnv(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") return fallback;
  return value === "true" || value === "1";
}

function readIntEnv(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const DEFAULT_SUPPORT_EMAIL = "appcroniu@gmail.com";

export const siteConfig = {
  name: "Croniu",
  tagline: "Sua rotina organizada. Seus clientes acompanhados. Uma IA trabalhando com você.",
  siteUrl: stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
  appUrl: stripTrailingSlash(process.env.NEXT_PUBLIC_APP_URL || DEFAULT_APP_URL),
  priceCents: readIntEnv(process.env.NEXT_PUBLIC_PRICE_CENTS, DEFAULT_PRICE_CENTS),
  trialDays: readIntEnv(process.env.NEXT_PUBLIC_TRIAL_DAYS, DEFAULT_TRIAL_DAYS),
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || DEFAULT_SUPPORT_EMAIL,
  supportWhatsapp: "(11) 98450-8374",
  aiActionDemosEnabled: readBoolEnv(process.env.NEXT_PUBLIC_AI_ACTION_DEMOS, false),
  analyticsEnabled: readBoolEnv(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED, false),
} as const;

/**
 * Identidade legal usada nas páginas /termos e /privacidade e no rodapé.
 * Fonte: CNPJ 31.892.140/0001-45 (consulta pública Receita Federal, 19/08/2026).
 */
export const legalConfig = {
  legalName: "31.892.140 Pedro Alex Xavier Pequeno",
  ownerName: "Pedro Alex Xavier Pequeno",
  cnpj: "31.892.140/0001-45",
  addressLine: "Bairro Pestana, Osasco/SP",
  cep: "06180-810",
  forum: "Osasco/SP",
  dpoName: "Pedro Xavier",
} as const;

export const registerUrl = `${siteConfig.appUrl}/register`;
export const loginUrl = `${siteConfig.appUrl}/login`;

export function formatPriceBRL(cents: number = siteConfig.priceCents): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function currentYear(): number {
  return new Date().getFullYear();
}
