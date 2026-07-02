import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";

export function Masthead() {
  return (
    <header className="relative pb-20 pt-28 md:pt-32" data-screen-label="01 Masthead">
      <div className="wrap">
        {/* title block — headline left, mark right, lede spanning (as on the
            original masthead), closed by a royal gradient rule */}
        <Reveal>
          <div className="relative grid grid-cols-1 items-center gap-x-14 gap-y-9 pb-10 md:grid-cols-[1fr_auto]">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-royal to-transparent"
            />
            <Mark
              size={150}
              className="order-first h-20 w-20 md:order-none md:col-start-2 md:row-start-1 md:h-[150px] md:w-[150px] md:justify-self-center"
              arcColor="var(--ink)"
              arrowColor="var(--royal)"
              title="IOSP"
            />
            <h1 className="display m-0 max-w-[14ch] text-[clamp(44px,7vw,92px)] text-ink md:col-start-1 md:row-start-1">
              Institute of Open Science Practices
            </h1>
            <p className="m-0 max-w-[56ch] text-pretty text-[clamp(17px,1.9vw,21px)] leading-relaxed text-ink-soft md:col-span-2 [&_em]:font-serif [&_em]:text-[1.12em] [&_em]:italic [&_em]:text-royal">
              An <em>event</em>, a <em>community</em>, and a{" "}
              <em>coordinating institute</em> for the people building, using, and
              advancing the infrastructure open science depends on.
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="m-0 py-9 text-center font-serif text-[clamp(19px,2.2vw,23px)] italic text-royal">
            “Build the infrastructure that makes open easy to practice.”
          </p>
        </Reveal>

        {/* actions — royal primary block + three hairline CTAs, opened by a
            royal gradient rule (as on the original) */}
        <Reveal delay={160}>
          <div className="relative grid grid-cols-1 gap-4 pt-7 md:grid-cols-[minmax(260px,1fr)_2fr]">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-royal to-transparent"
            />
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
    </header>
  );
}
