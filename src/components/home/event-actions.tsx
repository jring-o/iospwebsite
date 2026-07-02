import { Reveal } from "@/components/reveal";

/**
 * Event action row — the royal IOSP 2026 block plus the three call-to-action
 * rectangles. Sits directly under the "The Event" chapter head, ahead of the
 * recessed event band.
 */
export function EventActions() {
  return (
    <div className="pb-14 md:pb-16">
      <div className="wrap">
        <Reveal delay={80}>
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-[minmax(260px,1fr)_2fr]">
            <a
              className="flex flex-col items-start justify-center gap-1.5 bg-royal px-7 py-6 text-paper no-underline transition-colors duration-500 ease-spring hover:bg-ink"
              href="#iosp2026"
            >
              <span className="display text-[28px] leading-none">IOSP 2026</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">
                Oct 12–15, 2026 · Leiden
              </span>
            </a>

            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
              <li className="flex">
                <a className="btn-glass w-full" href="#cta-showcase">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                    Submit to the tooling showcase
                  </span>
                  <span className="icircle">
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
              <li className="flex">
                <a className="btn-glass w-full" href="#cta-sponsor">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                    Sponsor a travel grant
                  </span>
                  <span className="icircle">
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
              <li className="flex">
                <a className="btn-glass w-full" href="#cta-register">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                    Attend
                  </span>
                  <span className="icircle">
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
