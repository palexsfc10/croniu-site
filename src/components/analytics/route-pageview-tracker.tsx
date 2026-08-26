"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics/gtm";

/**
 * Pushes one `page_view` per real route change. Uses `usePathname` (no
 * Suspense required, unlike `useSearchParams`) so the site stays static.
 * A ref guards against the double-invoke React does in dev/StrictMode —
 * without it the very first pageview would fire twice.
 *
 * GTM's built-in GA4 tag must have "send page_view automatically" turned
 * off and instead trigger off this dataLayer event — see docs/ANALYTICS.md.
 */
export function RoutePageviewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    trackPageView({
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
      page_referrer: document.referrer || undefined,
    });
  }, [pathname]);

  return null;
}
