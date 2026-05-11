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

      <div className="mast-grid">
        <div className="col">
          <h6>For</h6>
          <p>
            The people building the infrastructure open science
            depends on, and the researchers, librarians, funders, and
            publishers who depend on it.
          </p>
        </div>
        <div className="col">
          <h6>What we do</h6>
          <p>
            Connect researchers and technologists working on critical open
            science infrastructure. Coordinate collaborations, serve as first
            users, and share what we learn — advancing the technologies that
            make open-by-default scientific practice easy.
          </p>
        </div>
        <div className="col">
          <h6>Working principle</h6>
          <p className="mast-tagline">
            “Build the infrastructure that makes open easy to practice.”
          </p>
          <p style={{ marginTop: 18 }}>
            <a className="mast-cta" href="#iosp2026">
              IOSP 2026 <span className="arr">→</span>
            </a>
            <a className="mast-cta" href="#iosp2025">
              2025 recap <span className="arr">→</span>
            </a>
          </p>
        </div>
      </div>
      </div>
    </header>
  );
}
