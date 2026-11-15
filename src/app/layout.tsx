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

const title = "Croniu — Em manutenção";
const description = "Estamos preparando uma nova experiência.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.siteUrl,
    siteName: "Croniu",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
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
  themeColor: "#05070f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-navy-950 font-sans text-white antialiased">{children}</body>
    </html>
  );
}
