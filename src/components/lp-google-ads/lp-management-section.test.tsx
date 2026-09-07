import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LpManagementSection } from "./lp-management-section";

vi.mock("@/lib/analytics/gtm", () => ({
  trackFeatureView: vi.fn(),
}));

describe("LpManagementSection", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("shows the agenda screenshot by default", () => {
    render(<LpManagementSection />);
    expect(screen.getByAltText(/agenda semanal do croniu/i)).toBeInTheDocument();
  });

  it("switches to the financeiro screenshot when that tab is selected", async () => {
    const user = userEvent.setup();
    render(<LpManagementSection />);
    await user.click(screen.getByRole("button", { name: /financeiro/i }));
    expect(screen.getByAltText(/painel financeiro do croniu/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/agenda semanal do croniu/i)).not.toBeInTheDocument();
  });
});
