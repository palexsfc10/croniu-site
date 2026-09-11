"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { getStoredConsent, pushConsentUpdate, storeConsent, type ConsentChoice } from "@/lib/analytics/consent";
import { isGtmEnabled } from "@/lib/analytics/gtm";
import { isMetaPixelEnabled } from "@/lib/analytics/meta-pixel";

export const OPEN_CONSENT_PREFERENCES_EVENT = "croniu:open-consent-preferences";
/** Dispatched on `window` with `detail: boolean` whenever the banner's own visibility changes — lets a page-specific fixed element (e.g. a sticky CTA bar) avoid stacking on top of it. */
export const CONSENT_BANNER_VISIBILITY_EVENT = "croniu:consent-banner-visibility";

const DEFAULT_DRAFT: ConsentChoice = { analytics: false, marketing: false };

function subscribeNothing(): () => void {
  return () => {};
}

/** No stored choice yet → show on first paint. SSR never knows, so default to hidden there. */
function hasNoStoredChoice(): boolean {
  return (isGtmEnabled() || isMetaPixelEnabled()) && getStoredConsent() === null;
}
function hasNoStoredChoiceServerSnapshot(): boolean {
  return false;
}

export function ConsentBanner() {
  // useSyncExternalStore (not useEffect+setState) avoids a hydration
  // mismatch between the server's "unknown" localStorage and the client's.
  const showOnFirstPaint = useSyncExternalStore(
    subscribeNothing,
    hasNoStoredChoice,
    hasNoStoredChoiceServerSnapshot,
  );
  const [manualVisible, setManualVisible] = useState<boolean | null>(null);
  const visible = manualVisible ?? showOnFirstPaint;
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(DEFAULT_DRAFT);
  const analyticsId = useId();
  const marketingId = useId();

  useEffect(() => {
    function handleReopen() {
      setDraft(getStoredConsent() ?? DEFAULT_DRAFT);
      setExpanded(true);
      setManualVisible(true);
    }
    window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handleReopen);
    return () => window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, handleReopen);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(CONSENT_BANNER_VISIBILITY_EVENT, { detail: visible }));
  }, [visible]);

  function apply(choice: ConsentChoice) {
    storeConsent(choice);
    pushConsentUpdate(choice);
    setManualVisible(false);
    setExpanded(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-lg sm:p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-ink">Cookies e privacidade</p>
          <p className="text-sm text-ink/70">
            Usamos cookies essenciais para o site funcionar e, com sua permissão, cookies de
            análise e de campanhas para entender como os visitantes chegam até o Croniu.{" "}
            <a href="/privacidade" className="font-medium text-brand-700 underline underline-offset-2">
              Política de Privacidade
            </a>
            .
          </p>
        </div>

        {expanded ? (
          <div className="flex flex-col gap-3 border-t border-ink/10 pt-4">
            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input type="checkbox" checked disabled className="mt-0.5 accent-brand-700" />
              <span>
                <span className="font-medium text-ink">Necessários</span> — sempre ativos, indispensáveis
                para o site funcionar.
              </span>
            </label>
            <label htmlFor={analyticsId} className="flex items-start gap-3 text-sm text-ink/70">
              <input
                id={analyticsId}
                type="checkbox"
                checked={draft.analytics}
                onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
                className="mt-0.5 accent-brand-700"
              />
              <span>
                <span className="font-medium text-ink">Analytics</span> — nos ajuda a entender de onde
                vêm os visitantes e como usam o site (Google Analytics, via Google Tag Manager).
              </span>
            </label>
            <label htmlFor={marketingId} className="flex items-start gap-3 text-sm text-ink/70">
              <input
                id={marketingId}
                type="checkbox"
                checked={draft.marketing}
                onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
                className="mt-0.5 accent-brand-700"
              />
              <span>
                <span className="font-medium text-ink">Marketing</span> — mede o resultado de
                campanhas de anúncio (Meta Pixel).
              </span>
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          {expanded ? (
            <Button variant="secondary" size="md" onClick={() => apply(draft)}>
              Salvar preferências
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setDraft(getStoredConsent() ?? DEFAULT_DRAFT);
                setExpanded(true);
              }}
            >
              Configurar
            </Button>
          )}
          <Button
            variant="secondary"
            size="md"
            onClick={() => apply({ analytics: false, marketing: false })}
          >
            Recusar opcionais
          </Button>
          <Button size="md" onClick={() => apply({ analytics: true, marketing: true })}>
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  );
}
