"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandWordmark } from "@/components/brand";
import { Container } from "@/components/ui/container";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { loginUrl, registerUrl } from "@/lib/site";

const NAV_LINKS = [
  { href: "#produto", label: "Produto" },
  { href: "#ia", label: "IA" },
  { href: "#preco", label: "Preço" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5" aria-label="Ir para o início">
          <BrandWordmark size="md" tone="dark" />
          <span className="text-xs font-medium text-white/40 sm:text-sm">Workspace</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <AppCtaLink
            href={loginUrl}
            intent="login"
            ctaName="entrar"
            ctaLocation="header"
            variant="ghost"
            size="md"
            className="text-white hover:bg-white/10"
          >
            Entrar
          </AppCtaLink>
          <AppCtaLink
            href={registerUrl}
            intent="register"
            ctaName="comecar_gratis"
            ctaLocation="header"
            variant="primary"
            size="md"
          >
            Começar grátis
          </AppCtaLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-white lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </Container>

      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy-950 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-white/80 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-3">
              <AppCtaLink
                href={loginUrl}
                intent="login"
                ctaName="entrar"
                ctaLocation="header"
                variant="secondary"
                size="md"
                className="w-full"
              >
                Entrar
              </AppCtaLink>
              <AppCtaLink
                href={registerUrl}
                intent="register"
                ctaName="comecar_gratis"
                ctaLocation="header"
                variant="primary"
                size="md"
                className="w-full"
              >
                Começar grátis
              </AppCtaLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
