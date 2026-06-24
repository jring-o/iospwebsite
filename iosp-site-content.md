# IOSP — Full Site Content

All copy from every section of the IOSP site (`iosp.science`). The site is a single homepage (`src/app/page.tsx`) plus modals; this document contains everything visible to a reader.

Sections, in render order: Top Nav → Masthead → IOSP 2026 → How IOSP Works → Science Should Be → It's Time to Build → Pull Quote ("We can raise cities") → The Substrate → IOSP 2025 Recap → Voices → Stay Connected → Site Footer.

Modals: Theme Modal (×4 themes), Theory of Change Modal, Signup Modal (×4 kinds: Showcase · Committee · Sponsor · Participant). Plus shared signup lists and the post-submit toast.

---

## Top Nav (sticky strip)

**Lockup:** Institute of Open Science Practices
**Current-section indicator (default):** Since 2024
**Sections menu:**

- IOSP 2026 → `#iosp2026`
- Operating model → `#how`
- Theory → `#build`
- The Substrate → `#substrate`
- Last year → `#iosp2025`
- Letters page → `#voices`
- Newsletter → `#stay`

---

## Masthead

**H1:** Institute of Open Science Practices

**Lede:** An *event*, a *community*, and a *coordinating institute* for the people building, using, and advancing the infrastructure open science depends on.

**Tagline:** "Build the infrastructure that makes open easy to practice."

**Primary CTA:** IOSP 2026 — Oct 12–15, 2026 · Leiden

**Sub-CTAs:**
- Submit to the tooling showcase →
- Sponsor a travel grant →
- Attend →

---

## IOSP 2026

### Top strip

- IOSP 2026 — Edition 02
- Oct 12–15, 2026

### Hero

**Kicker:** Institute of Open Science Practices
**Title:** IOSP 2026
**Dates:** 12 → 15 October 2026

