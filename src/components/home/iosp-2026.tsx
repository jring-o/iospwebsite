"use client";

import { useState } from "react";
import { IospSignupModal, type SignupKind } from "@/components/iosp-2026-signup-modal";
import { ThemeModal, THEMES, type ThemeKey } from "@/components/theme-modal";
import { TheoryModal } from "@/components/theory-modal";
import { Reveal } from "@/components/reveal";

const TAKEAWAYS = [
  {
    title: "Meet people you couldn't meet elsewhere",
    body: "Researchers and builders shoulder-to-shoulder for four days in a facilitated environment. The people building open science infrastructure side-by-side with those who depend on it.",
    name: "Ronen Tamari",
    role: "Renaissance Philanthropy BiTS Fellow",
    quote:
      "Great discussions and valuable connections that would be really hard to have in traditional academic conferences.",
  },
  {
    title: "Gain a working knowledge of new tools and infrastructure",
    body: "Discover novel infrastructure being built across the open science ecosystem. Leave with the high-level concepts, the technical details, and a path to put them to work.",
    name: "Doug Schuster",
    role: "NSF NCAR",
    quote:
      "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of.",
  },
  {
    title: "Form a clearer picture of what researchers actually need built",
    body: "Four days alongside the researchers who depend on what's being built. Leave with sharper requirements, validated user-stories, and a list of dead-ends to stop pursuing.",
    name: "Martin Karlsson",
    role: "Coordination Network",
    quote:
      "Expert opinion on challenges research libraries face when sharing data, and useful guidelines for rolling out new research technologies.",
  },
  {
    title: "Start work that lives beyond the event",
    body: (
      <>
        Projects and collaborations started, sharpened, and stress-tested
        at IOSP seed work that continues after.{" "}
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
    title: "VOWELS",
    body: "Assessment, Evaluation, Insights, Observability, & Utility — how we measure, verify, observe, and use research and its infrastructure. Trust signals, attestations, telemetry, and reuse that travel with the artifact instead of the paper around it.",
  },
];

// Reference THEMES so the import isn't unused even when its content is only
// consumed by ThemeModal.
void THEMES;

const WORKSHOPS = [
  {
    num: "01",
    theme: "Modular Research Components",
    title: "Turn your research into composable atoms — and reshape how your lab builds knowledge",
    by: "Matthew Akamatsu · University of Washington",
    body: "The June 2026 MIRA workshop refined the schema and built initial tool implementations. Now we bring it to researchers across disciplines. You'll decompose a real piece of your own work into MIRA's atomic elements — Question, Claim, Evidence, Study, Protocol — surfacing where the schema holds and where it breaks for your domain. Then we flip the frame: instead of writing papers and decomposing after the fact, how do you build research as MIRA elements from day one?",
    facets: [
      { dt: "Technology", dd: "MIRA schema · modular research components · composable research objects · attribution" },
      { dt: "Researchers bring", dd: "A piece of ongoing or published work — a paper, a notebook, an experiment series. The messier and harder to attribute, the better." },
      { dt: "Leave with", dd: "Your research decomposed into shareable, attributable MIRA modules; a practical workflow for generating MIRA elements as you work so you never need to decompose a paper after the fact" },
      { dt: "Format", dd: "Half-day" },
    ],
    format: "Half-day",
  },
  {
    num: "03",
    theme: "Resilient Data & Sovereign Infrastructure",
    title: "Save your discipline's at-risk data — on infrastructure you control",
    by: "Cornelius Ihle · University of Göttingen",
    body: "Bring any data repositories you know of. We'll crawl them for open-access content. Separately, bring any specific at-risk datasets you want preserved. We'll content-address every payload and replicate it across D-LOCKSS, a modern successor to LOCKSS built on IPFS. D-LOCKSS adds signed research objects, per-shard CRDT replication, and on-demand pinning contributed upstream to IPFS Kubo. Custody stays with the institutions. You leave with that data verifiably preserved on a decentralized network, plus a path to run a node on a single server, VM, or Raspberry Pi at your institution.",
    facets: [
      { dt: "Technology", dd: "D-LOCKSS · IPFS Kubo · content addressing · CRDT replication · on-demand pinning" },
      { dt: "Researchers bring", dd: "Data repositories for us to crawl for open-access content. Separately, any specific at-risk datasets you want preserved" },
      { dt: "Leave with", dd: "Your data verifiably preserved on a decentralized network, plus a path to run resilient, sovereign storage at your institution on hardware as small as a Raspberry Pi" },
      { dt: "Format", dd: "Half-day" },
    ],
    format: "Half-day",
  },
  {
    num: "∞",
    theme: "Continuous · All themes",
    title: "PICoding",
    by: "Jonathan Starr · SciOS",
    body: "A live build line for the gaps the event surfaces. When the four themes turn up open science tooling that's missing, broken, or stuck on a wishlist, we'll spec it with the group and build a working prototype on the spot, using a multi-agent software-development harness. Drop in across the four days; leave with real code addressing real gaps.",
    facets: [
      { dt: "Technology", dd: "Multi-agent software-development harness" },
      { dt: "Researchers bring", dd: "Tooling pain points and missing pieces from your own work" },
      { dt: "Leave with", dd: "Working prototype code addressing a real gap" },
      { dt: "Format", dd: "Continuous · drop in across the four days" },
    ],
    format: "Continuous",
  },
  {
    num: "00",
    theme: "Foundational · All themes",
    title: "Theory crafting",
    by: "Ellie DeSota and the IOSP community",
    body: "Each year we revisit the theory of change behind IOSP. We'll look at what's actually been built since last year, where this year's workshops fit into the picture, what gaps still exist, and priorities for the coming year. Leave with a shared read on the substrate's current shape, and a call for action in the year ahead.",
    facets: [
      { dt: "Technology", dd: "IOSP's theory-of-change framework" },
      { dt: "Researchers bring", dd: "Observations from the year's themes and your own domain" },
      { dt: "Leave with", dd: "A shared list of priorities and named gaps for the year ahead" },
      { dt: "Format", dd: "Half-day · all participants" },
    ],
    format: "Half-day",
  },
];

function BlockHead({
  kick,
  title,
  right,
}: {
  kick: string;
  title: string;
  right: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="eyebrow mb-5">{kick}</div>
        <h3 className="display m-0 text-[clamp(30px,3.8vw,48px)] text-ink">
          {title}
        </h3>
      </div>
      <div className="pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
        {right}
      </div>
    </div>
  );
}

export function Iosp2026() {
  const [signup, setSignup] = useState<SignupKind>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeKey | null>(null);
  const [theoryOpen, setTheoryOpen] = useState(false);
  const [openWs, setOpenWs] = useState<Set<string>>(new Set());
  const toggleWs = (num: string) =>
    setOpenWs((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });

  return (
    <section className="sect zone-event" id="iosp2026" data-screen-label="IOSP 2026">
      <div className="wrap">
        {/* ── flagship panel: strip + hero + venue ─────────────────────── */}
        <Reveal>
          <div className="gshell">
            <div className="gcore relative px-7 py-9 md:px-12 md:py-12">
              <div
                className="halo -top-24 right-[-10%] h-[320px] w-[480px] bg-royal-deep/20"
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
                <span className="inline-flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-royal"
                    aria-hidden="true"
                  />
                  IOSP 2026 — Edition 02
                </span>
                <span>Oct 12–15, 2026</span>
              </div>

              <div className="relative grid gap-10 pt-10 md:grid-cols-[5fr_4fr] md:gap-14">
                <div>
                  <div className="eyebrow mb-8">
                    Institute of Open Science Practices
                  </div>
                  <h2 className="display m-0 whitespace-nowrap text-[clamp(56px,8.5vw,124px)] text-ink">
                    IOSP&nbsp;2026
                  </h2>
                  <div className="mt-8 flex flex-wrap items-baseline gap-6">
                    <div className="font-mono text-[26px] tracking-tight text-ink">
                      12{" "}
                      <span className="px-1 text-royal" aria-hidden="true">
                        →
                      </span>{" "}
                      15
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
                      October 2026
                    </div>
                  </div>
                </div>

                <div className="self-center border-t border-rule pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                  <h6 className="m-0 mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ink-mute">
                    Venue
                  </h6>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft [&_a]:text-royal [&_a]:underline [&_a]:decoration-royal/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-royal [&_strong]:font-medium [&_strong]:text-ink">
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
            </div>
          </div>
        </Reveal>

        {/* ── production-driven ────────────────────────────────────────── */}
        <Reveal className="mt-6">
          <div className="gshell">
            <div className="gcore grid gap-10 px-7 py-9 md:grid-cols-[2fr_3fr] md:gap-14 md:px-12 md:py-12">
              <div>
                <div className="eyebrow mb-8">Production-driven</div>
                <div className="space-y-7">
                  {[
                    { pct: 10, lbl: "Talks + panels", size: "text-2xl" },
                    { pct: 15, lbl: "Tooling showcase", size: "text-3xl" },
                    { pct: 75, lbl: "Co-design + build", size: "text-6xl" },
                  ].map((r) => (
                    <div key={r.lbl}>
                      <div
                        className={`display ${r.size} leading-none text-ink`}
                      >
                        {r.pct}
                        <span className="text-royal">%</span>
                      </div>
                      <div className="mt-2.5 h-1 w-full overflow-hidden bg-black/[0.06]">
                        <div
                          className="h-full bg-royal"
                          style={{ width: `${r.pct}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink-mute">
                        {r.lbl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="self-center border-t border-rule pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
                <p className="m-0 mb-6 font-serif text-[clamp(24px,2.6vw,32px)] italic leading-snug text-ink">
                  Less talking. More collaboration. More building.
                </p>
                <p className="m-0 mb-4 text-[15.5px] leading-relaxed text-ink-soft [&_em]:font-serif [&_em]:text-[1.1em] [&_em]:italic [&_em]:text-royal">
                  IOSP is built on a single working principle:{" "}
                  <em>
                    the people who depend on open science infrastructure and the
                    people building it should be in the same room
                  </em>
                  , working on the same problems, long enough to make real progress.
                </p>
                <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                  Researchers bring the domain knowledge and challenges that
                  shape what's worth building; tool-builders bring the systems
                  and expertise to build it.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── takeaways ────────────────────────────────────────────────── */}
        <div className="mt-24">
          <Reveal>
            <div className="eyebrow mb-8">Goals</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {TAKEAWAYS.map((t, i) => (
              <Reveal key={t.title} delay={i * 70} className="flex">
                <div className="cell cell-hover flex w-full flex-col p-7">
                  <h4 className="m-0 mb-3 font-display text-[18px] font-semibold leading-snug tracking-tight text-ink">
                    {t.title}
                  </h4>
                  <div className="text-[13.5px] leading-relaxed text-ink-soft [&_a]:font-medium [&_a]:text-royal [&_a]:no-underline [&_a:hover]:underline">
                    {t.body}
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="border-t border-rule pt-4">
                      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-royal/80">
                        IOSP 2025
                      </div>
                      <div className="mb-2.5 flex gap-3">
                        <span
                          className="w-px shrink-0 bg-royal/50"
                          aria-hidden="true"
                        />
                        <div>
                          <div className="text-[13px] font-medium text-ink">
                            {t.name}
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] text-ink-mute">
                            {t.role}
                          </div>
                        </div>
                      </div>
                      <div className="font-serif text-[14px] italic leading-normal text-ink-soft">
                        “{t.quote}”
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── themes ───────────────────────────────────────────────────── */}
        <div className="mt-24">
          <Reveal>
            <BlockHead
              kick="Structure"
              title="IOSP 2026 Themes"
              right="Parallel tracks"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {THEME_CARDS.map((t, i) => (
              <Reveal key={t.key} delay={i * 70} className="flex">
                <button
                  type="button"
                  className="cell cell-hover group w-full cursor-pointer p-8 text-left"
                  onClick={() => setActiveTheme(t.key)}
                  aria-label={`Open theme: ${t.title}`}
                >
                  <h4 className="m-0 mb-3 flex items-start justify-between gap-5 font-display text-[21px] font-semibold leading-snug tracking-tight text-ink">
                    <span>{t.title}</span>
                    <span
                      className="mt-1 text-[17px] text-ink-mute transition-all duration-500 ease-spring group-hover:translate-x-1 group-hover:text-royal"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </h4>
                  <p className="m-0 text-[14px] leading-relaxed text-ink-soft">
                    {t.body}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-4">
            <button
              type="button"
              className="cell cell-hover group grid w-full cursor-pointer gap-6 p-8 text-left md:grid-cols-[220px_1fr] md:gap-10"
              onClick={() => setTheoryOpen(true)}
              aria-label="Open: Theory of change"
            >
              <div>
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-royal/80">
                  Foundational
                </div>
                <h5 className="m-0 font-display text-[21px] font-semibold tracking-tight text-ink transition-colors duration-500 ease-spring group-hover:text-royal">
                  Theory →
                </h5>
              </div>
              <p className="m-0 border-t border-rule pt-5 text-[14px] leading-relaxed text-ink-soft md:border-l md:border-t-0 md:pl-8 md:pt-0">
                The conceptual thread running beneath all four themes — the
                questions, frameworks, and critiques that ground production work
                in deeper understanding of open science as a system.
              </p>
            </button>
          </Reveal>
        </div>

        {/* ── workshops ────────────────────────────────────────────────── */}
        <div className="mt-24">
          <Reveal>
            <BlockHead kick="Programme" title="Workshops" right="Hands-on" />
          </Reveal>

          <Reveal>
            <div className="mb-6 flex items-center justify-center gap-4 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute before:h-px before:w-8 before:bg-rule after:h-px after:w-8 after:bg-rule">
              Programme in active planning · Check back for updates
            </div>
          </Reveal>

          <div className="space-y-3">
            {WORKSHOPS.map((w, i) => {
              const isOpen = openWs.has(w.num);
              return (
                <Reveal key={w.num} delay={i * 60}>
                  <div className="cell overflow-hidden">
                    <button
                      type="button"
                      className="grid w-full cursor-pointer grid-cols-[1fr_auto] items-start gap-5 rounded-[inherit] p-6 text-left transition-colors duration-500 ease-spring hover:bg-black/[0.02] md:p-7"
                      onClick={() => toggleWs(w.num)}
                      aria-expanded={isOpen}
                    >
                      <span className="flex min-w-0 flex-col gap-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-royal/80">
                          {w.theme}
                        </span>
                        <span className="font-display text-[18px] font-semibold leading-snug tracking-tight text-ink">
                          {w.title}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                          {w.by}
                        </span>
                      </span>
                      <span className="mt-0.5 flex shrink-0 items-center gap-3">
                        <span className="bg-black/[0.04] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft ring-1 ring-inset ring-black/[0.08]">
                          {w.format}
                        </span>
                        <span
                          className={`grid h-8 w-8 place-items-center bg-black/[0.04] font-mono text-[16px] leading-none text-ink-soft ring-1 ring-inset ring-black/[0.08] transition-transform duration-500 ease-spring${isOpen ? " rotate-45 text-royal" : ""}`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="ws-body-in px-6 pb-7 pt-1 md:px-7">
                        <p className="m-0 text-[14px] leading-relaxed text-ink-soft">
                          {w.body}
                        </p>
                        <dl className="m-0 mt-6 grid gap-5 border-t border-rule pt-5 md:grid-cols-2 md:gap-x-10">
                          {w.facets.map((f) => (
                            <div key={f.dt}>
                              <dt className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-royal/80">
                                {f.dt}
                              </dt>
                              <dd className="m-0 text-[13px] leading-relaxed text-ink">
                                {f.dd}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── CTAs ─────────────────────────────────────────────────────── */}
        <div className="mt-24">
          <Reveal>
            <BlockHead kick="Action" title="Get involved" right="Open calls" />
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                id: "cta-showcase" as const,
                kind: "showcase" as const,
                tag: "[ Showcase ]",
                h: "Building a tool?",
                p: "Working on tooling or infrastructure for one of the four themes? Submit it to the production showcase so we can stress-test and build on it in Leiden.",
                action: "Submit to the showcase",
              },
              {
                id: undefined,
                kind: "committee" as const,
                tag: "[ Committee ]",
                h: "Help organize",
                p: "We're opening the organizing committee — programming, logistics, outreach. Get in touch to join the planning conversations.",
                action: "Get in touch",
              },
              {
                id: "cta-sponsor" as const,
                kind: "sponsor" as const,
                tag: "[ Sponsor ]",
                h: "Become a sponsor",
                p: "IOSP is free to join. Every sponsor dollar funds a travel grant — last year in Denver, sponsors brought 10 people from 5 countries.",
                action: "Send a participant to Leiden",
              },
            ].map((c, i) => (
              <Reveal key={c.tag} delay={i * 70} className="flex">
                <button
                  type="button"
                  id={c.id}
                  className="cell cell-hover group flex w-full cursor-pointer flex-col p-8 text-left"
                  onClick={() => setSignup(c.kind)}
                >
                  <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-royal/80">
                    {c.tag}
                  </div>
                  <h4 className="m-0 mb-3 font-display text-[21px] font-semibold leading-tight tracking-tight text-ink">
                    {c.h}
                  </h4>
                  <p className="m-0 mb-6 flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {c.p}
                  </p>
                  <div className="flex items-center justify-between border-t border-rule pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                    <span>{c.action}</span>
                    <span
                      className="text-ink-mute transition-all duration-500 ease-spring group-hover:translate-x-1.5 group-hover:text-royal"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          {/* ── register interest ──────────────────────────────────────── */}
          <Reveal delay={100} className="mt-10">
            <div className="gshell">
              <button
                type="button"
                id="cta-register"
                className="gcore group relative block w-full cursor-pointer p-8 text-left md:p-12"
                onClick={() => setSignup("participant")}
                aria-label="Register your interest"
              >
                <div
                  className="halo -bottom-32 left-1/2 h-[300px] w-[560px] -translate-x-1/2 bg-royal-deep/25"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="eyebrow mb-6">Participate</div>
                  <h3 className="display m-0 mb-6 text-[clamp(30px,4vw,52px)] text-ink">
                    Register your interest
                  </h3>
                  <div className="max-w-[68ch] space-y-4 text-[15.5px] leading-relaxed text-ink-soft [&_strong]:font-medium [&_strong]:text-ink">
                    <p className="m-0">
                      IOSP is a curated, highly facilitated event — we aim to convene
                      a balanced mix of researchers, technologists, librarians,
                      funders, and others across the global research ecosystem. Last
                      year we received 425 registrations for an 80-person room; this
                      year we have space for 100. Registering does <strong>not</strong>{" "}
                      guarantee a seat.
                    </p>
                    <p className="m-0">
                      <strong>IOSP is free to join</strong>, and every sponsorship
                      dollar goes <strong>directly to travel grants</strong> so
                      finances and location aren't a barrier for participants.
                    </p>
                    <p className="m-0">
                      Actively pushing open science forward? Register and we'll do our
                      best to find a way to get you in the room.
                    </p>
                  </div>
                  <span className="btn-pill mt-8 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                    Register interest →
                  </span>
                </div>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <IospSignupModal kind={signup} onClose={() => setSignup(null)} />
      <ThemeModal themeKey={activeTheme} onClose={() => setActiveTheme(null)} />
      <TheoryModal open={theoryOpen} onClose={() => setTheoryOpen(false)} />
    </section>
  );
}
