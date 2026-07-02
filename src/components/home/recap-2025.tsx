import { Reveal } from "@/components/reveal";

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

// Bento placement: hero stat, six singles, one wide closer — rows sum to 12.
const STATS: Array<{
  num: React.ReactNode;
  lbl: string;
  className: string;
  hero?: boolean;
}> = [
  {
    num: 425,
    lbl: "Open registrations",
    className: "md:col-span-2",
    hero: true,
  },
  { num: 80, lbl: "Curated invitations", className: "" },
  { num: 5, lbl: "Countries represented", className: "" },
  { num: 24, lbl: "Speakers & workshop leaders", className: "" },
  {
    num: (
      <>
        95<span className="text-royal">%</span>
      </>
    ),
    lbl: "Would attend again",
    className: "",
  },
  {
    num: (
      <>
        93<span className="text-royal">%</span>
      </>
    ),
    lbl: "Would recommend",
    className: "",
  },
  {
    num: (
      <>
        87<span className="text-royal">%</span>
      </>
    ),
    lbl: "Cited facilitated networking as highly valued",
    className: "",
  },
  {
    num: (
      <>
        80<span className="text-royal">%</span>
      </>
    ),
    lbl: "Continuing collaborations from IOSP",
    className: "md:col-span-4",
  },
];

function PeopleGrid({ people }: { people: Array<{ name: string; aff: string }> }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((s) => (
        <div
          className="flex flex-col border-t border-rule py-3"
          key={s.name}
        >
          <span className="text-[14.5px] font-medium text-ink">{s.name}</span>
          <span className="mt-0.5 font-mono text-[10px] tracking-[0.06em] text-ink-mute">
            {s.aff}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Recap2025() {
  return (
    <section className="sect" id="iosp2025" data-screen-label="07 IOSP 2025 Recap">
      <div className="wrap">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <div className="eyebrow mb-6">Last year</div>
            <h2 className="display m-0 text-[clamp(34px,5vw,64px)] text-ink">
              IOSP 2025 — Denver, February 23–25
            </h2>
            <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-ink-soft">
              The inaugural gathering, at the Denver Museum of Nature and
              Science. Three days. Four hundred and twenty-five registrations
              for an eighty-person room. Numbers below; recap underneath.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.lbl} delay={(i % 4) * 70} className={`flex ${s.className}`}>
              <div
                className={`cell cell-hover flex w-full flex-col justify-between gap-6 p-6 ${s.hero ? "relative overflow-hidden md:p-8" : ""}`}
              >
                {s.hero && (
                  <div
                    className="halo -right-16 -top-16 h-[220px] w-[280px] bg-royal-deep/25"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`display relative leading-none text-ink ${s.hero ? "text-[clamp(64px,7vw,110px)]" : "text-[clamp(32px,3.4vw,44px)]"}`}
                >
                  {s.num}
                </div>
                <div className="relative font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ink-mute">
                  {s.lbl}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal className="flex">
            <div className="cell w-full p-8">
              <h5 className="m-0 mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-royal">
                Format
              </h5>
              <ul className="m-0 list-none p-0">
                {[
                  ["Day 1", "Knowledge dissemination — talks, panels, framing"],
                  ["Day 2", "Workshops — hands-on production across themes"],
                  ["Day 3", "Coworking space in RiNo — work continued in small groups"],
                ].map(([day, desc]) => (
                  <li
                    key={day}
                    className="grid grid-cols-[72px_1fr] gap-4 border-t border-rule py-3 text-[14px] text-ink-soft"
                  >
                    <span className="pt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-royal">
                      {day}
                    </span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-5 text-[14.5px] leading-relaxed text-ink-soft">
                Beyond the survey, the gathering kicked off post-event
                collaborations — work begun in workshops continued through the
                year as a basis for projects like MIRA, CAIROS, and PRSM.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90} className="flex">
            <div className="cell w-full p-8">
              <h5 className="m-0 mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-royal">
                Infrastructure stack used in production
              </h5>
              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 p-0 sm:grid-cols-2">
                {[
                  ["DeSci Publish", "Submission & peer-review"],
                  ["Silk", "Identity & credentials"],
                  ["IPFS", "Content-addressed storage"],
                  ["Ceramic", "Data interoperability"],
                  ["CODEX", "Persistent identifiers (dPIDs)"],
                  ["Coordination Network", "AI synthesis"],
                ].map(([name, role]) => (
                  <li key={name} className="border-t border-rule py-2.5 text-[14px]">
                    <strong className="font-display font-semibold tracking-tight text-ink">
                      {name}
                    </strong>
                    <span className="mt-0.5 block text-[12px] text-ink-mute">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-5 text-[14.5px] leading-relaxed text-ink-soft">
                The gathering itself ran on the same infrastructure participants
                were stress-testing — submissions, reviews, identity, archival,
                all in production.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <h5 className="m-0 mb-6 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-royal">
            Speakers &amp; workshop leaders
          </h5>
          <PeopleGrid people={SPEAKERS} />
        </Reveal>

        <Reveal className="mt-14">
          <h5 className="m-0 mb-6 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-royal">
            Planning committee
          </h5>
          <PeopleGrid people={COMMITTEE} />
        </Reveal>
      </div>
    </section>
  );
}
