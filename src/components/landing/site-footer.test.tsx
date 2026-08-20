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

  it("shows the default support email", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "appcroniu@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:appcroniu@gmail.com",
    );
  });

  it("shows the legal entity and CNPJ", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/CNPJ 31\.892\.140\/0001-45/)).toBeInTheDocument();
  });
});
