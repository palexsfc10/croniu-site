import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LpFaqSection } from "./lp-faq-section";
import { trackFaqInteraction } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackFaqInteraction: vi.fn(),
}));

describe("LpFaqSection", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("opens the first question by default", () => {
    render(<LpFaqSection />);
    expect(screen.getByText(/funciona para quantos alunos/i)).toBeInTheDocument();
  });

  it("fires faq_interaction with a stable question_id (never the question text) on toggle", async () => {
    const user = userEvent.setup();
    render(<LpFaqSection />);
    await user.click(screen.getByRole("button", { name: /instalar algum aplicativo/i }));
    expect(trackFaqInteraction).toHaveBeenCalledWith({ question_id: "instalar_aplicativo", action: "open" });
  });
});
