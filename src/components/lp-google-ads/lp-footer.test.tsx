import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LpFooter } from "./lp-footer";

describe("LpFooter", () => {
  it("shows a discreet copyright line instead of the MEI/CNPJ/address identification", () => {
    render(<LpFooter />);
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument();
    expect(screen.queryByText(/CNPJ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bairro Pestana/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\(MEI\)/i)).not.toBeInTheDocument();
  });

  it("keeps the Privacidade and Termos de uso links", () => {
    render(<LpFooter />);
    expect(screen.getByRole("link", { name: "Privacidade" })).toHaveAttribute("href", "/privacidade");
    expect(screen.getByRole("link", { name: "Termos de uso" })).toHaveAttribute("href", "/termos");
  });
});
