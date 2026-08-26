import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

async function loadBanner() {
  const [{ ConsentBanner, OPEN_CONSENT_PREFERENCES_EVENT }] = await Promise.all([
    import("./consent-banner"),
  ]);
  return { ConsentBanner, OPEN_CONSENT_PREFERENCES_EVENT };
}

describe("ConsentBanner", () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("never renders when GTM is disabled (no id / non-production)", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    const { ConsentBanner } = await loadBanner();
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog", { name: "Preferências de cookies" })).not.toBeInTheDocument();
  });

  it("shows the banner on first visit when GTM is enabled and no choice was stored", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const { ConsentBanner } = await loadBanner();
    render(<ConsentBanner />);
    expect(await screen.findByRole("dialog", { name: "Preferências de cookies" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Aceitar todos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Recusar opcionais" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Configurar" })).toBeInTheDocument();
  });

  it("does not show the banner again once a choice was already stored", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    window.localStorage.setItem("croniu_consent_v1", JSON.stringify({ analytics: true, marketing: false }));
    const { ConsentBanner } = await loadBanner();
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog", { name: "Preferências de cookies" })).not.toBeInTheDocument();
  });

  it("persists the choice and does not pre-check optional categories in the expanded view", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    const user = userEvent.setup();
    const { ConsentBanner } = await loadBanner();
    render(<ConsentBanner />);
    await user.click(await screen.findByRole("button", { name: "Configurar" }));
    const analyticsCheckbox = screen.getByRole("checkbox", { name: /Analytics/ });
    const marketingCheckbox = screen.getByRole("checkbox", { name: /Marketing/ });
    expect(analyticsCheckbox).not.toBeChecked();
    expect(marketingCheckbox).not.toBeChecked();

    await user.click(analyticsCheckbox);
    await user.click(screen.getByRole("button", { name: "Salvar preferências" }));

    expect(JSON.parse(window.localStorage.getItem("croniu_consent_v1") ?? "null")).toEqual({
      analytics: true,
      marketing: false,
    });
    expect(screen.queryByRole("dialog", { name: "Preferências de cookies" })).not.toBeInTheDocument();
  });

  it('"Recusar opcionais" pushes a consent update with every category denied', async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    window.dataLayer = undefined;
    const user = userEvent.setup();
    const { ConsentBanner } = await loadBanner();
    render(<ConsentBanner />);
    await user.click(await screen.findByRole("button", { name: "Recusar opcionais" }));

    expect(window.dataLayer).toContainEqual([
      "consent",
      "update",
      {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      },
    ]);
    expect(JSON.parse(window.localStorage.getItem("croniu_consent_v1") ?? "null")).toEqual({
      analytics: false,
      marketing: false,
    });
  });

  it('"Aceitar todos" pushes a consent update with every category granted', async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    window.dataLayer = undefined;
    const user = userEvent.setup();
    const { ConsentBanner } = await loadBanner();
    render(<ConsentBanner />);
    await user.click(await screen.findByRole("button", { name: "Aceitar todos" }));

    expect(window.dataLayer).toContainEqual([
      "consent",
      "update",
      {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      },
    ]);
    expect(JSON.parse(window.localStorage.getItem("croniu_consent_v1") ?? "null")).toEqual({
      analytics: true,
      marketing: true,
    });
  });

  it("reopens from the footer's cookie-preferences event and restores the stored choice", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-NVQ74CPL");
    window.localStorage.setItem("croniu_consent_v1", JSON.stringify({ analytics: true, marketing: false }));
    const { ConsentBanner, OPEN_CONSENT_PREFERENCES_EVENT } = await loadBanner();
    render(<ConsentBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    window.dispatchEvent(new CustomEvent(OPEN_CONSENT_PREFERENCES_EVENT));

    expect(await screen.findByRole("dialog", { name: "Preferências de cookies" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /Analytics/ })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /Marketing/ })).not.toBeChecked();
  });
});
