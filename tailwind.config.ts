import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // IOSP design tokens — read CSS custom properties so the data-theme
        // toggle and the inverted IOSP-2026 palette swap atomically.
        paper: "var(--paper)",
        "paper-deep": "var(--paper-deep)",
        "paper-card": "var(--paper-card)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-mute": "var(--ink-mute)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        royal: "var(--royal)",
        "royal-deep": "var(--royal-deep)",
        "royal-soft": "var(--royal-soft)",

        // inverted palette (IOSP 2026 section + interior cards)
        "i-paper": "var(--i-paper)",
        "i-paper-hover": "var(--i-paper-hover)",
        "i-ink": "var(--i-ink)",
        "i-ink-soft": "var(--i-ink-soft)",
        "i-rule": "var(--i-rule)",
        "i-royal": "var(--i-royal)",

        // shadcn-compatible semantic names mapped to the new palette so the
        // existing UI primitives (Button, Input, Dialog, etc.) inherit the
        // new system without per-component rewrites.
        background: "var(--paper)",
        foreground: "var(--ink)",
        card: {
          DEFAULT: "var(--paper-card)",
          foreground: "var(--ink)",
        },
        popover: {
          DEFAULT: "var(--paper-card)",
          foreground: "var(--ink)",
        },
        primary: {
          DEFAULT: "var(--royal)",
          foreground: "var(--paper)",
        },
        secondary: {
          DEFAULT: "var(--paper-deep)",
          foreground: "var(--ink)",
        },
        muted: {
          DEFAULT: "var(--paper-deep)",
          foreground: "var(--ink-soft)",
        },
        accent: {
          DEFAULT: "var(--royal-soft)",
          foreground: "var(--royal)",
        },
        destructive: {
          DEFAULT: "#C23555",
          foreground: "var(--paper)",
        },
        border: "var(--rule)",
        input: "var(--rule)",
        ring: "var(--royal)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "IBM Plex Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        // Kill default shadcn radii — the system is intentionally squared.
        // rounded-full still works (default Tailwind) for the avatar/dot cases.
        lg: "0",
        md: "0",
        sm: "0",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
