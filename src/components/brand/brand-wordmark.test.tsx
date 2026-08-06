import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandWordmark } from "./brand-wordmark";

describe("BrandWordmark", () => {
  it("exposes the full 'Croniu' accessible name", () => {
    render(<BrandWordmark />);
    expect(screen.getByRole("img", { name: "Croniu" })).toBeInTheDocument();
  });

  it("visually splits the mark into 'Cron' and 'iu'", () => {
    render(<BrandWordmark />);
    expect(screen.getByText("Cron")).toBeInTheDocument();
    expect(screen.getByText("iu")).toBeInTheDocument();
  });
});
