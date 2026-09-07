import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FinalCtaSection } from "./final-cta-section";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
}));

describe("FinalCtaSection", () => {
  it("renders the CTA with readable text on its background (regression: was white text on a white button)", () => {
    render(<FinalCtaSection />);
    const link = screen.getByRole("link", { name: /Começar grátis por/i });
    expect(link.className).not.toMatch(/\btext-white\b/);
    expect(link.className).toMatch(/\btext-ink\b/);
  });
});
