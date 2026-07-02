import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // IOSP design tokens — single dark "ethereal glass" palette, exposed
        // as CSS custom properties so utilities and bespoke CSS stay in sync.
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
        mint: "var(--mint)",

        // Elevated interior surfaces (kept for components that address the
        // inner panel scale directly).
        "i-paper": "var(--i-paper)",
        "i-paper-hover": "var(--i-paper-hover)",
        "i-ink": "var(--i-ink)",
        "i-ink-soft": "var(--i-ink-soft)",
        "i-rule": "var(--i-rule)",
        "i-royal": "var(--i-royal)",

        // shadcn-compatible semantic names mapped to the palette so the
        // existing UI primitives (Button, Input, Dialog, etc.) inherit the
        // system without per-component rewrites.
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
          DEFAULT: "#F0587E",
          foreground: "var(--paper)",
        },
        border: "var(--rule)",
        input: "var(--rule)",
        ring: "var(--royal)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Geist", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "Bricolage Grotesque",
          "system-ui",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "Instrument Serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Geist Mono", "monospace"],
      },
      borderRadius: {
        lg: "1.25rem",
        md: "0.875rem",
        sm: "0.625rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
