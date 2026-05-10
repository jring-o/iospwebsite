const ROWS: Array<{
  name: string;
  verbs: string;
  organized: string;
  professional: string;
  institutional: string;
  digitized: string;
  digitalNative: string;
}> = [
  {
    name: "Inference",
    verbs: "Generate · analyze · experiment",
    organized: "Hand calculations · lab notebooks",
    professional: "Institutionalized labs · standardized methods",
    institutional:
      "Federal grant-funded hypothesis-driven research · university labs",
    digitized:
      "Personal digital notebooks · unreproducible local computations · proprietary analysis software",
    digitalNative:
      "Executable narratives · reproducible containers · live computational environments",
  },
  {
    name: "Quality",
    verbs: "Verify · replicate · trust",
    organized: "Witnessed demos · society meetings",
    professional: "University seminars · laboratory replication",
    institutional:
      "Anonymous pre-publication peer review · journal prestige hierarchy",
    digitized: "Citation databases · Impact Factor · paywalled review pipelines",
    digitalNative: "Computational verification · trust attestation",
  },
  {
    name: "Engagement",
    verbs: "Connect · share · discover",
    organized: "Letters & libraries · society proceedings",
    professional: "Academic journals · university presses",
    institutional:
      "Academic journals · disciplinary conferences · journal consolidation",
    digitized: "PDFs · digital subscriptions · publisher platforms",
    digitalNative:
      "Object graphs · curation over open research · open by default",
  },
  {
    name: "Coordination",
    verbs: "Credit · fund · collaborate",
    organized: "Private patronage · named discoveries",
    professional: "University positions · institutional funding",
    institutional:
      "Grant cycles · tenure system · citation-based credit",
    digitized: "h-index · altmetrics · ORCID as paper trail",
    digitalNative:
      "Contribution graphs · micro-attribution · community-specific metrics",
  },
  {
    name: "Preservation",
    verbs: "Store · access · archive",
    organized: "Physical archives · manual copying",
    professional: "Library systems · catalog standards",
    institutional: "University libraries · journal archives · microfilm",
    digitized: "DOI system · siloed repositories · lossy digital archives",
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
            <div className="kicker">Theory</div>
          </div>
          <div>
            <h2>It's time to build the digital-native substrate.</h2>
            <p className="dek">
              Each era reconfigures the five protocols. Scientific societies
              and the first journals shaped the Organized era. Research
              universities, professionalization, and formalized peer review
              shaped the Professional one. Federal funding, peer review,
              tenure, grant cycles, and citation-based credit built the
              Institutional era. What we live in now is that configuration
              stretched onto digital tools: PDFs as journals, h-indexes as
              memory, citation databases as card catalogs. The next era is
              the first one we get to design on the digital substrate,
              instead of retrofitting onto it.
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
            {ROWS.map((r) => (
              <tr key={r.name}>
                <td className="proto">
                  <span className="name">{r.name}</span>
                  <span className="verbs">{r.verbs}</span>
                </td>
                <td>{r.organized}</td>
                <td>{r.professional}</td>
                <td>{r.institutional}</td>
                <td>{r.digitized}</td>
                <td className="now">{r.digitalNative}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="theory-block">
          <a className="theory-link" href="/theory">
            <span className="marker">→</span>
            Experience our theory of change
          </a>
          <p className="theory-link-note">
            An interactive expression in lieu of a paper. In development.
          </p>
        </div>
      </div>
    </section>
  );
}
