import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("isMetaPixelEnabled", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is disabled without NEXT_PUBLIC_META_PIXEL_ID even in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "");
    const { isMetaPixelEnabled } = await import("./meta-pixel");
    expect(isMetaPixelEnabled()).toBe(false);
  });

  it("is disabled outside production even with an id configured", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1560028922592261");
    const { isMetaPixelEnabled } = await import("./meta-pixel");
    expect(isMetaPixelEnabled()).toBe(false);
  });

  it("is enabled only when both an id is set and NODE_ENV is production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1560028922592261");
    const { isMetaPixelEnabled } = await import("./meta-pixel");
    expect(isMetaPixelEnabled()).toBe(true);
  });
});

describe("metaPixelTrackCalls", () => {
  it("fires only PageView on an ordinary route", async () => {
    const { metaPixelTrackCalls } = await import("./meta-pixel");
    expect(metaPixelTrackCalls("/")).toBe("fbq('track', 'PageView');");
    expect(metaPixelTrackCalls("/precos")).toBe("fbq('track', 'PageView');");
  });

  it("fires ViewContent right after PageView, only on /personal-trainer", async () => {
    const { metaPixelTrackCalls } = await import("./meta-pixel");
    expect(metaPixelTrackCalls("/personal-trainer")).toBe(
      "fbq('track', 'PageView');\nfbq('track', 'ViewContent');",
    );
  });

  it("never uses trackCustom for either standard event", async () => {
    const { metaPixelTrackCalls } = await import("./meta-pixel");
    expect(metaPixelTrackCalls("/personal-trainer")).not.toContain("trackCustom");
    expect(metaPixelTrackCalls("/")).not.toContain("trackCustom");
  });
});
