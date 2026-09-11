import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

// META_PIXEL_ID is a module-level constant fixed at import time, so every
// test needs a fresh module graph *after* stubbing env vars — same reason
// as gtm-scripts.test.tsx.
async function loadScripts() {
  const { MetaPixelScripts } = await import("./meta-pixel-scripts");
  return MetaPixelScripts;
}

function grantConsent() {
  window.localStorage.setItem("croniu_consent_v1", JSON.stringify({ analytics: true, marketing: true }));
}

describe("MetaPixelScripts", () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
    pathname = "/";
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("renders nothing without marketing consent, even when the id is configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1560028922592261");
    const MetaPixelScripts = await loadScripts();
    render(<MetaPixelScripts />);
    expect(document.querySelectorAll('script[id="meta-pixel"]')).toHaveLength(0);
  });

  it("renders nothing without the id, even with marketing consent granted", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "");
    grantConsent();
    const MetaPixelScripts = await loadScripts();
    render(<MetaPixelScripts />);
    expect(document.querySelectorAll('script[id="meta-pixel"]')).toHaveLength(0);
  });

  it("renders nothing outside production, even with the id set and consent granted", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1560028922592261");
    grantConsent();
    const MetaPixelScripts = await loadScripts();
    render(<MetaPixelScripts />);
    expect(document.querySelectorAll('script[id="meta-pixel"]')).toHaveLength(0);
  });

  // next/script tracks "already inserted" ids in a cache that outlives
  // vi.resetModules() and DOM removal (it isn't tied to our module graph or
  // to document state) — so, like gtm-scripts.test.tsx's "installs the
  // container exactly once" test, only ONE test in this whole file may
  // actually render the real id="meta-pixel" tag; every assertion about its
  // live, rendered content (reacting to consent, the exact PageView/init
  // call) has to live in this single test, in sequence, rather than split
  // across separate `it()` blocks. The pathname-dependent branch that adds
  // ViewContent is a pure function (metaPixelTrackCalls) tested directly,
  // with no such constraint, in meta-pixel.test.ts.
  it("reacts to a consent grant with no reload, installing the pixel pointed at the configured id with PageView", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "1560028922592261");
    const { storeConsent } = await import("@/lib/analytics/consent");
    const MetaPixelScripts = await loadScripts();
    render(<MetaPixelScripts />);
    expect(document.querySelectorAll('script[id="meta-pixel"]')).toHaveLength(0);

    storeConsent({ analytics: false, marketing: true });

    await waitFor(() => {
      expect(document.querySelectorAll('script[id="meta-pixel"]')).toHaveLength(1);
    });
    const text = document.querySelector('script[id="meta-pixel"]')?.textContent ?? "";
    expect(text).toContain("fbq('init', '1560028922592261');");
    expect(text).toContain("fbq('track', 'PageView');");
    expect(text).not.toContain("ViewContent");
  });

  // Unlike GtmNoscriptFallback (gated only by isGtmEnabled(), a plain env
  // check — SSR-testable via renderToStaticMarkup), this component's whole
  // output — noscript fallback included — is additionally gated behind the
  // marketing-consent useSyncExternalStore hook, whose getServerSnapshot is
  // always `false` (the server can't read localStorage). So its SSR output
  // is always empty regardless of a real visitor's stored choice — an
  // inherent, pre-existing limitation of consent-gating the Pixel this way
  // (same as app.croniu.com.br's MetaPixelScripts), not something this
  // change introduces or that a unit test can meaningfully exercise here.
});
