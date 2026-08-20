import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqSection } from "./faq-section";

describe("FaqSection", () => {
  it("explains how to cancel and links to the real terms of use", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    await user.click(screen.getByRole("button", { name: "Posso cancelar quando quiser?" }));
    expect(screen.getByText(/appcroniu@gmail\.com/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Termos de Uso" })).toHaveAttribute("href", "/termos");
  });

  it("clarifies Croniu does not auto-charge the professional's clients", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    await user.click(
      screen.getByRole("button", { name: "O Croniu cobra os meus clientes automaticamente?" }),
    );
    expect(screen.getByText(/cobrança dos seus clientes finais continua sendo feita por você/i)).toBeInTheDocument();
  });

  it("expands and collapses an answer on click", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const secondQuestion = screen.getByRole("button", {
      name: "O que acontece quando o teste grátis termina?",
    });
    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");

    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute("aria-expanded", "true");

    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");
  });
});
