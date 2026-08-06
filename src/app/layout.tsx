import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const description =
  "Croniu organiza ciclos, recebimentos, renovações e a agenda de profissionais com clientes recorrentes — com uma IA que consulta sua operação e nunca age sem confirmação.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Croniu — sua rotina organizada, com uma IA trabalhando com você",
    template: "%s · Croniu",
  },
  description,
  keywords: [
    "gestão de clientes recorrentes",
    "agenda para profissionais autônomos",
    "ciclos de aulas",
    "renovação de clientes",
    "software para personal trainer",
    "software para professores particulares",
  ],
  authors: [{ name: "NTWS Labs" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.siteUrl,
    siteName: "Croniu",
    title: "Croniu — sua rotina organizada, com uma IA trabalhando com você",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Croniu — sua rotina organizada, com uma IA trabalhando com você",
    description,
  },
  icons: {
    icon: "/icons/icon.svg",
    shortcut: "/icons/icon.svg",
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#152033",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Croniu",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteConfig.siteUrl,
  description,
  offers: {
    "@type": "Offer",
    price: (siteConfig.priceCents / 100).toFixed(2),
    priceCurrency: "BRL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
