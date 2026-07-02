import { Reveal } from "@/components/reveal";

export function StayConnected() {
  return (
    <section className="sect" id="stay" data-screen-label="09 Stay Connected">
      <div className="wrap">
        <Reveal>
          <div className="gshell">
            <div className="gcore relative px-8 py-14 text-center md:px-12 md:py-20">
              <div
                className="halo -top-28 left-1/2 h-[280px] w-[560px] -translate-x-1/2 bg-royal-deep/20"
                aria-hidden="true"
              />
              <div className="relative flex flex-col items-center">
                <div className="eyebrow mb-7">Newsletter</div>
                <h2 className="display m-0 max-w-[22ch] text-balance text-[clamp(32px,4.5vw,58px)] text-ink">
                  Be the first to hear about IOSP 2027.
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
                  IOSP news, resources, and community events. No noise.
                </p>
                <a
                  className="btn-pill group mt-10 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em]"
                  href="https://www.scios.tech/?newsletter=1"
                  target="_blank"
                  rel="noopener"
                >
                  Subscribe to the newsletter →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
