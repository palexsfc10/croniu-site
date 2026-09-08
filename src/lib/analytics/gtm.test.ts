import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("gtm", () => {
  beforeEach(() => {
    vi.resetModules();
    window.dataLayer = undefined;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is disabled without NEXT_PUBLIC_GTM_ID even in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { isGtmEnabled } = await import("./gtm");
    expect(isGtmEnabled()).toBe(false);
  });

  it("is disabled outside production even with an id configured", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { isGtmEnabled } = await import("./gtm");
    expect(isGtmEnabled()).toBe(false);
  });

  it("is enabled only when both an id is set and NODE_ENV is production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { isGtmEnabled } = await import("./gtm");
    expect(isGtmEnabled()).toBe(true);
  });

  it("is disabled in Development (next dev), matching an unset id in that environment", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { isGtmEnabled } = await import("./gtm");
    expect(isGtmEnabled()).toBe(false);
  });

  it("is disabled in a Preview-style build (NODE_ENV=production) when the id was left unset for that scope", async () => {
    // Vercel Preview deployments build with NODE_ENV=production too — the
    // only thing that keeps GTM off there is not scoping the env var to
    // Preview. This locks in that the id (not NODE_ENV alone) is the gate.
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { isGtmEnabled } = await import("./gtm");
    expect(isGtmEnabled()).toBe(false);
  });

  it("never pushes to dataLayer when disabled", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { trackCtaClick } = await import("./gtm");
    trackCtaClick({ cta_name: "x", cta_location: "hero", destination: "register" });
    expect(window.dataLayer).toBeUndefined();
  });

  it("pushes exactly the documented shape for cta_click when enabled", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { trackCtaClick } = await import("./gtm");
    trackCtaClick({ cta_name: "comecar_gratis", cta_location: "header", destination: "register" });
    expect(window.dataLayer).toEqual([
      { event: "cta_click", cta_name: "comecar_gratis", cta_location: "header", destination: "register" },
    ]);
  });

  it("pushes sign_up_start, login_start, pricing_view, feature_view and faq_interaction with only their documented params", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const gtm = await import("./gtm");
    gtm.trackSignUpStart({ source: "hero", cta_location: "hero" });
    gtm.trackLoginStart({ cta_location: "header" });
    gtm.trackPricingView();
    gtm.trackFeatureView({ feature_id: "portal_cliente" });
    gtm.trackFaqInteraction({ question_id: "cancelamento", action: "open" });
    expect(window.dataLayer).toEqual([
      { event: "sign_up_start", source: "hero", cta_location: "hero" },
      { event: "login_start", cta_location: "header" },
      { event: "pricing_view" },
      { event: "feature_view", feature_id: "portal_cliente" },
      { event: "faq_interaction", question_id: "cancelamento", action: "open" },
    ]);
  });

  it("accepts the lp_ads_* cta_location values used by the Google Ads landing page", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { trackCtaClick, trackSignUpStart } = await import("./gtm");
    trackCtaClick({ cta_name: "comecar_gratis_7_dias", cta_location: "lp_ads_hero", destination: "register" });
    trackSignUpStart({ source: "lp_ads_hero", cta_location: "lp_ads_hero" });
    expect(window.dataLayer).toEqual([
      { event: "cta_click", cta_name: "comecar_gratis_7_dias", cta_location: "lp_ads_hero", destination: "register" },
      { event: "sign_up_start", source: "lp_ads_hero", cta_location: "lp_ads_hero" },
    ]);
  });

  it("never includes free-form text fields like question text in any event payload", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { trackFaqInteraction } = await import("./gtm");
    trackFaqInteraction({ question_id: "cancelamento", action: "open" });
    const pushed = window.dataLayer?.[0] as Record<string, unknown>;
    expect(Object.keys(pushed).sort()).toEqual(["action", "event", "question_id"]);
  });
});
