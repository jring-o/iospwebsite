import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Institute of Open Science Practices",
    template: "%s | IOSP",
  },
  description:
    "An event, a community, and a coordinating institute for the people building the infrastructure open science depends on.",
  keywords: [
    "open science",
    "research infrastructure",
    "scientific collaboration",
    "reproducibility",
    "transparency",
    "open access",
  ],
  authors: [{ name: "IOSP" }],
  creator: "Institute of Open Science Practices",
  metadataBase: new URL("https://iosp.science"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iosp.science",
    siteName: "IOSP",
    title: "Institute of Open Science Practices",
    description:
      "Build the substrate open science depends on. An event, a community, and a coordinating institute.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Institute of Open Science Practices",
    description: "Build the substrate open science depends on.",
    creator: "@iosp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#f6f7f9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <div className="ether" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <main>{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: false,
            classNames: {
              toast:
                "rounded-2xl border border-rule bg-paper-card text-ink shadow-[0_16px_48px_-16px_rgba(20,26,74,0.2)] backdrop-blur-xl",
              title: "font-medium text-ink",
              description: "text-ink-soft",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
