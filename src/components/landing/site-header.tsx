"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandWordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { loginUrl, registerUrl } from "@/lib/site";

const NAV_LINKS = [
  { href: "#produto", label: "Produto" },
  { href: "#ia", label: "IA" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#preco", label: "Preço" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Ir para o início">
          <BrandWordmark size="md" />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={loginUrl} variant="ghost" size="md">
            Entrar
          </Button>
          <Button href={registerUrl} variant="primary" size="md">
            Começar grátis
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </Container>

      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-ink/10 bg-bg lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-ink/80 hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 px-3">
              <Button href={loginUrl} variant="secondary" size="md" className="w-full">
                Entrar
              </Button>
              <Button href={registerUrl} variant="primary" size="md" className="w-full">
                Começar grátis
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
