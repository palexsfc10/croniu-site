"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { CONSENT_UPDATED_EVENT, getStoredConsent } from "@/lib/analytics/consent";
import { META_PIXEL_ID, isMetaPixelEnabled, metaPixelTrackCalls } from "@/lib/analytics/meta-pixel";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CONSENT_UPDATED_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onChange);
}
function getSnapshot(): boolean {
  return getStoredConsent()?.marketing === true;
}
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Meta Pixel base code — same gating philosophy as app.croniu.com.br's
 * `MetaPixelScripts`: injected only once the visitor has explicitly granted
 * "marketing" consent (see consent-banner.tsx), on top of `isMetaPixelEnabled()`
 * (id set + production build). No Advanced Matching, no user data passed to
 * `fbq('init', ...)` — nothing beyond the standard anonymous snippet.
 *
 * Fires `PageView` once (standard event, `fbq('track', 'PageView')`) and,
 * only while the current route is `/personal-trainer`, `ViewContent` right
 * after it (also standard, `fbq('track', 'ViewContent')`) — both in the same
 * script execution, so there's no race between "script finished loading" and
 * "should ViewContent fire": by the time this text runs, `fbq` is already
 * the real queueing function (the IIFE below defines it synchronously,
 * before `fbevents.js` even finishes downloading). Reused unmodified on
 * every other route, where only `PageView` fires — never `ViewContent`.
 */
export function MetaPixelScripts() {
  const marketingConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();
  if (!isMetaPixelEnabled() || !marketingConsent) return null;

  const trackCalls = metaPixelTrackCalls(pathname);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
${trackCalls}`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
