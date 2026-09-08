import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { LpStickyCtaBar } from "./lp-sticky-cta-bar";
import { CONSENT_BANNER_VISIBILITY_EVENT } from "@/components/analytics/consent-banner";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
}));

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, writable: true, configurable: true });
}

describe("LpStickyCtaBar", () => {
  afterEach(() => {
    cleanup();
    setScrollY(0);
  });

  it("stays hidden (translated off-screen) before the visitor scrolls past the hero", () => {
    render(<LpStickyCtaBar />);
    const link = screen.getByRole("link", { name: /começar grátis/i, hidden: true });
    expect(link.closest("div[aria-hidden]")).toHaveAttribute("aria-hidden", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("becomes visible after scrolling past the threshold", () => {
    render(<LpStickyCtaBar />);
    act(() => {
      setScrollY(600);
      window.dispatchEvent(new Event("scroll"));
    });
    const link = screen.getByRole("link", { name: /começar grátis/i });
    expect(link.closest("div[aria-hidden]")).toHaveAttribute("aria-hidden", "false");
    expect(link).toHaveAttribute("tabindex", "0");
  });

  it("hides while the consent banner is visible, even after scrolling past the threshold", () => {
    render(<LpStickyCtaBar />);
    act(() => {
      setScrollY(600);
      window.dispatchEvent(new Event("scroll"));
    });
    expect(
      screen.getByRole("link", { name: /começar grátis/i }).closest("div[aria-hidden]"),
    ).toHaveAttribute("aria-hidden", "false");

    act(() => {
      window.dispatchEvent(new CustomEvent(CONSENT_BANNER_VISIBILITY_EVENT, { detail: true }));
    });
    expect(
      screen.getByRole("link", { name: /começar grátis/i, hidden: true }).closest("div[aria-hidden]"),
    ).toHaveAttribute("aria-hidden", "true");

    act(() => {
      window.dispatchEvent(new CustomEvent(CONSENT_BANNER_VISIBILITY_EVENT, { detail: false }));
    });
    expect(
      screen.getByRole("link", { name: /começar grátis/i }).closest("div[aria-hidden]"),
    ).toHaveAttribute("aria-hidden", "false");
  });
});
