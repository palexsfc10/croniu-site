"use client";

import { useSyncExternalStore } from "react";
import { pickTrackedParams, type TrackedParams } from "@/lib/analytics/utm";

/**
 * Reads utm_* / gclid params from the landing URL so CTA links can carry
 * them into app.croniu.com.br. Built on `useSyncExternalStore` (not
 * useEffect+setState) specifically so the server snapshot (no params — the
 * server never sees the browser URL) and the client snapshot never disagree
 * in a way React would flag as a hydration mismatch.
 */
const EMPTY_PARAMS: TrackedParams = {};
let cachedSearch: string | undefined;
let cachedParams: TrackedParams = EMPTY_PARAMS;

function subscribe(): () => void {
  return () => {};
}

function getSnapshot(): TrackedParams {
  if (window.location.search !== cachedSearch) {
    cachedSearch = window.location.search;
    cachedParams = pickTrackedParams(cachedSearch);
  }
  return cachedParams;
}

function getServerSnapshot(): TrackedParams {
  return EMPTY_PARAMS;
}

export function useTrackingParams(): TrackedParams {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
