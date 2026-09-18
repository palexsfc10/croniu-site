import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqSection } from "./faq-section";
import { trackFaqInteraction } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackFaqInteraction: vi.fn(),
}));

describe("FaqSection", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("tracks faq_interaction with a stable id, never the raw question text", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);
    const button = screen.getByRole("button", { name: "O que acontece quando o teste grátis termina?" });
    await user.click(button);
    expect(trackFaqInteraction).toHaveBeenCalledWith({ question_id: "fim_teste_gratis", action: "open" });
    await user.click(button);
    expect(trackFaqInteraction).toHaveBeenCalledWith({ question_id: "fim_teste_gratis", action: "close" });
  });

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

  it("emits a matching FAQPage JSON-LD for rich snippets, with no leftover JSX in the answer text", () => {
    const { container } = render(<FaqSection />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.innerHTML) as {
      "@type": string;
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(8);
    expect(data.mainEntity[0]!.name).toBe("Funciona no computador e no celular?");
    const cancelAnswer = data.mainEntity.find((q) => q.name === "Posso cancelar quando quiser?");
    expect(cancelAnswer!.acceptedAnswer.text).toContain("appcroniu@gmail.com");
    expect(cancelAnswer!.acceptedAnswer.text).not.toContain("[object Object]");
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
