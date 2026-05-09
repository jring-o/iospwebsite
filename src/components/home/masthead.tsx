import { ThemeToggle } from "@/components/theme-toggle";
import { Mark } from "@/components/mark";

export function Masthead() {
  return (
    <header className="masthead wrap" data-screen-label="01 Masthead">
      <div className="mast-strip mono">
        <span className="mast-strip-lockup">
          <svg
            width="16"
            height="16"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="mast-strip-mark"
          >
            <g transform="rotate(30 16 16)">
              <path
                d="M 25 21 A 11 11 0 1 1 25 11"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ color: "var(--ink)" }}
              />
              <path
                d="M 24.75 14.5 L 26 17 L 27.75 14.5 Z"
                fill="var(--royal)"
              />
            </g>
          </svg>
          Institute of Open Science Practices
        </span>
        <span>Since 2024</span>
        <span>
          <a href="#how">How it works ↓</a>
        </span>
        <ThemeToggle />
      </div>

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
          <em>coordinating institute</em> for the people building the
          infrastructure open science depends on.
        </p>
      </div>

      <div className="mast-grid">
        <div className="col">
          <h6>For</h6>
          <p>
            The people <strong>building the infrastructure</strong> open science
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
    </header>
  );
}
