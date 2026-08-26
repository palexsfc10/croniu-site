import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppCtaLink } from "./app-cta-link";
import { trackCtaClick, trackLoginStart, trackSignUpStart } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
}));

describe("AppCtaLink", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    window.history.pushState({}, "", "/");
  });

  it("links to the plain app url when there are no campaign params", () => {
    render(
      <AppCtaLink href="https://app.croniu.com.br/register" intent="register" ctaName="x" ctaLocation="hero">
        Começar grátis
      </AppCtaLink>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://app.croniu.com.br/register");
  });

  it("fires cta_click and sign_up_start on click, with the intended location", async () => {
    const user = userEvent.setup();
    render(
      <AppCtaLink href="https://app.croniu.com.br/register" intent="register" ctaName="comecar" ctaLocation="pricing">
        Começar grátis
      </AppCtaLink>,
    );
    await user.click(screen.getByRole("link"));
    expect(trackCtaClick).toHaveBeenCalledWith({ cta_name: "comecar", cta_location: "pricing", destination: "register" });
    expect(trackSignUpStart).toHaveBeenCalledWith({ source: "pricing", cta_location: "pricing" });
    expect(trackLoginStart).not.toHaveBeenCalled();
  });

  it("fires login_start (not sign_up_start) for a login intent", async () => {
    const user = userEvent.setup();
    render(
      <AppCtaLink href="https://app.croniu.com.br/login" intent="login" ctaName="entrar" ctaLocation="header">
        Entrar
      </AppCtaLink>,
    );
    await user.click(screen.getByRole("link"));
    expect(trackLoginStart).toHaveBeenCalledWith({ cta_location: "header" });
    expect(trackSignUpStart).not.toHaveBeenCalled();
  });

  it("carries utm/gclid params from the landing url into the app link, without overwriting existing ones", async () => {
    window.history.pushState({}, "", "/?utm_source=instagram&utm_campaign=lancamento&ref=partner-code");
    render(
      <AppCtaLink href="https://app.croniu.com.br/register" intent="register" ctaName="x" ctaLocation="hero">
        Começar grátis
      </AppCtaLink>,
    );
    await waitFor(() =>
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "https://app.croniu.com.br/register?utm_source=instagram&utm_campaign=lancamento",
      ),
    );
    expect(screen.getByRole("link").getAttribute("href")).not.toContain("ref=");
  });
});
