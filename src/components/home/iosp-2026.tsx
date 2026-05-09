"use client";

import { useState } from "react";
import { IospSignupModal, type SignupKind } from "@/components/iosp-2026-signup-modal";
import { ThemeModal, THEMES, type ThemeKey } from "@/components/theme-modal";
import { TheoryModal } from "@/components/theory-modal";

const TAKEAWAYS = [
  {
    title: "People you couldn't meet elsewhere",
    body: "Researchers and tool-builders shoulder-to-shoulder for four days. The people building open-science infrastructure side-by-side with those who depend on it.",
    name: "Ronen Tamari",
    role: "Renaissance Philanthropy BiTS Fellow",
    quote:
      "Great discussions and valuable connections that would be really hard to have in traditional academic conferences.",
  },
  {
    title: "Working knowledge of new tools and infrastructure",
    body: "Discover novel infrastructure being built across the open-science ecosystem — leave with the high-level concepts, the technical details, and a path to put them to work.",
    name: "Doug Schuster",
    role: "NSF NCAR",
    quote:
      "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of.",
  },
  {
    title: "A clearer picture of what researchers actually need built",
    body: "Four days alongside the researchers who depend on what's being built — leave with sharper requirements, validated approaches, and a list of dead-ends to stop pursuing.",
    name: "Martin Karlsson",
    role: "Coordination Network",
    quote:
      "Expert opinion on challenges research libraries face when sharing data, and useful guidelines for rolling out new research technologies.",
  },
  {
    title: "Work that lives beyond the event",
    body: (
      <>
        Methods and prototypes stress-tested in Leiden become the seed of
        post-event collaboration.{" "}
        <a href="https://mira.science" target="_blank" rel="noopener">
          MIRA
        </a>
        ,{" "}
        <a
          href="https://cairos.network/"
          target="_blank"
          rel="noopener"
        >
          CAIROS
        </a>
        , and{" "}
        <a href="https://prsm.network" target="_blank" rel="noopener">
          PRSM
        </a>{" "}
        all grew out of work begun at IOSP.
      </>
    ),
    name: "Matthew Akamatsu",
    role: "University of Washington",
    quote:
      "This put us in a better position to build the next system for science and publishing.",
  },
];

// Short card-body summaries for the four theme grid cells. Click opens a
// <ThemeModal> with the longer copy from THEMES (in @/components/theme-modal).
const THEME_CARDS: Array<{ key: ThemeKey; title: string; body: string }> = [
  {
    key: "01",
    title: "Modular Research Components",
    body: "The tools and frameworks for composable research. Every method, dataset, model, claim, and review becomes a first-class object with its own identifier, schema, and version history.",
  },
  {
    key: "02",
    title: "Funding Open Science & Open Source",
    body: "How money should actually move through an open ecosystem so the substrate gets built — and stays built. Core-and-satellite, transitive funding, modular funding.",
  },
  {
    key: "03",
    title: "Resilient Data & Sovereign Infrastructure",
    body: "Persistent identifiers, distributed preservation, and systems that don't depend on a single host. Local-first, self-hosted, decentralized — turning “someone else's server” into infrastructure the people who depend on it actually own.",
  },
  {
    key: "04",
    title: "Assessment, Evaluation & Insights",
    body: "How we measure, verify, and understand the impact of research and its infrastructure. Trust signals, attestations, and verification that travel with the artifact instead of the paper around it.",
  },
];

// Reference THEMES so the import isn't unused even when its content is only
// consumed by ThemeModal.
void THEMES;

