import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { SectionViewTracker } from "./section-view-tracker";
import { trackFeatureView } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackFeatureView: vi.fn(),
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

describe("SectionViewTracker", () => {
  it("fires feature_view with the given featureId only once when the sentinel intersects", () => {
    render(<SectionViewTracker featureId="lp_ads_assistant" />);
    const entry = { isIntersecting: true } as IntersectionObserverEntry;
    observerCallback([entry], {} as IntersectionObserver);
    observerCallback([entry], {} as IntersectionObserver);
    expect(trackFeatureView).toHaveBeenCalledTimes(1);
    expect(trackFeatureView).toHaveBeenCalledWith({ feature_id: "lp_ads_assistant" });
    expect(disconnect).toHaveBeenCalled();
  });

  it("does not fire while the sentinel is not intersecting", () => {
    render(<SectionViewTracker featureId="lp_ads_visual" />);
    observerCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(trackFeatureView).not.toHaveBeenCalled();
  });
});
