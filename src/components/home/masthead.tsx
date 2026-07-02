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
          <p className="m-0 pt-9 text-center font-serif text-[clamp(19px,2.2vw,23px)] italic text-royal">
            “Build the infrastructure that makes open easy to practice.”
          </p>
        </Reveal>

      </div>
    </header>
  );
}
