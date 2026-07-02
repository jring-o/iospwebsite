import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";

export function Masthead() {
  return (
    <header
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-24 pt-32"
      data-screen-label="01 Masthead"
    >
      {/* ambient halo behind the title */}
      <div
        className="halo left-1/2 top-[8%] h-[420px] w-[640px] -translate-x-1/2 bg-royal-deep/25"
        aria-hidden="true"
      />

      <div className="wrap flex flex-col items-center text-center">
        <Reveal>
          <span className="mb-10 inline-flex items-center justify-center bg-white p-5 shadow-[inset_0_0_0_1px_rgba(20,22,29,0.10)]">
            <Mark
              size={72}
              arcColor="var(--ink)"
              arrowColor="var(--royal)"
              title="IOSP"
            />
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="display m-0 max-w-[13ch] text-balance text-[clamp(44px,8vw,110px)] leading-[0.98] text-ink">
            Institute of Open Science Practices
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-8 max-w-[58ch] text-pretty text-[clamp(17px,2vw,21px)] leading-relaxed text-ink-soft [&_em]:font-serif [&_em]:text-[1.12em] [&_em]:italic [&_em]:text-royal">
            An <em>event</em>, a <em>community</em>, and a{" "}
            <em>coordinating institute</em> for the people building, using, and
            advancing the infrastructure open science depends on.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-12 flex items-center gap-5 font-serif text-[clamp(19px,2.2vw,24px)] italic text-royal before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-royal/60 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-royal/60 sm:before:w-14 sm:after:w-14">
            “Build the infrastructure that makes open easy to practice.”
          </p>
        </Reveal>

        <Reveal delay={340} className="mt-14 w-full">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
            <a className="btn-pill group" href="#iosp2026">
              <span className="flex flex-col items-start gap-0.5 py-1.5">
                <span className="font-display text-lg font-semibold leading-none tracking-tight">
                  IOSP 2026
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-70">
                  Oct 12–15, 2026 · Leiden
                </span>
              </span>
              <span className="icircle h-10 w-10">
                <span aria-hidden="true">→</span>
              </span>
            </a>

            <ul className="m-0 mt-2 grid w-full list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
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
