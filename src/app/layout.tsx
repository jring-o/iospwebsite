import type { Metadata } from "next";
import { Inter, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IOSP - Institute of Open Science Practices",
    template: "%s | IOSP",
  },
  description: "Building the infrastructure for open science. IOSP brings together researchers, technologists, and funders to advance transparent, reproducible, and accessible scientific practice.",
  keywords: ["open science", "research infrastructure", "scientific collaboration", "reproducibility", "transparency", "open access"],
  authors: [{ name: "IOSP" }],
  creator: "Institute of Open Science Practices",
  metadataBase: new URL("https://iosp.science"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iosp.science",
    siteName: "IOSP",
    title: "IOSP - Institute of Open Science Practices",
    description: "Building the infrastructure for open science. Join the community advancing transparent, reproducible, and accessible scientific practice.",
    images: [
      {
        url: "/og-image-main.png",
        width: 1200,
        height: 630,
        alt: "IOSP - Institute of Open Science Practices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IOSP - Institute of Open Science Practices",
    description: "Building the infrastructure for open science.",
    images: ["/og-image-main.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
