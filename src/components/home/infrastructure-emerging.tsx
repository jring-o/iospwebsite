import { Reveal } from "@/components/reveal";

const CELLS: Array<{ title: string; body: string; mark?: boolean }> = [
  {
    title: "Storage & Preservation",
    body: "Persistent, FAIR-compliant storage with content addressing (CIDs) · distributed archives · automated metadata · long-term preservation protocols.",
    mark: true,
  },
  {
    title: "Compute & Execution",
    body: "Reproducible computational environments · container specs · execution manifests · distributed compute coordination · data visitation.",
    mark: true,
  },
  {
    title: "Validation & Trust",
    body: "Automated testing · continuous replication · cryptographic proofs of correctness · provenance tracking · trust scoring · attestation models · open algorithms.",
    mark: true,
  },
  {
    title: "Knowledge Graphs & Semantics",
    body: "Semantic registries · knowledge graphs · composable research objects · cross-platform data schemas.",
  },
  {
    title: "Discovery & Communication",
    body: "Federated search · semantic discovery · publishing APIs · event streams · collaborative review platforms · micropublishing.",
    mark: true,
  },
  {
    title: "Attribution & Credit",
    body: "Contribution graphs · portable reputation · micro-attribution · transparent governance records.",
  },
  {
    title: "Identity & Authentication",
    body: "Decentralized identifiers (DIDs) · key management · authentication protocols · agent registries.",
    mark: true,
  },
  {
    title: "Funding Innovation",
    body: "Alternative funding models · retroactive public goods · quadratic funding · granular funding.",
  },
  {
    title: "Collaboration Infrastructure",
    body: "Real-time coordination · federated workflows · cross-institutional projects · team science tools · shared workspaces.",
    mark: true,
  },
];

// Asymmetrical bento spans on a 12-column grid; every row sums to 12.
const SPANS = [
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
];

export function InfrastructureEmerging() {
  return (
    <section
      className="sect"
      id="substrate"
      data-screen-label="Emerging infrastructure"
    >
      <div className="wrap">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <div className="eyebrow mb-6">The Substrate</div>
            <h2 className="display m-0 text-[clamp(34px,5vw,64px)] text-ink">
              Independent teams.
              <br />
              One substrate.
            </h2>
            <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-ink-soft">
              Across the ecosystem, independent teams are building components
              of a shared technical substrate for science. Science needs them to work together.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {CELLS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 3) * 80}
              className={`flex ${SPANS[i]}`}
            >
              <div className="cell cell-hover flex w-full flex-col p-7">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h4 className="m-0 font-display text-[18px] font-semibold leading-snug tracking-tight text-ink">
                    {c.title}
                  </h4>
                  {c.mark ? (
                    <span className="mt-0.5 shrink-0 bg-royal-soft px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-royal ring-1 ring-inset ring-royal/20">
                      IOSP 2025
                    </span>
                  ) : null}
                </div>
                <p className="m-0 text-[13px] leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
