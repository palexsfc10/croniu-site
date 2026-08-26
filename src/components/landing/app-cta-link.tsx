"use client";

import { Button, type LinkButtonProps } from "@/components/ui/button";
import { useTrackingParams } from "@/components/analytics/tracking-params-provider";
import { appendTrackedParams } from "@/lib/analytics/utm";
import { trackCtaClick, trackLoginStart, trackSignUpStart, type CtaLocation } from "@/lib/analytics/gtm";

type AppCtaLinkProps = LinkButtonProps & {
  intent: "register" | "login";
  ctaName: string;
  ctaLocation: CtaLocation;
};

/** CTA that goes from croniu.com.br to app.croniu.com.br: carries UTMs and fires the funnel-start event. */
export function AppCtaLink({ href, intent, ctaName, ctaLocation, onClick, ...props }: AppCtaLinkProps) {
  const trackingParams = useTrackingParams();
  const enrichedHref = appendTrackedParams(href, trackingParams);

  return (
    <Button
      href={enrichedHref}
      onClick={(event) => {
        trackCtaClick({ cta_name: ctaName, cta_location: ctaLocation, destination: intent });
        if (intent === "register") {
          trackSignUpStart({ source: ctaLocation, cta_location: ctaLocation });
        } else {
          trackLoginStart({ cta_location: ctaLocation });
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
}
