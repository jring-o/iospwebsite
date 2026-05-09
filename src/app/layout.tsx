import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Inline script: read localStorage["iosp-theme"] and apply data-theme on <html>
// before paint, so the page never flashes the wrong theme on load.
const themeScript = `(function(){try{var t=localStorage.getItem('iosp-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1018" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-paper text-ink antialiased">
        <main>{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: false,
            classNames: {
              toast:
                "border border-rule bg-paper-card text-ink rounded-none shadow-md",
              title: "font-serif text-ink",
              description: "text-ink-soft",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
