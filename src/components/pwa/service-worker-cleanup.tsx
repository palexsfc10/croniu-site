"use client";

import { useEffect } from "react";

/**
 * Removes leftover service workers from other local Croniu apps
 * that previously ran on the same origin/port (e.g. the PWA).
 */
export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.getRegistrations().then((regs) => {
      for (const reg of regs) {
        void reg.unregister();
      }
    });
  }, []);

  return null;
}
