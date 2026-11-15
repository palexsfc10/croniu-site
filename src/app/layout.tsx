import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "CRONIU Labs — Em manutenção";
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
    siteName: "CRONIU Labs",
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
  themeColor: "#ff5a1f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body className="min-h-screen bg-[#090909] font-sans text-white antialiased">{children}</body>
    </html>
  );
}
