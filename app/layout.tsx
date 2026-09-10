import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "./lib/site-config";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

const title = `${siteConfig.company.name} — Sell Your House Fast for Cash`;
const description = `We buy houses and small multifamily properties for cash in any condition. No repairs, no agents, no fees. ${siteConfig.market.line}. Get a cash offer within 24 hours.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: title,
    template: `%s — ${siteConfig.company.name}`,
  },
  description,
  applicationName: siteConfig.company.name,
  keywords: [
    "sell house fast",
    "cash home buyer",
    "we buy houses",
    "sell house as is",
    siteConfig.market.short,
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: siteConfig.company.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} ${fraunces.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:rounded-md focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-paper"
        >
          Skip to content
        </a>
        <ScrollReveal />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
