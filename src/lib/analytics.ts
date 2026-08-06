import { siteConfig } from "./site";

export type AnalyticsEventProps = Record<string, string | number | boolean | undefined>;

/**
 * Stub de analytics. Sem provedor configurado ainda — quando
 * NEXT_PUBLIC_ANALYTICS_ENABLED=true, apenas registra localmente (dev)
 * até que um fornecedor real seja integrado.
 */
export function trackEvent(eventName: string, props?: AnalyticsEventProps): void {
  if (!siteConfig.analyticsEnabled) return;
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", eventName, props ?? {});
  }
}
