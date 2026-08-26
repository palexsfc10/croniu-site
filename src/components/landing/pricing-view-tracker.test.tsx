import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { PricingViewTracker } from "./pricing-view-tracker";
import { trackPricingView } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackPricingView: vi.fn(),
}));

let observerCallback: IntersectionObserverCallback = () => {};
const disconnect = vi.fn();

beforeEach(() => {
  disconnect.mockClear();
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn().mockImplementation(function (this: unknown, callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return { observe: vi.fn(), disconnect, unobserve: vi.fn() };
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("PricingViewTracker", () => {
  it("fires pricing_view only once when the sentinel intersects", () => {
    render(<PricingViewTracker />);
    const entry = { isIntersecting: true } as IntersectionObserverEntry;
    observerCallback([entry], {} as IntersectionObserver);
    observerCallback([entry], {} as IntersectionObserver);
    expect(trackPricingView).toHaveBeenCalledTimes(1);
    expect(disconnect).toHaveBeenCalled();
  });

  it("does not fire while the sentinel is not intersecting", () => {
    render(<PricingViewTracker />);
    observerCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(trackPricingView).not.toHaveBeenCalled();
  });
});
