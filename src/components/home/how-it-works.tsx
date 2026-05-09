export function HowItWorks() {
  return (
    <section
      className="s heavy"
      id="how"
      data-screen-label="03 How IOSP Works"
    >
      <div className="wrap">
        <div className="s-head">
          <div className="meta">
            <div className="kicker">Operating model</div>
          </div>
          <div>
            <h2>Identify · Converge · Support</h2>
            <p className="dek">
              IOSP is a continuous, year-long operation. The annual gathering
              is the checkpoint where we identify challenges and test
              solutions built by the open community throughout the year.
            </p>
          </div>
        </div>

        <div className="how-cols">
          <div className="how-col">
            <div className="cad">Ongoing</div>
            <h4>Identify</h4>
            <p>
              Through direct connections, workshops, and continuous
              engagement with the open science community, we identify
              critical gaps in infrastructure and the people and tools
              working to fill them.
            </p>
          </div>
          <div className="how-col">
            <div className="cad">Annual gathering</div>
            <h4>Converge</h4>
            <p>
              Once a year we bring together the identified players —
              researchers, technologists, and infrastructure builders — to
              showcase progress, define priorities, and align efforts around
              shared challenges.
            </p>
          </div>
          <div className="how-col">
            <div className="cad">Year-round</div>
            <h4>Support</h4>
            <p>
              Year-round, we provide resources, facilitate connections, and
              help collaborative progress move forward — turning event
              momentum into lasting infrastructure.
            </p>
          </div>
        </div>

        <div className="how-repeat">
          <div>
            <h4>Repeat</h4>
            <div className="small-rule" />
          </div>
          <div>
            <p>
              Every gathering identifies bottlenecks and next steps. Every
              collaboration produces working code. Every year turns the key a
              little further.
            </p>
          </div>
          <div className="how-loop">
            <svg viewBox="0 0 150 150" aria-hidden="true">
              <g transform="rotate(30 75 75)">
                <path
                  d="M 120 100 A 55 55 0 1 1 120 50"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M 116 68 L 122 80 L 130 68 Z"
                  fill="var(--royal)"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
