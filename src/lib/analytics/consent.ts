import { isGtmEnabled } from "./gtm";

export type ConsentChoice = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "croniu_consent_v1";

/** Necessary/functional storage never depends on this — only analytics + marketing do. */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return { analytics: parsed.analytics, marketing: parsed.marketing };
    }
    return null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    /* storage unavailable (private mode, quota) — consent still applied for this session */
  }
}

function consentState(choice: ConsentChoice | null) {
  const marketing = choice?.marketing ? "granted" : "denied";
  return {
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    analytics_storage: choice?.analytics ? "granted" : "denied",
  } as const;
}

/** Must run before the GTM container script executes — see beforeInteractive script in layout. */
export function pushDefaultConsent(choice: ConsentChoice | null): void {
  if (typeof window === "undefined" || !isGtmEnabled()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "default", { ...consentState(choice), wait_for_update: 500 }]);
}

export function pushConsentUpdate(choice: ConsentChoice): void {
  if (typeof window === "undefined" || !isGtmEnabled()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", consentState(choice)]);
}
