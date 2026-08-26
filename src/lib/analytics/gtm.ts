/**
 * Central dataLayer gateway. Every analytics event in the app must go
 * through one of the typed helpers below — never push to `window.dataLayer`
 * from a component directly. This keeps the event contract (names + allowed
 * params) enforceable by TypeScript in one place.
 *
 * GA4 itself is configured as a tag *inside* Google Tag Manager (GTM-NVQ74CPL),
 * not installed directly — this file never loads gtag.js.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();

/**
 * Gate on NODE_ENV so the container never loads in `next dev`, vitest
 * (NODE_ENV=test), or a build where the id was left unset. Vercel Preview
 * deployments build with NODE_ENV=production too, so the actual "only
 * production" guarantee comes from scoping NEXT_PUBLIC_GTM_ID to the
 * Production environment in the hosting provider — see docs/ANALYTICS.md.
 */
export function isGtmEnabled(): boolean {
  return Boolean(GTM_ID) && process.env.NODE_ENV === "production";
}

function push(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!isGtmEnabled()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export type CtaLocation = "header" | "hero" | "features" | "pricing" | "final_cta";

export type CtaClickParams = {
  cta_name: string;
  cta_location: CtaLocation;
  destination: string;
};
export function trackCtaClick(params: CtaClickParams): void {
  push({ event: "cta_click", ...params });
}

export type SignUpStartParams = {
  source: CtaLocation;
  cta_location: CtaLocation;
};
export function trackSignUpStart(params: SignUpStartParams): void {
  push({ event: "sign_up_start", ...params });
}

export type LoginStartParams = { cta_location: CtaLocation };
export function trackLoginStart(params: LoginStartParams): void {
  push({ event: "login_start", ...params });
}

export function trackPricingView(): void {
  push({ event: "pricing_view" });
}

export type FeatureViewParams = { feature_id: string };
export function trackFeatureView(params: FeatureViewParams): void {
  push({ event: "feature_view", ...params });
}

export type FaqInteractionParams = {
  question_id: string;
  action: "open" | "close";
};
export function trackFaqInteraction(params: FaqInteractionParams): void {
  push({ event: "faq_interaction", ...params });
}

export type WhatsappClickParams = { cta_location: CtaLocation };
export function trackWhatsappClick(params: WhatsappClickParams): void {
  push({ event: "whatsapp_click", ...params });
}

export type PageViewParams = {
  page_location: string;
  page_path: string;
  page_title: string;
  page_referrer?: string;
};
export function trackPageView(params: PageViewParams): void {
  push({ event: "page_view", ...params });
}
