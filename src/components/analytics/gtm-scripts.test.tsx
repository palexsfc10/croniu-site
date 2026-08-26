import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";

// GTM_ID is a module-level constant fixed at import time, so every test
// needs a fresh module graph *after* stubbing env vars.
async function loadScripts() {
  const mod = await import("./gtm-scripts");
  return mod;
}

describe("GTM scripts", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("renders nothing outside production, even with an id configured", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { GtmConsentDefaultScript, GtmContainerScript, GtmNoscriptFallback } = await loadScripts();
    render(
      <>
        <GtmConsentDefaultScript />
        <GtmContainerScript />
        <GtmNoscriptFallback />
      </>,
    );
    expect(document.querySelectorAll('#gtm-consent-default, #gtm-container, noscript')).toHaveLength(0);
  });

  it("renders nothing in production without an id", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { GtmConsentDefaultScript, GtmContainerScript, GtmNoscriptFallback } = await loadScripts();
    render(
      <>
        <GtmConsentDefaultScript />
        <GtmContainerScript />
        <GtmNoscriptFallback />
      </>,
    );
    expect(document.querySelectorAll('#gtm-consent-default, #gtm-container, noscript')).toHaveLength(0);
  });

  it("installs the container exactly once even if rendered twice", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { GtmContainerScript, GtmNoscriptFallback } = await loadScripts();
    const { container } = render(
      <>
        <GtmContainerScript />
        <GtmContainerScript />
        <GtmNoscriptFallback />
      </>,
    );
    // next/script injects afterInteractive tags outside the RTL render
    // container (into head/body), so scope that query to the document.
    expect(document.querySelectorAll('script[id="gtm-container"]')).toHaveLength(1);
    expect(container.querySelector("noscript")).not.toBeNull();
  });

  it("points the container script at the configured GTM id", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { GtmContainerScript } = await loadScripts();
    render(<GtmContainerScript />);
    expect(document.querySelector('script[id="gtm-container"]')?.textContent).toContain("GTM-NVQ74CPL");
  });

  // GtmConsentDefaultScript uses strategy="beforeInteractive", which next/script
  // only materializes inside a real Next.js document render (it relies on
  // Next's internal head-manager context, absent from an isolated React
  // render or renderToStaticMarkup). Its enabled/disabled gating — the part
  // that is actually ours to get right — is covered by the two tests above;
  // the exact inline script body is reviewed in gtm-scripts.tsx directly.

  it("renders the noscript fallback iframe pointed at the configured GTM id in the actual server-rendered markup", async () => {
    // React does not render <noscript> children during a client render (it
    // only makes sense before hydration), so verify against the real SSR
    // output — that HTML is what a no-JS visitor's browser actually parses.
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { GtmNoscriptFallback } = await loadScripts();
    const html = renderToStaticMarkup(<GtmNoscriptFallback />);
    expect(html).toContain("https://www.googletagmanager.com/ns.html?id=GTM-NVQ74CPL");
  });
});
