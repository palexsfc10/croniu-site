"use client";

import { OPEN_CONSENT_PREFERENCES_EVENT } from "./consent-banner";
import { isGtmEnabled } from "@/lib/analytics/gtm";

/** Lets a visitor reopen the consent banner after their first choice. Hidden when analytics is off. */
export function CookiePreferencesLink() {
  if (!isGtmEnabled()) return null;
  return (
    <button
      type="button"
      className="hover:text-ink"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CONSENT_PREFERENCES_EVENT))}
    >
      Preferências de cookies
    </button>
  );
}
