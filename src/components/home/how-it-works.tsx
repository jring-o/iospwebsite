import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    cad: "Ongoing",
    title: "Identify",
    body: "Through direct connections, workshops, and continuous engagement with the open science community, we identify critical gaps in infrastructure and the people and tools working to fill them.",
  },
  {
    cad: "Annual gathering",
    title: "Converge",
    body: "Once a year we bring together the identified players — researchers, technologists, and infrastructure builders — to showcase progress, define priorities, and align efforts around shared challenges.",
  },
  {
    cad: "Year-round",
    title: "Support",
    body: "Year-round, we provide resources, facilitate connections, and help collaborative progress move forward — turning event momentum into lasting infrastructure.",
  },
];

export function HowItWorks() {
  return (
    <section className="sect" id="how" data-screen-label="03 How IOSP Works">
      <div className="wrap">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <div className="eyebrow mb-6">Operating model</div>
            <h2 className="display m-0 text-[clamp(34px,5vw,64px)] text-ink">
              Identify · Converge · Support
            </h2>
            <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-ink-soft">
              IOSP is a continuous, year-long operation. The annual gathering
              is the checkpoint where we identify challenges and test
              solutions built by the open community throughout the year.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="flex">
              <div className="cell cell-hover w-full p-8">
                <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-royal/80">
                  {s.cad}
                </div>
                <h4 className="display m-0 mb-4 text-[30px] text-ink">
                  {s.title}
                </h4>
                <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-6">
          <div className="gshell">
            <div className="gcore grid items-center gap-8 px-8 py-9 md:grid-cols-[200px_1fr_120px] md:gap-12 md:px-12">
              <div>
                <h4 className="display m-0 text-[28px] text-ink">Repeat</h4>
                <div
                  className="mt-3 h-px w-12 bg-gradient-to-r from-royal to-transparent"
                  aria-hidden="true"
                />
              </div>
              <p className="m-0 font-serif text-[clamp(20px,2.4vw,26px)] italic leading-normal text-ink">
                Every gathering identifies bottlenecks and next steps. Every
                collaboration produces working code. Every year turns the key a
                little further.
              </p>
              <div className="hidden md:block">
                <svg
                  viewBox="0 0 150 150"
                  aria-hidden="true"
                  className="spin-slow block w-full"
                >
                  <g transform="rotate(30 75 75)">
                    <path
                      d="M 120 100 A 55 55 0 1 1 120 50"
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path d="M 116 68 L 122 80 L 130 68 Z" fill="var(--royal)" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
