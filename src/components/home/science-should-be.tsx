const PRINCIPLES: Array<{ num: string; title: string }> = [
  { num: "01", title: "Community-owned" },
  { num: "02", title: "Collaborative" },
  { num: "03", title: "Auditable" },
];

export function ScienceShouldBe() {
  return (
    <section
      className="ssb ssb-rule"
      id="values"
      data-screen-label="Science Should Be"
    >
      <div className="wrap-narrow">
        <h2 className="ssb-h">Science should be</h2>
        <div className="ssb-rule-line">
          {PRINCIPLES.map((p, i) => (
            <span key={p.num} className="ssb-rule-item">
              {i > 0 && <span className="rule" aria-hidden="true" />}
              <span className="value">{p.title}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
