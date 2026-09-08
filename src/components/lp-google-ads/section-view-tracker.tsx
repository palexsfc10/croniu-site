"use client";

import { useEffect, useRef } from "react";
import { trackFeatureView } from "@/lib/analytics/gtm";

/**
 * Invisible sentinel: fires `feature_view` once, the first time this section
 * enters the viewport. Reuses the `feature_view` helper already reserved
 * (unused) in gtm.ts, following the same pattern as PricingViewTracker.
 */
export function SectionViewTracker({ featureId }: { featureId: string }) {
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
          trackFeatureView({ feature_id: featureId });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [featureId]);

  return <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />;
}
