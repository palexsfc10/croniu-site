import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { RoutePageviewTracker } from "./route-pageview-tracker";
import { trackPageView } from "@/lib/analytics/gtm";

vi.mock("@/lib/analytics/gtm", () => ({
  trackPageView: vi.fn(),
}));

let mockPathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("RoutePageviewTracker", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockPathname = "/";
  });

  it("fires exactly one page_view on initial mount", () => {
    render(<RoutePageviewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(1);
    expect(trackPageView).toHaveBeenCalledWith(
      expect.objectContaining({ page_path: "/", page_title: expect.any(String) }),
    );
  });

  it("does not duplicate the pageview on a re-render with the same path", () => {
    const { rerender } = render(<RoutePageviewTracker />);
    rerender(<RoutePageviewTracker />);
    rerender(<RoutePageviewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(1);
  });

  it("fires a new page_view when the pathname actually changes", () => {
    const { rerender } = render(<RoutePageviewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(1);
    mockPathname = "/termos";
    rerender(<RoutePageviewTracker />);
    expect(trackPageView).toHaveBeenCalledTimes(2);
    expect(trackPageView).toHaveBeenLastCalledWith(expect.objectContaining({ page_path: "/termos" }));
  });
});
