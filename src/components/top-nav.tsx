"use client";

import { useEffect, useState } from "react";

const SECTIONS: Array<{ href: string; label: string }> = [
  { href: "#iosp2026", label: "IOSP 2026" },
  { href: "#how", label: "Operating model" },
  { href: "#build", label: "Theory" },
  { href: "#substrate", label: "The Substrate" },
  { href: "#iosp2025", label: "Last year" },
  { href: "#voices", label: "Letters page" },
  { href: "#stay", label: "Newsletter" },
];

const NAV_OFFSET = 96;

function formatScreenLabel(raw: string | null): string {
  if (!raw) return "Since 2024";
  if (/masthead/i.test(raw)) return "Since 2024";
  const stripped = raw.replace(/^\d+\s+/, "");
  return stripped.toUpperCase();
}

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState<string | null>(null);

  // Escape closes the veil; scroll is locked while it's open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Track which section owns the viewport for the island's readout.
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-screen-label]"),
    );
    if (els.length === 0) return;

    let raf = 0;

    function update() {
      raf = 0;
      let active: HTMLElement = els[0];
      for (const el of els) {
        const top = el.getBoundingClientRect().top;
        if (top - NAV_OFFSET <= 0) active = el;
        else break;
      }
      setCurrentLabel(active.getAttribute("data-screen-label"));
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-5 z-40 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-3 bg-white/70 py-1.5 pl-4 pr-1.5 shadow-[0_12px_40px_-16px_rgba(20,26,74,0.18)] ring-1 ring-black/[0.08] backdrop-blur-2xl sm:gap-4">
          <span className="flex items-center gap-2.5">
            <svg
              width="17"
              height="17"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0 text-ink"
            >
              <g transform="rotate(30 16 16)">
                <path
                  d="M 25 21 A 11 11 0 1 1 25 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path d="M 24.75 14.5 L 26 17 L 27.75 14.5 Z" fill="var(--royal)" />
              </g>
            </svg>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-ink lg:inline">
              Institute of Open Science Practices
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-black/10 sm:block"
          />
          <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft tabular-nums sm:inline">
            {formatScreenLabel(currentLabel)}
          </span>
          <button
            type="button"
            className={`burger${open ? " open" : ""} grid h-9 w-9 place-items-center bg-black/[0.04] text-ink ring-1 ring-black/[0.08] transition-colors duration-500 ease-spring hover:bg-black/[0.06]`}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Sections"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="l1" aria-hidden="true" />
            <span className="l2" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`nav-veil${open ? " open" : ""}`} role="dialog" aria-modal="true">
        <nav className="wrap">
          <div className="eyebrow mb-8">Sections</div>
          <ul className="m-0 list-none space-y-2 p-0">
            {SECTIONS.map((s, i) => (
              <li
                key={s.href}
                style={
                  open
                    ? { transitionDelay: `${120 + i * 55}ms` }
                    : { transitionDelay: "0ms" }
                }
              >
                <a href={s.href} onClick={() => setOpen(false)}>
                  {s.label}
                  <span className="arr" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
