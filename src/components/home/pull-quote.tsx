import { Reveal } from "@/components/reveal";

export function PullQuote() {
  return (
    <section
      className="sect relative overflow-hidden"
      id="quote"
      data-screen-label="We can raise cities"
    >
      <div
        className="halo left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-royal-deep/15"
        aria-hidden="true"
      />
      <div className="wrap-narrow relative">
        <Reveal>
          <blockquote className="m-0 max-w-[24ch] font-serif text-[clamp(38px,5.6vw,76px)] italic leading-[1.06] tracking-tight text-ink">
            A thousand coordinated people, collaborating on small, achievable
            outputs, can raise cities.
          </blockquote>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-14 max-w-[56ch] border-t border-rule pt-6 text-[14px] leading-relaxed text-ink-soft">
            <div>
              Between 1855 and 1872, Chicago raised the entire grade of its
              downtown — buildings and streets — by up to fourteen feet.
              Hundreds of jackscrews, each operated by a few people, lifted
              whole hotels and city blocks while business carried on inside.{" "}
              <a
                href="https://en.wikipedia.org/wiki/Raising_of_Chicago"
                target="_blank"
                rel="noopener"
                className="whitespace-nowrap text-royal no-underline transition-colors duration-500 ease-spring hover:text-ink"
              >
                The Raising of Chicago →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
