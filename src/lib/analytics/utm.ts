/** Only these survive the hop from croniu.com.br to app.croniu.com.br. */
export const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
] as const;

export type TrackedParams = Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

export function pickTrackedParams(search: string): TrackedParams {
  const params = new URLSearchParams(search);
  const picked: TrackedParams = {};
  for (const key of TRACKED_PARAMS) {
    const value = params.get(key);
    if (value) picked[key] = value;
  }
  return picked;
}

/** Never overwrites a param already present on `url`. */
export function appendTrackedParams(url: string, tracked: TrackedParams): string {
  const keys = Object.keys(tracked) as (keyof TrackedParams)[];
  if (keys.length === 0) return url;
  const parsed = new URL(url);
  for (const key of keys) {
    const value = tracked[key];
    if (value && !parsed.searchParams.has(key)) {
      parsed.searchParams.set(key, value);
    }
  }
  return parsed.toString();
}
