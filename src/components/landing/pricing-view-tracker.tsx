"use client";

import { useEffect, useRef } from "react";
import { trackPricingView } from "@/lib/analytics/gtm";

/** Invisible sentinel: fires `pricing_view` once, the first time the pricing section enters the viewport. */
export function PricingViewTracker() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (fired.current) return;
        if (entries.some((entry) => entry.isIntersecting)) {
          fired.current = true;
          trackPricingView();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />;
}
