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

export function InfrastructureEmerging() {
  return (
    <section
      className="s"
      id="substrate"
      data-screen-label="06 Infrastructure Emerging"
    >
      <div className="wrap">
        <div className="s-head">
          <div className="meta">
            <div className="kicker">The Substrate</div>
          </div>
          <div>
            <h2>Independent teams.<br />One substrate.</h2>
            <p className="dek">
              Across the ecosystem, independent teams are building components
              of a shared technical substrate for science. Science needs them to work together.
            </p>
          </div>
        </div>

        <div className="sub-grid">
          {CELLS.map((c) => (
            <div className="sub-cell" key={c.title}>
              {c.mark ? <div className="badge">IOSP 2025</div> : null}
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
