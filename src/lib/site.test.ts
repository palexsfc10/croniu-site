import { describe, expect, it } from "vitest";
import { formatPriceBRL, siteConfig } from "./site";

describe("siteConfig", () => {
  it("falls back to documented product defaults", () => {
    expect(siteConfig.priceCents).toBe(2990);
    expect(siteConfig.trialDays).toBe(7);
    expect(siteConfig.aiActionDemosEnabled).toBe(false);
    expect(siteConfig.analyticsEnabled).toBe(false);
  });

  it("strips trailing slashes from configured URLs", () => {
    expect(siteConfig.siteUrl.endsWith("/")).toBe(false);
    expect(siteConfig.appUrl.endsWith("/")).toBe(false);
  });
});

describe("formatPriceBRL", () => {
  it("formats cents as Brazilian currency", () => {
    expect(formatPriceBRL(2990)).toMatch(/R\$\s*29,90/);
  });

  it("uses the configured default price when no argument is passed", () => {
    expect(formatPriceBRL()).toMatch(/R\$\s*29,90/);
  });
});