**Venue:** **Poortgebouw, University of Leiden, and GO FAIR** host us on Oct 12, 13, and 15. On Oct 14 we field-trip to the [National Open Science Festival](https://opensciencefestival.nl/) in Delft, then reconvene for the final day.

### Production-driven

| % | Activity |
|---|----------|
| 10% | Talks + panels |
| 15% | Tooling showcase |
| 75% | Co-design + build |

**Pull quote:** Less talking. More collaboration. More building.

IOSP is built on a single working principle: *the people who depend on open science infrastructure and the people building it should be in the same room*, working on the same problems, long enough to make real progress.

Researchers bring the domain knowledge and challenges that shape what's worth building; tool-builders bring the systems and expertise to build it.

### Goals (takeaways)

**1. Meet people you couldn't meet elsewhere**
Researchers and builders shoulder-to-shoulder for four days in a facilitated environment. The people building open science infrastructure side-by-side with those who depend on it.
> "Great discussions and valuable connections that would be really hard to have in traditional academic conferences."
> — **Ronen Tamari**, Renaissance Philanthropy BiTS Fellow

**2. Gain a working knowledge of new tools and infrastructure**
Discover novel infrastructure being built across the open science ecosystem. Leave with the high-level concepts, the technical details, and a path to put them to work.
> "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of."
> — **Doug Schuster**, NSF NCAR

**3. Form a clearer picture of what researchers actually need built**
Four days alongside the researchers who depend on what's being built. Leave with sharper requirements, validated user-stories, and a list of dead-ends to stop pursuing.
> "Expert opinion on challenges research libraries face when sharing data, and useful guidelines for rolling out new research technologies."
> — **Martin Karlsson**, Coordination Network

**4. Start work that lives beyond the event**
Projects and collaborations started, sharpened, and stress-tested at IOSP seed work that continues after. [MIRA](https://mira.science), [CAIROS](https://cairos.network/), and [PRSM](https://prsm.network) all grew out of work begun at IOSP.
> "This put us in a better position to build the next system for science and publishing."
> — **Matthew Akamatsu**, University of Washington

### Structure — IOSP 2026 Themes (parallel tracks)

**Theme 01 — Modular Research Components**
The tools and frameworks for composable research. Every method, dataset, model, claim, and review becomes a first-class object with its own identifier, schema, and version history.

**Theme 02 — Funding Open Science & Open Source**
How money should actually move through an open ecosystem so the substrate gets built — and stays built. Core-and-satellite, transitive funding, modular funding.

**Theme 03 — Resilient Data & Sovereign Infrastructure**
Persistent identifiers, distributed preservation, and systems that don't depend on a single host. Local-first, self-hosted, decentralized — turning "someone else's server" into infrastructure the people who depend on it actually own.

**Theme 04 — Assessment, Evaluation & Insights**
How we measure, verify, and understand the impact of research and its infrastructure. Trust signals, attestations, and verification that travel with the artifact instead of the paper around it.

**Foundational — Theory →**
The conceptual thread running beneath all four themes — the questions, frameworks, and critiques that ground production work in deeper understanding of open science as a system.

### Programme — Workshops (hands-on)

Programme in active planning · Check back for updates.

**01 — Modular Research Components — Half-day**
*Turn your research into composable atoms — and reshape how your lab builds knowledge*
Matthew Akamatsu · University of Washington
The June 2026 MIRA workshop refined the schema and built initial tool implementations. Now we bring it to researchers across disciplines. You'll decompose a real piece of your own work into MIRA's atomic elements — Question, Claim, Evidence, Study, Protocol — surfacing where the schema holds and where it breaks for your domain. Then we flip the frame: instead of writing papers and decomposing after the fact, how do you build research as MIRA elements from day one?
- **Technology:** MIRA schema · modular research components · composable research objects · attribution
- **Researchers bring:** A piece of ongoing or published work — a paper, a notebook, an experiment series. The messier and harder to attribute, the better.
- **Leave with:** Your research decomposed into shareable, attributable MIRA modules; a practical workflow for generating MIRA elements as you work so you never need to decompose a paper after the fact
- **Format:** Half-day

**03 — Resilient Data & Sovereign Infrastructure — Half-day**
*Save your discipline's at-risk data — on infrastructure you control*
Cornelius Ihle · University of Göttingen
Bring any data repositories you know of. We'll crawl them for open-access content. Separately, bring any specific at-risk datasets you want preserved. We'll content-address every payload and replicate it across D-LOCKSS, a modern successor to LOCKSS built on IPFS. D-LOCKSS adds signed research objects, per-shard CRDT replication, and on-demand pinning contributed upstream to IPFS Kubo. Custody stays with the institutions. You leave with that data verifiably preserved on a decentralized network, plus a path to run a node on a single server, VM, or Raspberry Pi at your institution.
- **Technology:** D-LOCKSS · IPFS Kubo · content addressing · CRDT replication · on-demand pinning
- **Researchers bring:** Data repositories for us to crawl for open-access content. Separately, any specific at-risk datasets you want preserved
- **Leave with:** Your data verifiably preserved on a decentralized network, plus a path to run resilient, sovereign storage at your institution on hardware as small as a Raspberry Pi
- **Format:** Half-day

**∞ — Continuous · All themes — Continuous**
*PICoding*
Jonathan Starr · SciOS
A live build line for the gaps the event surfaces. When the four themes turn up open science tooling that's missing, broken, or stuck on a wishlist, we'll spec it with the group and build a working prototype on the spot, using a multi-agent software-development harness. Drop in across the four days; leave with real code addressing real gaps.
- **Technology:** Multi-agent software-development harness
- **Researchers bring:** Tooling pain points and missing pieces from your own work
- **Leave with:** Working prototype code addressing a real gap
- **Format:** Continuous · drop in across the four days

**00 — Foundational · All themes — Half-day**
*Theory crafting*
Ellie DeSota and the IOSP community
Each year we revisit the theory of change behind IOSP. We'll look at what's actually been built since last year, where this year's workshops fit into the picture, what gaps still exist, and priorities for the coming year. Leave with a shared read on the substrate's current shape, and a call for action in the year ahead.
- **Technology:** IOSP's theory-of-change framework
- **Researchers bring:** Observations from the year's themes and your own domain
- **Leave with:** A shared list of priorities and named gaps for the year ahead
- **Format:** Half-day · all participants

### Action — Get involved (open calls)

**[ Showcase ] Building a tool?**
Working on tooling or infrastructure for one of the four themes? Submit it to the production showcase so we can stress-test and build on it in Leiden.
*CTA:* Submit to the showcase →

**[ Committee ] Help organize**
We're opening the organizing committee — programming, logistics, outreach. Get in touch to join the planning conversations.
*CTA:* Get in touch →

**[ Sponsor ] Become a sponsor**
IOSP is free to join. Every sponsor dollar funds a travel grant — last year in Denver, sponsors brought 10 people from 5 countries.
*CTA:* Send a participant to Leiden →

### Register your interest

**Kicker:** Participate
**Title:** Register your interest

IOSP is a curated, highly facilitated event — we aim to convene a balanced mix of researchers, technologists, librarians, funders, and others across the global research ecosystem. Last year we received 425 registrations for an 80-person room; this year we have space for 100. Registering does **not** guarantee a seat.

**IOSP is free to join**, and every sponsorship dollar goes **directly to travel grants** so finances and location aren't a barrier for participants.

Actively pushing open science forward? Register and we'll do our best to find a way to get you in the room.

*Button:* Register interest →

---

## How IOSP Works

**Kicker:** Operating model
**H2:** Identify · Converge · Support
**Dek:** IOSP is a continuous, year-long operation. The annual gathering is the checkpoint where we identify challenges and test solutions built by the open community throughout the year.

**Identify (Ongoing):** Through direct connections, workshops, and continuous engagement with the open science community, we identify critical gaps in infrastructure and the people and tools working to fill them.

**Converge (Annual gathering):** Once a year we bring together the identified players — researchers, technologists, and infrastructure builders — to showcase progress, define priorities, and align efforts around shared challenges.

**Support (Year-round):** Year-round, we provide resources, facilitate connections, and help collaborative progress move forward — turning event momentum into lasting infrastructure.

**Repeat:** Every gathering identifies bottlenecks and next steps. Every collaboration produces working code. Every year turns the key a little further.

---

## Science Should Be

**H2:** Science should be

1. Community-owned
2. Collaborative
3. Auditable

---

## It's Time to Build

**Kicker:** Theory
**H2:** It's time to build the digital-native substrate.

**Dek (¶1):** A system of science is a complete configuration of five protocols — *inference, quality, engagement, coordination, and preservation* — enabled by the technical substrate of an era. Value, incentive, and governance processes guide the configuration of each protocol within a system. Today, three systems of science operate side by side — *institutional, benefactor, and corporate* — each operating on the same technical substrate, and each with their own sets of values, incentives, and governance processes. No one designed any of these systems. They emerged through a series of events, accidents, and actions intended to fulfill immediate needs.

**Dek (¶2):** The technical substrate of science has moved through five distinct eras over hundreds of years, each opening new primitives for the systems built on top. Scientific societies and the first journals emerged from letterpress, postal networks, and the telegraph to define the Organized Era of science. Research universities, professionalization, and formalized peer review took shape as the Professional Era embraced typewriters, telephone networks, and microfilm. Mainframes, photocopiers, and citation indexes led to federal funding, peer review, tenure, grant cycles, and the citation-based credit of the Institutional Era we still inhabit. Today we've wrapped the Institutional Era's processes in digital tools: PDFs as journals, h-indexes as memory, citation databases as card catalogs — though the primitives of these tools enable so much more.

**Dek (¶3):** The technical substrate of the next era will be digital-native, built by the global research community and designed intentionally from the ground up. From this substrate, a pluralistic era of scientific systems that amplify each other's strengths, make up for one another's failures, and grow stronger under stress will thrive.

**Dek (¶4):** The next era of science is antifragile.

### Protocols × Eras table

Column eras: **Organized** (1665–1876) · **Professional** (1876–1950) · **Institutional** (1950–2000) · **Digitized** (2000–Present) · **Digital-native** (Building Now)

**Inference** — Generate · analyze · experiment
- Organized: Society-funded experiments; Collective witnessing
- Professional: University laboratories; Graduate student workforce
- Institutional: Federal grants; University labs
- Digitized: Personal digital notebooks; Local computations; Proprietary software
- Digital-native: Executable narratives; Reproducible containers; Live computational environments; Atomic contributions

**Quality** — Verify · replicate · trust
- Organized: Witnessed demos; Society meetings
- Professional: Formalized peer review; Specialized journals
- Institutional: Anonymous peer review; Journal prestige
- Digitized: Citation databases; Impact Factor; Paywalled review
- Digital-native: Computational verification; Trust attestation; Portable verification; Modular peer review; Linter-as-review; Topological validation

**Engagement** — Connect · share · discover
- Organized: Letters; Scientific journals; Society proceedings
- Professional: Specialized journals; International conferences; Telegraph
- Institutional: Academic journals; Conference circuits; Email; Journal consolidation
- Digitized: PDFs; Digital subscriptions; Publisher platforms
- Digital-native: Object graphs; Overlay journals; Open by default; Generative narratives

**Coordination** — Credit · fund · collaborate
- Organized: Scientific societies; Royal/noble patronage
- Professional: University salaries; Foundation funding; Nobel prize hierarchy
- Institutional: Grant cycles; Tenure system; Citation-based credit
- Digitized: h-index; Altmetrics; ORCID as paper trail
- Digital-native: Contribution graphs; Micro-attribution; Open impact algorithms; Transitive / modular funding

**Preservation** — Store · access · archive
- Organized: Journal archives; Multiplying libraries
- Professional: University libraries; Catalog standards; Microfilm
- Institutional: University libraries; Journal archives
- Digitized: DOI system; Siloed repositories; Lossy digital archives
- Digital-native: Content addressing; Distributed hosting; Redundant archives; Append-only provenance; Sovereign infrastructure

**Footer link:** → Engage with our complete theory of change (`/theory`) — *An interactive expression. In development.*

---

## Pull Quote — "We can raise cities"

> A thousand coordinated people, collaborating on small, achievable outputs, can raise cities.

Between 1855 and 1872, Chicago raised the entire grade of its downtown — buildings and streets — by up to fourteen feet. Hundreds of jackscrews, each operated by a few people, lifted whole hotels and city blocks while business carried on inside. [The Raising of Chicago →](https://en.wikipedia.org/wiki/Raising_of_Chicago)

---

## The Substrate — Independent teams. One substrate.

**Kicker:** The Substrate
**H2:** Independent teams. One substrate.
**Dek:** Across the ecosystem, independent teams are building components of a shared technical substrate for science. Science needs them to work together.

Cells marked "IOSP 2025" indicate areas worked on in last year's gathering.

- **Storage & Preservation** *(IOSP 2025)* — Persistent, FAIR-compliant storage with content addressing (CIDs) · distributed archives · automated metadata · long-term preservation protocols.
- **Compute & Execution** *(IOSP 2025)* — Reproducible computational environments · container specs · execution manifests · distributed compute coordination · data visitation.
- **Validation & Trust** *(IOSP 2025)* — Automated testing · continuous replication · cryptographic proofs of correctness · provenance tracking · trust scoring · attestation models · open algorithms.
- **Knowledge Graphs & Semantics** — Semantic registries · knowledge graphs · composable research objects · cross-platform data schemas.
- **Discovery & Communication** *(IOSP 2025)* — Federated search · semantic discovery · publishing APIs · event streams · collaborative review platforms · micropublishing.
- **Attribution & Credit** — Contribution graphs · portable reputation · micro-attribution · transparent governance records.
- **Identity & Authentication** *(IOSP 2025)* — Decentralized identifiers (DIDs) · key management · authentication protocols · agent registries.
- **Funding Innovation** — Alternative funding models · retroactive public goods · quadratic funding · granular funding.
- **Collaboration Infrastructure** *(IOSP 2025)* — Real-time coordination · federated workflows · cross-institutional projects · team science tools · shared workspaces.

---

## IOSP 2025 Recap — Denver, February 23–25

**Kicker:** Last year
**H2:** IOSP 2025 — Denver, February 23–25
**Dek:** The inaugural gathering, at the Denver Museum of Nature and Science. Three days. Four hundred and twenty-five registrations for an eighty-person room. Numbers below; recap underneath.

### Stat band

| # | Label |
|---|-------|
| 425 | Open registrations |
| 80 | Curated invitations |
| 5 | Countries represented |
| 24 | Speakers & workshop leaders |
| 95% | Would attend again |
| 93% | Would recommend |
| 87% | Cited facilitated networking as highly valued |
| 80% | Continuing collaborations from IOSP |

### Format

- **Day 1** — Knowledge dissemination — talks, panels, framing
- **Day 2** — Workshops — hands-on production across themes
- **Day 3** — Coworking space in RiNo — work continued in small groups

Beyond the survey, the gathering kicked off post-event collaborations — work begun in workshops continued through the year as a basis for projects like MIRA, CAIROS, and PRSM.

### Infrastructure stack used in production

- **DeSci Publish** — Submission & peer-review
- **Silk** — Identity & credentials
- **IPFS** — Content-addressed storage
- **Ceramic** — Data interoperability
- **CODEX** — Persistent identifiers (dPIDs)
- **Coordination Network** — AI synthesis

The gathering itself ran on the same infrastructure participants were stress-testing — submissions, reviews, identity, archival, all in production.

### Speakers & workshop leaders

- Kathryn Knight — ORNL
- Beth Duckles — Organizational Mycology
- Sandra Gesing — US RSE + SGX3
- Juliane Schneider — PNNL
- Jonathan Starr — NumFOCUS & SciOS
- Gideon Nave — University of Pennsylvania
- Erik Schultes — GO FAIR Foundation
- Isabel Abedrapo — Remolino
- Daniela Saderi — PREreview
- Ellie DeSota — SciOS
- Doug Schuster — NSF NCAR
- Cornelius Ihle — Gipp Lab
- Laure Haak — Mighty Red Barn
- Philipp Koellinger — Vrije Universiteit Amsterdam
- Franck Marchis — SETI Institute
- Filipp Kramer — Alchemy Bio, Astera Fellow
- Dion Whitehead — Metapage, Astera Fellow
- Edvard Hübinette — DeSci Labs
- Martin Karlsson — Coordination Network
- Saif Haobsh — Fylo, Astera Fellow
- Ronen Tamari — Cosmik, Astera Fellow
- Matthew Akamatsu — UW, Discourse Graphs
- Paul Weidner — Technologist
- Edilson Damasio — Univ. Estadual de Maringá

### Planning committee

- Jonathan Starr — NumFOCUS & SciOS
- Ellie DeSota — SciOS
- Franck Marchis — SETI Institute
- Erik Schultes — GO FAIR Foundation
- Chris Erdmann — SciLifeLabs
- Shady El Damaty — OpSci & Holonym

---

## Voices — In their own words

**Kicker:** Letters page
**H2:** In their own words
**Dek:** What participants said after IOSP 2025.

> "It felt like we started a movement! This event incorporated stakeholders and put us in a better position to build the next system for science and publishing that deliberately incorporates their needs and our values."
> — **Matthew Akamatsu**, UW Discourse Graphs

> "Got out of my house and met people; great conversations; lots of creative spitballing; met with some potential funders; made new friends; made some progress on some ideas; had the opportunity to make first pitch for new project."
> — **Laure Haak**, Mighty Red Barn

> "Great discussions and valuable connections that would be really hard to have in traditional academic conferences."
> — **Ronen Tamari**, Cosmik · Astera Fellow

> "I gained exposure to future technologies, while meeting people who want to change the world of science."
> — **Franck Marchis**, SETI Institute

> "Amazing intro to science / research world as someone not deeply in this space. Learned high-level concepts and low-level technical frameworks. As a contractor working in open source, decentralized technologies, there is simply nothing more valuable than a conference like this."
> — **Paul Weidner**, Technologist

> "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of. It was thought provoking and a great networking opportunity."
> — **Doug Schuster**, NSF NCAR

> "Contact with developers and representatives of OS projects. A lot of learning about the tools, projects developed and under development. Possibility to participate in new initiatives. Debates about challenges and the future."
> — **Edilson Damasio**, Univ. Estadual de Maringá

> "I had the chance to meet and connect with interesting people and learn about exciting initiatives."
> — **Isabel Abedrapo**, Remolino

> "Expert opinion across a range of relevant topics including challenges research libraries face when sharing data and very useful guidelines to keep in mind when rolling out new research technologies."
> — **Martin Karlsson**, Coordination Network

> "I met some great people with whom I hope to collaborate in the future."
> — **Daniela Saderi**, PREreview

> "The connections to others and the chance to have conversations were great."
> — **Beth Duckles**, Organizational Mycology

---

## Stay Connected — Newsletter

**Kicker:** Newsletter
**H2:** Be the first to hear about IOSP 2027.
IOSP news, resources, and community events. No noise.

**Link:** [Subscribe to the newsletter →](https://www.scios.tech/?newsletter=1)

---

## Site Footer

- Institute of Open Science Practices
- Founded 2024
- [contact@scios.tech](mailto:contact@scios.tech)

---

# Modals

## Theme Modal — Theme 01 — Modular Research Components

**Eyebrow:** Theme 01
**Title:** Modular Research Components
**Description:** The tools and frameworks for composable research.

Today's research ships as monoliths: figure, method, claim, dataset, and software all welded into one PDF. Modular research components break the paper apart — every method, dataset, model, claim, and review becomes a first-class object with its own identifier, schema, and version history.

**In Leiden:** We'll highlight, hack on, and extend the work already pushing this vision forward.

---

## Theme Modal — Theme 02 — Funding Open Science & Open Source

**Eyebrow:** Theme 02
**Title:** Funding Open Science & Open Source
**Description:** How money moves through the open ecosystem.

Open infrastructure runs on a starvation diet. Grants reward novelty, not maintenance. Institutions reward publications, not protocols. This theme asks how money should actually move through an open ecosystem so the substrate gets built — and stays built.

**In Leiden:** We'll dig into core and satellite, transitive funding, and what funding research looks like when science itself becomes modular.

---

## Theme Modal — Theme 03 — Resilient Data & Sovereign Infrastructure

**Eyebrow:** Theme 03
**Title:** Resilient Data & Sovereign Infrastructure
**Description:** How research data and infrastructure stay alive — persistent identifiers, distributed preservation, and systems that don't depend on a single host.

The core of research data is its identifiers, its addressing, and its preservation guarantees. Resilient infrastructure assumes domain failure, whether a server, a funding stream, an organization, or a jurisdiction. The only solution is content-addressed payloads, distributed mirroring, append-only provenance, and resolvers that cannot 404.

Sovereign infrastructure adds the question of control — who decides whether a service stays up, who can pull the plug, and what happens to the data if they do. Local-first systems, self-hosted nodes, and decentralized preservation networks turn "someone else's server" into infrastructure the people who depend on it actually own.

**In Leiden:** We'll convene the people already building and maintaining this layer, learn how to use it effectively, stress-test where it breaks under modular research workloads, and guide the projects extending it forward.

**Workshops:** → Save your discipline's at-risk data — Cornelius Ihle, University of Göttingen

---

## Theme Modal — Theme 04 — Assessment, Evaluation, & Insights

**Eyebrow:** Theme 04
**Title:** Assessment, Evaluation, & Insights
**Description:** How we measure, verify, and understand the impact of research and the infrastructure supporting it.

JIF, h-index, and citation counts measure papers — not the things science actually depends on: replications, methods that hold up, datasets that get reused, software that doesn't break, reviews that catch errors. As research itself becomes modular, the question gets harder: how do you evaluate a method, a dataset, a claim, or a review on its own terms?

**In Leiden:** We'll work alongside the projects rethinking research assessment — trust signals, attestations, and verification that travel with the artifact instead of the paper around it.

---

## Theory of Change Modal

**Eyebrow:** Foundation
**Title:** Theory of change

How modern science gets funded, conducted, published, evaluated, and preserved was never engineered. It emerged.

Inference, quality, engagement, coordination, and preservation are the five protocols every system of science configures on whatever substrate an era can provide. When the substrate shifts, the protocols reconfigure around it. Each new substrate, from vellum to movable type to the post to the web, has reshaped how science got funded, validated, and preserved.

The next substrate is already being built — persistent identifiers, schemas, provenance graphs, verification protocols, execution standards, registries, funding protocols — in pieces, across countless communities. The work ahead is to align efforts, and to configure their outputs toward the production of a shared technical substrate that endables a plurality of scientific systems — governance, incentive, assessment — to run in parallel, amplifying one another's strengths, and absorbing one another's failures.

**The future is antifragile.**

→ Read more about our theory

---

## Signup Modal — Showcase

**Eyebrow:** [ Showcase ]
**Title:** Submit a tool to the showcase
**Description:** Tell us about the tooling or infrastructure you'd like to bring to Leiden. We'll follow up to scope what stress-testing and building together looks like.
**Submit:** Submit to the showcase

**Fields:**
- Your name *
- Email *
- Organization (optional)
- Project name *
- Project URL or repo * (placeholder: `https://`)
- Which themes does it touch? (multi-select; uses themes list below)
- Short pitch * — placeholder: "What is it, what stage is it at, and what would be useful to do together in Leiden?"

---

## Signup Modal — Committee

**Eyebrow:** [ Committee ]
**Title:** Help organize IOSP 2026
**Description:** Tell us where you'd like to plug in. The first open organizing call is May 4 — we'll add you to the invite.
**Submit:** Get in touch

**Fields:**
- Your name *
- Email *
- Affiliation (optional)
- Where would you like to plug in? — Programming, Logistics, Outreach, Sponsorship, Other
- Which themes interest you most? (optional)
- Bandwidth & notes (optional) — placeholder: "Roughly how much time you have, things you'd love to work on, anything else we should know."

---

## Signup Modal — Sponsor

**Eyebrow:** [ Sponsor ]
**Title:** Sponsor IOSP 2026
**Description:** Every sponsor dollar funds a travel grant. Last year in Denver, sponsorship brought 10 people from 5 countries to IOSP. Jon and Ellie will respond directly within one business day to discuss how we can help you reach the right audiences as a champion of open science.
**Submit:** Talk to us

**Fields:**
- Your name *
- Email *
- Organization *
- Your role *
- Send participants to IOSP — sponsorship tiers (below)
- Which themes interest you most? (multi-select)
- Message (optional) — placeholder: "Anything you want us to know — interests, constraints, timeline."
- OK to list us publicly as an IOSP 2026 sponsor. *(We'll add your name and logo to the sponsor section of the IOSP site. Uncheck to keep your support private.)*
- Also interested in SciOS services for our team. *(We'll send a short overview of what consulting, workshops, training, or partnership engagements could look like for your organization.)*

**Sponsorship tiers:**

| Tier | Dollars | Seats |
|------|---------|-------|
| Co-fund a participant | Under $2,000 | partial seat |
| Send a participant | $2,000 | 1 person |
| Send a group | $6,000 | 3 participants |
| Send a cohort | $20,000 | 10 participants |
| Anchor the room | $50,000+ | 25+ participants |
| Let's talk | Flexible | — |

**Fine print under tiers:** ~$2,000 covers travel + accommodation per person, on average. 100% of sponsorship goes directly to travel grants — SciOS keeps IOSP free year after year through [consulting](https://scios.tech/?lab=resilient-data-futures), [workshops](https://mira.science), [training](https://scios.tech/picoding), and partnership engagements with organizations building open science infrastructure. Every paid engagement helps keep future IOSPs free.

---

## Signup Modal — Participant (Register interest)

**Eyebrow:** [ Participate ]
**Title:** Register your interest
**Description:** Capacity is limited — last year 425 people registered for 80 seats, so registering doesn't guarantee a spot. IOSP is free to join, and every sponsorship dollar goes to travel grants so as many participants as possible can join us. Tell us a bit about yourself and we'll be in touch.
**Submit:** Register interest

**Fields:**
- Your name *
- Email *
- Affiliation (optional)
- Which themes are you most interested in? (optional, multi-select)
- Which best describes you? (optional, multi-select) — audience roles list below
- Sector (optional, single-select) — sectors list below
- Region (optional, single-select) — regions list below
- Travel & financial support — checkbox: "My participation depends on financial support. In an ideal world, sponsorship will cover travel and accommodation for all 100 participants. If we can't reach that, this helps us prioritize who needs it most."
- Anything else? (optional) — placeholder: "Accessibility needs, what you're hoping to get out of IOSP, etc."
- Stats consent (pre-checked): "OK to include my response in aggregated, non-identifying stats shared with sponsors and partners."

---

## Shared lists used in signup modals

**Themes (in signup modals):**
- Modular Research Components
- Funding Open Science & Open Source
- Resilient Data & PID Infrastructure
- Assessment, Evaluation & Insights

**Audience roles:**
- Researcher (faculty / PI)
- Postdoc / research staff
- Student / early-career
- Engineer / developer
- Infrastructure / platform operator
- Librarian / data steward
- Funder / program officer
- Publisher / editor
- Policy / advocacy
- Other

**Sectors:**
- Academia / university
- Research institute or national lab
- Nonprofit / NGO
- Industry / company
- Government / public sector
- Funder / philanthropy
- Independent
- Other

**Regions:**
- Africa
- Asia & Pacific
- Europe
- Latin America & Caribbean
- Middle East & North Africa
- North America

---

## Post-submit toast

**Success:** Submission received — we'll be in touch.
**Description:** Watch your inbox for a reply from contact@scios.tech.
