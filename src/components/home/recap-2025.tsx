const SPEAKERS: Array<{ name: string; aff: string }> = [
  { name: "Kathryn Knight", aff: "ORNL" },
  { name: "Beth Duckles", aff: "Organizational Mycology" },
  { name: "Sandra Gesing", aff: "US RSE + SGX3" },
  { name: "Juliane Schneider", aff: "PNNL" },
  { name: "Jonathan Starr", aff: "NumFOCUS & SciOS" },
  { name: "Gideon Nave", aff: "University of Pennsylvania" },
  { name: "Erik Schultes", aff: "GO FAIR Foundation" },
  { name: "Isabel Abedrapo", aff: "Remolino" },
  { name: "Daniela Saderi", aff: "PREreview" },
  { name: "Ellie DeSota", aff: "SciOS" },
  { name: "Doug Schuster", aff: "NSF NCAR" },
  { name: "Cornelius Ihle", aff: "Gipp Lab" },
  { name: "Laure Haak", aff: "Mighty Red Barn" },
  { name: "Philipp Koellinger", aff: "Vrije Universiteit Amsterdam" },
  { name: "Franck Marchis", aff: "SETI Institute" },
  { name: "Filipp Kramer", aff: "Alchemy Bio, Astera Fellow" },
  { name: "Dion Whitehead", aff: "Metapage, Astera Fellow" },
  { name: "Edvard Hübinette", aff: "DeSci Labs" },
  { name: "Martin Karlsson", aff: "Coordination Network" },
  { name: "Saif Haobsh", aff: "Fylo, Astera Fellow" },
  { name: "Ronen Tamari", aff: "Cosmik, Astera Fellow" },
  { name: "Matthew Akamatsu", aff: "UW, Discourse Graphs" },
  { name: "Paul Weidner", aff: "Technologist" },
  { name: "Edilson Damasio", aff: "Univ. Estadual de Maringá" },
];

const COMMITTEE: Array<{ name: string; aff: string }> = [
  { name: "Jonathan Starr", aff: "NumFOCUS & SciOS" },
  { name: "Ellie DeSota", aff: "SciOS" },
  { name: "Franck Marchis", aff: "SETI Institute" },
  { name: "Erik Schultes", aff: "GO FAIR Foundation" },
  { name: "Chris Erdmann", aff: "SciLifeLabs" },
  { name: "Shady El Damaty", aff: "OpSci & Holonym" },
];

export function Recap2025() {
  return (
    <section className="s" id="iosp2025" data-screen-label="07 IOSP 2025 Recap">
      <div className="wrap">
        <div className="s-head">
          <div className="meta">
            <div className="kicker">Last year</div>
          </div>
          <div>
            <h2>IOSP 2025 — Denver, February 23–25</h2>
            <p className="dek">
              The inaugural gathering, at the Denver Museum of Nature and
              Science. Three days. Four hundred and twenty-five registrations
              for an eighty-person room. Numbers below; recap underneath.
            </p>
          </div>
        </div>

        <div className="stat-band">
          <div className="cell">
            <div className="num">425</div>
            <div className="lbl">Open registrations</div>
          </div>
          <div className="cell">
            <div className="num">80</div>
            <div className="lbl">Curated invitations</div>
          </div>
          <div className="cell">
            <div className="num">
              5<span className="pct"></span>
            </div>
            <div className="lbl">Countries represented</div>
          </div>
          <div className="cell">
            <div className="num">24</div>
            <div className="lbl">Speakers &amp; workshop leaders</div>
          </div>
          <div className="cell">
            <div className="num">
              95<span className="pct">%</span>
            </div>
            <div className="lbl">Would attend again</div>
          </div>
          <div className="cell">
            <div className="num">
              93<span className="pct">%</span>
            </div>
            <div className="lbl">Would recommend</div>
          </div>
          <div className="cell">
            <div className="num">
              87<span className="pct">%</span>
            </div>
            <div className="lbl">
              Cited facilitated networking as highly valued
            </div>
          </div>
          <div className="cell">
            <div className="num">
              80<span className="pct">%</span>
            </div>
            <div className="lbl">Continuing collaborations from IOSP</div>
          </div>
        </div>

        <div className="recap-grid">
          <div>
            <h5>Format</h5>
            <ul className="format">
              <li>
                <span className="day">Day 1</span>
                <span>Knowledge dissemination — talks, panels, framing</span>
              </li>
              <li>
                <span className="day">Day 2</span>
                <span>Workshops — hands-on production across themes</span>
              </li>
              <li>
                <span className="day">Day 3</span>
                <span>
                  Coworking space in RiNo — work continued in small groups
                </span>
              </li>
            </ul>
            <p style={{ marginTop: 18 }}>
              Beyond the survey, the gathering kicked off post-event
              collaborations — work begun in workshops continued through the
              year as a basis for projects like MIRA, CAIROS, and PRSM.
            </p>
          </div>
          <div>
            <h5>Infrastructure stack used in production</h5>
            <ul className="stack">
              <li>
                <strong>DeSci Publish</strong>
                <span className="role">Submission &amp; peer-review</span>
              </li>
              <li>
                <strong>Silk</strong>
                <span className="role">Identity &amp; credentials</span>
              </li>
              <li>
                <strong>IPFS</strong>
                <span className="role">Content-addressed storage</span>
              </li>
              <li>
                <strong>Ceramic</strong>
                <span className="role">Data interoperability</span>
              </li>
              <li>
                <strong>CODEX</strong>
                <span className="role">Persistent identifiers (dPIDs)</span>
              </li>
              <li>
                <strong>Coordination Network</strong>
                <span className="role">AI synthesis</span>
              </li>
            </ul>
            <p style={{ marginTop: 18 }}>
              The gathering itself ran on the same infrastructure participants
              were stress-testing — submissions, reviews, identity, archival,
              all in production.
            </p>
          </div>
        </div>

        <div className="spk-block">
          <h5>Speakers &amp; workshop leaders</h5>
          <div className="spk-grid">
            {SPEAKERS.map((s) => (
              <div className="row" key={s.name}>
                <span className="nm">{s.name}</span>
                <span className="af">{s.aff}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pc-block">
          <h5>Planning committee</h5>
          <div className="spk-grid">
            {COMMITTEE.map((s) => (
              <div className="row" key={s.name}>
                <span className="nm">{s.name}</span>
                <span className="af">{s.aff}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
