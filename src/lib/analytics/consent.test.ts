import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("consent storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when nothing was stored yet", async () => {
    const { getStoredConsent } = await import("./consent");
    expect(getStoredConsent()).toBeNull();
  });

  it("persists and reads back a choice", async () => {
    const { storeConsent, getStoredConsent } = await import("./consent");
    storeConsent({ analytics: true, marketing: false });
    expect(getStoredConsent()).toEqual({ analytics: true, marketing: false });
  });

  it("ignores corrupted storage instead of throwing", async () => {
    window.localStorage.setItem("croniu_consent_v1", "{not json");
    const { getStoredConsent } = await import("./consent");
    expect(getStoredConsent()).toBeNull();
  });
});

describe("consent dataLayer pushes", () => {
  beforeEach(() => {
    vi.resetModules();
    window.dataLayer = undefined;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does nothing when GTM is disabled", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { pushDefaultConsent, pushConsentUpdate } = await import("./consent");
    pushDefaultConsent(null);
    pushConsentUpdate({ analytics: true, marketing: true });
    expect(window.dataLayer).toBeUndefined();
  });

  it("defaults every consent category to denied when there is no stored choice", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { pushDefaultConsent } = await import("./consent");
    pushDefaultConsent(null);
    expect(window.dataLayer).toEqual([
      [
        "consent",
        "default",
        {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ]);
  });

  it("pushes an update reflecting the visitor's actual choice", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { pushConsentUpdate } = await import("./consent");
    pushConsentUpdate({ analytics: true, marketing: false });
    expect(window.dataLayer).toEqual([
      [
        "consent",
        "update",
        {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "granted",
        },
      ],
    ]);
  });
});
