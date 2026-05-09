"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function readCurrent(): Theme {
  if (typeof document === "undefined") return "light";
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "light" || t === "dark") return t;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readCurrent());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      // Only follow system pref when there's no manual override stored.
      try {
        if (!localStorage.getItem("iosp-theme")) setTheme(readCurrent());
      } catch {
        setTheme(readCurrent());
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("iosp-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="font-mono inline-flex items-center gap-1.5 border border-rule px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:border-royal hover:text-royal"
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
      />
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
