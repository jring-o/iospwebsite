import { Reveal } from "@/components/reveal";

const PRINCIPLES: Array<{ num: string; title: string }> = [
  { num: "01", title: "Community-owned" },
  { num: "02", title: "Collaborative" },
  { num: "03", title: "Auditable" },
];

export function ScienceShouldBe() {
  return (
    <section
      className="sect relative overflow-hidden"
      id="values"
      data-screen-label="Science Should Be"
    >
      <div
        className="halo left-[-10%] top-1/2 h-[380px] w-[520px] -translate-y-1/2 bg-royal-deep/15"
        aria-hidden="true"
      />
      <div className="wrap-narrow relative">
        <Reveal>
          <h2 className="display m-0 max-w-[14ch] text-[clamp(44px,6.4vw,88px)] text-ink">
            Science should be
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-6">
            {PRINCIPLES.map((p, i) => (
              <span key={p.num} className="inline-flex items-center gap-5">
                {i > 0 && (
                  <span
                    className="hidden h-px w-[clamp(24px,3.5vw,52px)] shrink-0 bg-gradient-to-r from-royal/70 to-royal/10 sm:block"
                    aria-hidden="true"
                  />
                )}
                <span className="font-serif text-[clamp(26px,3.4vw,44px)] italic leading-none tracking-tight text-royal">
                  {p.title}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
