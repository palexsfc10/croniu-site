import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./site-header";
import { trackCtaClick, trackLoginStart, trackSignUpStart } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
}));

describe("SiteHeader", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("links primary CTA to the app register page", () => {
    render(<SiteHeader />);
    const ctas = screen.getAllByRole("link", { name: "Começar grátis" });
    expect(ctas[0]).toHaveAttribute("href", "https://app.croniu.com.br/register");
  });

  it("links login CTA to the app login page", () => {
    render(<SiteHeader />);
    const logins = screen.getAllByRole("link", { name: "Entrar" });
    expect(logins[0]).toHaveAttribute("href", "https://app.croniu.com.br/login");
  });

  it("fires cta_click + sign_up_start when the register CTA is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getAllByRole("link", { name: "Começar grátis" })[0]!);
    expect(trackCtaClick).toHaveBeenCalledWith({
      cta_name: "comecar_gratis",
      cta_location: "header",
      destination: "register",
    });
    expect(trackSignUpStart).toHaveBeenCalledWith({ source: "header", cta_location: "header" });
  });

  it("fires cta_click + login_start when the login CTA is clicked", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getAllByRole("link", { name: "Entrar" })[0]!);
    expect(trackLoginStart).toHaveBeenCalledWith({ cta_location: "header" });
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(screen.queryByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument();
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });
});
