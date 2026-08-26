"use client";

import { Button, type LinkButtonProps } from "@/components/ui/button";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics/gtm";

type HeroSecondaryCtaProps = LinkButtonProps & {
  ctaName: string;
  ctaLocation: CtaLocation;
};

/** Same-page anchor CTA (e.g. "Ver como funciona") — analytics only, no app redirect. */
export function HeroSecondaryCta({ href, ctaName, ctaLocation, onClick, ...props }: HeroSecondaryCtaProps) {
  return (
    <Button
      href={href}
      onClick={(event) => {
        trackCtaClick({ cta_name: ctaName, cta_location: ctaLocation, destination: href });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
