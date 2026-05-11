import { Mark } from "@/components/mark";

export function Masthead() {
  return (
    <header className="masthead" data-screen-label="01 Masthead">
      <div className="wrap">
        <div className="mast-title">
        <h1>Institute of Open Science Practices</h1>
        <Mark
          size={160}
          className="mast-mark"
          arcColor="var(--ink)"
          arrowColor="var(--royal)"
          title="IOSP"
        />
        <p className="lede">
          An <em>event</em>, a <em>community</em>, and a{" "}
          <em>coordinating institute</em> for the people building, using, and advancing the
          infrastructure open science depends on.
        </p>
      </div>

      <p className="mast-tagline">
        “Build the infrastructure that makes open easy to practice.”
      </p>

      <div className="mast-actions">
        <a className="mast-cta-primary" href="#iosp2026">
          <span className="t">IOSP 2026</span>
          <span className="d">Oct 12–15, 2026 · Leiden</span>
        </a>
        <ul className="mast-sub-ctas">
          <li>
            <a className="mast-cta-secondary" href="#cta-showcase">
              Submit to the tooling showcase <span className="arr">→</span>
            </a>
          </li>
          <li>
            <a className="mast-cta-secondary" href="#cta-sponsor">
              Sponsor a travel grant <span className="arr">→</span>
            </a>
          </li>
          <li>
            <a className="mast-cta-secondary" href="#cta-register">
              Attend <span className="arr">→</span>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </header>
  );
}
