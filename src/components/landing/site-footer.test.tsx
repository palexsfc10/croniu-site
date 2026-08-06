import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";
import { currentYear } from "@/lib/site";

describe("SiteFooter", () => {
  it("renders the current year and NTWS Labs credit", () => {
    render(<SiteFooter />);
    expect(screen.getByText(new RegExp(`${currentYear()}.*NTWS Labs`))).toBeInTheDocument();
  });

  it("links to privacy and terms pages", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Privacidade" })).toHaveAttribute("href", "/privacidade");
    expect(screen.getByRole("link", { name: "Termos de uso" })).toHaveAttribute("href", "/termos");
  });

  it("omits the support email when not configured", () => {
    render(<SiteFooter />);
    expect(screen.queryByRole("link", { name: /@/ })).not.toBeInTheDocument();
  });
});
