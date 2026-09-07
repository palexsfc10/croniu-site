"use client";

import { useEffect, useState } from "react";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { CONSENT_BANNER_VISIBILITY_EVENT } from "@/components/analytics/consent-banner";
import { registerUrl, siteConfig } from "@/lib/site";

const SHOW_AFTER_SCROLL_Y = 480;

/**
 * Mobile-only sticky CTA bar: reappears after the hero, so the single CTA
 * stays reachable without scrolling back up. Both this bar and the consent
 * banner are fixed to the bottom edge — stays hidden while the banner is
 * showing so the two never stack on top of each other.
 */
export function LpStickyCtaBar() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [consentBannerVisible, setConsentBannerVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolledPastHero(window.scrollY > SHOW_AFTER_SCROLL_Y);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onConsentVisibility(event: Event) {
      setConsentBannerVisible(Boolean((event as CustomEvent<boolean>).detail));
    }
    window.addEventListener(CONSENT_BANNER_VISIBILITY_EVENT, onConsentVisibility);
    return () => window.removeEventListener(CONSENT_BANNER_VISIBILITY_EVENT, onConsentVisibility);
  }, []);

  const visible = scrolledPastHero && !consentBannerVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(21,32,51,0.08)] backdrop-blur-md transition-transform duration-200 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <AppCtaLink
        href={registerUrl}
        intent="register"
        ctaName="comecar_gratis_sticky"
        ctaLocation="lp_ads_sticky"
        size="lg"
        className="w-full justify-center"
        tabIndex={visible ? 0 : -1}
      >
        Começar grátis por {siteConfig.trialDays} dias
      </AppCtaLink>
    </div>
  );
}
