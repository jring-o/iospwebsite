"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTIONS: Array<{ href: string; label: string }> = [
  { href: "#iosp2026", label: "IOSP 2026" },
  { href: "#how", label: "Operating model" },
  { href: "#build", label: "Theory" },
  { href: "#substrate", label: "The Substrate" },
  { href: "#iosp2025", label: "Last year" },
  { href: "#voices", label: "Letters page" },
  { href: "#stay", label: "Newsletter" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mast-strip">
      <div className="wrap">
        <div className="mast-strip-inner mono">
          <span className="mast-strip-lockup">
            <svg
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="mast-strip-mark"
            >
              <g transform="rotate(30 16 16)">
                <path
                  d="M 25 21 A 11 11 0 1 1 25 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 24.75 14.5 L 26 17 L 27.75 14.5 Z"
                  fill="var(--royal)"
                />
              </g>
            </svg>
            Institute of Open Science Practices
          </span>
          <span>Since 2024</span>
          <span className="nav-menu" ref={wrapRef}>
            <button
              type="button"
              className="nav-menu-trigger"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              Sections <span aria-hidden="true">{open ? "↑" : "↓"}</span>
            </button>
            {open && (
              <ul className="nav-menu-panel" role="menu">
                {SECTIONS.map((s) => (
                  <li key={s.href} role="none">
                    <a
                      href={s.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
