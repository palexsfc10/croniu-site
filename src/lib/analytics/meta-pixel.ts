/**
 * Meta Pixel — same instance as app.croniu.com.br (croniu-app,
 * `apps/web/src/lib/analytics/meta-pixel.ts`), one `NEXT_PUBLIC_META_PIXEL_ID`
 * per repository, never a literal id hardcoded in a component. This site has
 * no PRD/HML split like the app (no shared image promoted across
 * environments) — each Vercel environment gets its own build with its own
 * env var scope, so `isMetaPixelEnabled` mirrors `isGtmEnabled` in `gtm.ts`
 * exactly: the id must be set for *this* build AND `NODE_ENV` must be
 * production. Not defining the var outside Production (same operational
 * rule already documented for `NEXT_PUBLIC_GTM_ID` in docs/ANALYTICS.md) is
 * what keeps this off Preview/local, exactly like GTM.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
  }
}

export const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();

export function isMetaPixelEnabled(): boolean {
  return Boolean(META_PIXEL_ID) && process.env.NODE_ENV === "production";
}

/**
 * The `fbq('track', ...)` call(s) embedded in the base snippet after
 * `fbq('init', ...)` — a pure function (not a component) specifically so it
 * can be unit-tested directly, without fighting next/script's DOM-insertion
 * timing in jsdom. `PageView` (standard event) always fires; `ViewContent`
 * (also standard) additionally fires, once, only on `/personal-trainer`.
 */
export function metaPixelTrackCalls(pathname: string): string {
  const isPersonalTrainerLp = pathname === "/personal-trainer";
  return isPersonalTrainerLp
    ? `fbq('track', 'PageView');\nfbq('track', 'ViewContent');`
    : `fbq('track', 'PageView');`;
}
