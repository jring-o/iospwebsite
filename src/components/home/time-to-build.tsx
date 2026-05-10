const ROWS: Array<{
  name: string;
  verbs: string;
  organized: string[];
  professional: string[];
  institutional: string[];
  digitized: string[];
  digitalNative: string[];
}> = [
  {
    name: "Inference",
    verbs: "Generate · analyze · experiment",
    organized: ["Society-funded experiments", "Collective witnessing"],
    professional: ["University laboratories", "Graduate student workforce"],
    institutional: ["Federal grants", "University labs"],
    digitized: [
      "Personal digital notebooks",
      "Local computations",
      "Proprietary software",
    ],
    digitalNative: [
      "Executable narratives",
      "Reproducible containers",
      "Live computational environments",
      "Atomic contributions",
    ],
  },
  {
    name: "Quality",
    verbs: "Verify · replicate · trust",
    organized: ["Witnessed demos", "Society meetings"],
    professional: ["Formalized peer review", "Specialized journals"],
    institutional: ["Anonymous peer review", "Journal prestige"],
    digitized: ["Citation databases", "Impact Factor", "Paywalled review"],
    digitalNative: [
      "Computational verification",
      "Trust attestation",
      "Portable verification",
      "Modular peer review",
      "Linter-as-review",
      "Topological validation",
    ],
  },
  {
    name: "Engagement",
    verbs: "Connect · share · discover",
    organized: ["Letters", "Scientific journals", "Society proceedings"],
    professional: [
      "Specialized journals",
      "International conferences",
      "Telegraph",
    ],
    institutional: [
      "Academic journals",
      "Conference circuits",
      "Email",
      "Journal consolidation",
    ],
    digitized: ["PDFs", "Digital subscriptions", "Publisher platforms"],
    digitalNative: [
      "Object graphs",
      "Overlay journals",
      "Open by default",
      "Generative narratives",
    ],
  },
  {
    name: "Coordination",
    verbs: "Credit · fund · collaborate",
    organized: ["Scientific societies", "Royal/noble patronage"],
    professional: [
      "University salaries",
      "Foundation funding",
      "Nobel prize hierarchy",
    ],
    institutional: ["Grant cycles", "Tenure system", "Citation-based credit"],
    digitized: ["h-index", "Altmetrics", "ORCID as paper trail"],
    digitalNative: [
      "Contribution graphs",
      "Micro-attribution",
      "Open impact algorithms",
      "Transitive / modular funding",
    ],
  },
  {
    name: "Preservation",
    verbs: "Store · access · archive",
    organized: ["Journal archives", "Multiplying libraries"],
    professional: ["University libraries", "Catalog standards", "Microfilm"],
    institutional: ["University libraries", "Journal archives"],
    digitized: ["DOI system", "Siloed repositories", "Lossy digital archives"],
    digitalNative: [
      "Content addressing",
      "Distributed hosting",
      "Redundant archives",
      "Append-only provenance",
      "Sovereign infrastructure",
    ],
  },
];

export function TimeToBuild() {
  return (
    <section className="s" id="build" data-screen-label="05 It's Time to Build">
      <div className="wrap">
        <div className="s-head">
          <div className="meta">
            <div className="kicker">Theory</div>
          </div>
          <div>
            <h2>It's time to build the digital-native substrate.</h2>
            <p className="dek">
              A system of science is a complete configuration of five
              protocols —{" "}
              <em>
                inference, quality, engagement, coordination, and preservation
              </em>{" "}
              — enabled by the technical substrate of an era. Value,
              incentive, and governance processes guide the configuration of
              each protocol within a system. Today, three systems of science
              operate side by side —{" "}
              <em>institutional, benefactor, and corporate</em> —{" "}
              each operating on the same technical substrate, and each with
              their own sets of values, incentives, and governance processes. No one
              designed any of these systems. They emerged through a series of
              events, accidents, and actions intended to fulfill immediate
              needs.
            </p>
            <p className="dek">
              The technical substrate of science has moved through five
              distinct eras over hundreds of years, each opening new
              primitives for the systems built on top. Scientific societies
              and the first journals emerged from letterpress, postal
              networks, and the telegraph to define the Organized Era of
              science. Research universities, professionalization, and
              formalized peer review took shape as the Professional Era
              embraced typewriters, telephone networks, and microfilm.
              Mainframes, photocopiers, and citation indexes led to federal
              funding, peer review, tenure, grant cycles, and the
              citation-based credit of the Institutional Era we still
              inhabit. Today we've wrapped the Institutional Era's processes
              in digital tools: PDFs as journals, h-indexes as memory,
              citation databases as card catalogs — though the primitives of
              these tools enable so much more.
            </p>
            <p className="dek">
              The technical substrate of the next era will be digital-native,
              built by the global research community and designed
              intentionally from the ground up. From this substrate, a
              pluralistic era of scientific systems that amplify each other's
              strengths, make up for one another's failures, and grow
              stronger under stress will thrive.
            </p>
            <p className="dek">The next era of science is antifragile.</p>
          </div>
        </div>

        <table className="ptable">
          <thead>
            <tr>
              <th></th>
              <th>
                <span className="yrs">1665 — 1876</span>
                <span className="era">Organized</span>
              </th>
              <th>
                <span className="yrs">1876 — 1950</span>
                <span className="era">Professional</span>
              </th>
              <th>
                <span className="yrs">1950 — 2000</span>
                <span className="era">Institutional</span>
              </th>
              <th>
                <span className="yrs">2000 — Present</span>
                <span className="era">Digitized</span>
              </th>
              <th className="now">
                <span className="yrs">Building Now</span>
                <span className="era">Digital-native</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => {
              const cells: Array<{ items: string[]; now?: boolean }> = [
                { items: r.organized },
                { items: r.professional },
                { items: r.institutional },
                { items: r.digitized },
                { items: r.digitalNative, now: true },
              ];
              return (
                <tr key={r.name}>
                  <td className="proto">
                    <span className="name">{r.name}</span>
                    <span className="verbs">{r.verbs}</span>
                  </td>
                  {cells.map((cell, i) => (
                    <td key={i} className={cell.now ? "now" : undefined}>
                      <ul className="cell-list">
                        {cell.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="theory-block">
          <a className="theory-link" href="/theory">
            <span className="marker">→</span>
            Engage with our complete theory of change
          </a>
          <p className="theory-link-note">
            An interactive expression. In development.
          </p>
        </div>
      </div>
    </section>
  );
}