export function Iosp2026() {
  const [signup, setSignup] = useState<SignupKind>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeKey | null>(null);
  const [theoryOpen, setTheoryOpen] = useState(false);

  return (
    <section
      className="iosp26"
      id="iosp2026"
      data-screen-label="02 IOSP 2026 Leiden"
    >
      <div className="wrap i26">
        <div className="strip mono">
          <span>
            <span className="dot" /> IOSP — Edition 02
          </span>
          <span>Oct 12–15, 2026</span>
        </div>

        <div className="hero">
          <div>
            <div className="kick">Institute of Open Science Practices</div>
            <h2>Leiden</h2>
            <div className="dates">
              <div className="num">
                12 <span className="arr">→</span> 15
              </div>
              <div className="label">October 2026</div>
            </div>
          </div>
          <div className="venue">
            <h6>Venue</h6>
            <p>
              <strong>
                Poortgebouw, University of Leiden, and GO FAIR
              </strong>{" "}
              host us on Oct 12, 13, and 15. On Oct 14 we field-trip to the{" "}
              <a
                href="https://opensciencefestival.nl/"
                target="_blank"
                rel="noopener"
              >
                National Open Science Festival
              </a>{" "}
              in Delft, then reconvene for the final day.
            </p>
          </div>
        </div>

        {/* production-driven */}
        <div className="pd">
          <div className="kick mono">Production-driven</div>
          <div className="pd-grid">
            <div className="pd-stats">
              <div className="row-1">
                <div className="pct">
                  10<span className="accent">%</span>
                </div>
                <div className="lbl">Talks + panels</div>
              </div>
              <div className="row-2">
                <div className="pct">
                  15<span className="accent">%</span>
                </div>
                <div className="lbl">Tooling showcase</div>
              </div>
              <div className="row-3">
                <div className="pct">
                  75<span className="accent">%</span>
                </div>
                <div className="lbl">Co-design + build</div>
              </div>
            </div>
            <div className="pd-body">
              <p className="pull">
                Less talking. More collaboration. More building.
              </p>
              <p>
                IOSP is built on a single working principle: the people who
                depend on open-science infrastructure and the people building
                it should be in the same room, on the same problems, long
                enough to do real work together. The event runs in three
                frames: <strong>context, landscape, and co-working</strong>.
              </p>
              <p>
                Tool-builders bring methods and prototypes; researchers bring
                the domain knowledge and problems that put those tools to real
                use.
              </p>
            </div>
          </div>
        </div>

        {/* takeaways */}
        <div className="takeaways">
          <div className="kick mono">Takeaways</div>
          <div className="ta-grid">
            {TAKEAWAYS.map((t) => (
              <div className="ta-card" key={t.title}>
                <h4>{t.title}</h4>
                <div className="body">{t.body}</div>
                <div className="src">
                  <div className="from mono">IOSP 2025</div>
                  <div className="by">
                    <span className="bar" />
                    <div>
                      <div className="nm">{t.name}</div>
                      <div className="role">{t.role}</div>
                    </div>
                  </div>
                  <div className="q">“{t.quote}”</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* themes */}
        <div className="themes">
          <div className="themes-head">
            <div>
              <div
                className="mono"
                style={{ color: "var(--i-ink-soft)", marginBottom: 10 }}
              >
                Structure
              </div>
              <h3>Four themes</h3>
            </div>
            <div className="right">Parallel tracks</div>
          </div>
          <div className="th-grid">
            {THEME_CARDS.map((t) => (
              <button
                type="button"
                className="th-card"
                key={t.key}
                onClick={() => setActiveTheme(t.key)}
                aria-label={`Open theme: ${t.title}`}
              >
                <div>
                  <h4>
                    <span>{t.title}</span>
                    <span className="arr">→</span>
                  </h4>
                  <p>{t.body}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="theory-card"
            onClick={() => setTheoryOpen(true)}
            aria-label="Open: Theory of change"
          >
            <div>
              <div className="kick">Foundational</div>
              <h5>Theory →</h5>
            </div>
            <p>
              The conceptual thread running beneath all four themes — the
              questions, frameworks, and critiques that ground production work
              in deeper understanding of open science as a system.
            </p>
          </button>
        </div>

        {/* workshops */}
        <div className="ws">
          <div className="themes-head">
            <div>
              <div
                className="mono"
                style={{ color: "var(--i-ink-soft)", marginBottom: 10 }}
              >
                Programme
              </div>
              <h3>Workshops</h3>
            </div>
            <div className="right">Hands-on</div>
          </div>

          <div className="ws-card">
            <div className="num">03</div>
            <div>
              <div className="kick">
                Resilient Data &amp; Sovereign Infrastructure
              </div>
              <h4>Save your discipline's at-risk data</h4>
              <div className="by">Cornelius Ihle · University of Göttingen</div>
              <p>
                Bring the data your field is closest to losing — orphaned
                datasets, vanishing journals, repositories on borrowed time.
                We'll crawl the source, content-address the payloads, and
                replicate them on IPFS through D-LOCKSS. You leave with that
                data verifiably preserved on a decentralized network, beyond
                any single host's lifespan.
              </p>
            </div>
          </div>

          <div className="ws-card cont">
            <div className="num">∞</div>
            <div>
              <div className="kick">Continuous · All themes</div>
              <h4>PICoding</h4>
              <div className="by">Jonathan Starr · SciOS</div>
              <p>
                A live build line for the gaps the event surfaces. When the
                four themes turn up open-science tooling that's missing,
                broken, or stuck on a wishlist, we'll spec it with the group
                and build a working prototype on the spot — using a
                multi-agent software-development harness. Drop in across the
                four days; leave with real code addressing real gaps.
              </p>
            </div>
          </div>

          <div className="ws-status">
            Programme in active planning · Check back for updates
          </div>
        </div>

        {/* CTAs */}
        <div className="cta">
          <div className="themes-head">
            <div>
              <div
                className="mono"
                style={{ color: "var(--i-ink-soft)", marginBottom: 10 }}
              >
                Action
              </div>
              <h3>Get involved</h3>
            </div>
            <div className="right">Open calls</div>
          </div>

          <div className="cta-grid">
            <button
              type="button"
              className="cta-card"
              onClick={() => setSignup("showcase")}
            >
              <div className="tag">[ Showcase ]</div>
              <h4>Building a tool?</h4>
              <p>
                Working on tooling or infrastructure for one of the four
                themes? Submit it to the production showcase so we can
                stress-test and build on it in Leiden.
              </p>
              <div className="action">
                <span>Submit to the showcase</span>
                <span className="arr">→</span>
              </div>
            </button>
            <button
              type="button"
              className="cta-card"
              onClick={() => setSignup("committee")}
            >
              <div className="tag">[ Committee ]</div>
              <h4>Help organize</h4>
              <p>
                We're opening the organizing committee — programming,
                logistics, outreach. Get in touch to join the planning
                conversations.
              </p>
              <div className="action">
                <span>Get in touch</span>
                <span className="arr">→</span>
              </div>
            </button>
            <button
              type="button"
              className="cta-card"
              onClick={() => setSignup("sponsor")}
            >
              <div className="tag">[ Sponsor ]</div>
              <h4>Become a sponsor</h4>
              <p>
                IOSP is free to join. Every sponsor dollar funds a travel
                grant — last year in Denver, sponsors brought 10 people from 5
                countries.
              </p>
              <div className="action">
                <span>Send a participant to Leiden</span>
                <span className="arr">→</span>
              </div>
            </button>
          </div>

          {/* register interest */}
          <div className="reg">
            <div className="kick">Participate</div>
            <h3>Register your interest</h3>
            <p>
              IOSP is a curated, highly facilitated event — we aim to convene
              a balanced mix of researchers, technologists, librarians,
              funders, and others across the global research ecosystem. Last
              year we received 425 registrations for an 80-person room; this
              year we have space for 100. Registering does <strong>not</strong>{" "}
              guarantee a seat.
            </p>
            <p>
              <strong>IOSP is free to join</strong>, and every sponsorship
              dollar goes <strong>directly to travel grants</strong> so
              finances and location aren't a barrier for participants.
              Actively pushing open science forward? Register and we'll do our
              best to find a way to get you in the room.
            </p>
            <button
              type="button"
              className="btn"
              onClick={() => setSignup("participant")}
            >
              Register interest →
            </button>
          </div>
        </div>
      </div>

      <IospSignupModal kind={signup} onClose={() => setSignup(null)} />
      <ThemeModal themeKey={activeTheme} onClose={() => setActiveTheme(null)} />
      <TheoryModal open={theoryOpen} onClose={() => setTheoryOpen(false)} />
    </section>
  );
}
