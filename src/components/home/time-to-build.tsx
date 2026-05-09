const ROWS: Array<{
  name: string;
  verbs: string;
  organized: string;
  professional: string;
  institutional: string;
  digitalNative: string;
}> = [
  {
    name: "Inference",
    verbs: "Generate · analyze · experiment",
    organized: "Hand calculations · lab notebooks",
    professional: "Institutionalized labs · standardized methods",
    institutional:
      "Unreproducible local computations · personal digital notebooks",
    digitalNative:
      "Executable narratives · reproducible containers · live computational environments",
  },
  {
    name: "Quality",
    verbs: "Verify · replicate · trust",
    organized: "Witnessed demos · society meetings",
    professional: "University seminars · laboratory replication",
    institutional:
      "Manuscript peer review · citation databases · impact factors",
    digitalNative: "Computational verification · trust attestation",
  },
  {
    name: "Engagement",
    verbs: "Connect · share · discover",
    organized: "Letters & libraries · society proceedings",
    professional: "Academic journals · university presses",
    institutional: "Journal consolidation · digital subscriptions",
    digitalNative:
      "Object graphs · curation over open research · open by default",
  },
  {
    name: "Coordination",
    verbs: "Credit · fund · collaborate",
    organized: "Private patronage · named discoveries",
    professional: "University positions · institutional funding",
    institutional: "Grant funding · tenure system · h-index & citations",
    digitalNative:
      "Contribution graphs · micro-attribution · community-specific metrics",
  },
  {
    name: "Preservation",
    verbs: "Store · access · archive",
    organized: "Physical archives · manual copying",
    professional: "Library systems · catalog standards",
    institutional: "DOI system · siloed repositories · lossy digital archives",
    digitalNative:
      "Content addressing · distributed data hosting · redundant archives",
  },
];

export function TimeToBuild() {
  return (
    <section className="s" id="build" data-screen-label="05 It's Time to Build">
      <div className="wrap">
        <div className="s-head">
          <div className="meta">
            <div className="kicker">
              Five protocols
              <br />
              Four eras
            </div>
          </div>
          <div>
            <h2>It's time to build the digital-native substrate.</h2>
            <p className="dek">
              The modern implementation of the scientific protocols was
              designed in a pre-digital era. Each protocol —{" "}
              <em>
                inference, quality, engagement, coordination, preservation
              </em>{" "}
              — has a configuration in every era. The last column is the one
              we're filling in now.
            </p>
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
                <span className="yrs">1950 — Present</span>
                <span className="era">Institutional</span>
              </th>
              <th className="now">
                <span className="yrs">Building Now</span>
                <span className="era">Digital-native</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.name}>
                <td className="proto">
                  <span className="name">{r.name}</span>
                  <span className="verbs">{r.verbs}</span>
                </td>
                <td>{r.organized}</td>
                <td>{r.professional}</td>
                <td>{r.institutional}</td>
                <td className="now">{r.digitalNative}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="theory-block">
          <a className="theory-link" href="/theory">
            <span className="marker">→</span>
            How we think about science
          </a>
        </div>
      </div>
    </section>
  );
}
