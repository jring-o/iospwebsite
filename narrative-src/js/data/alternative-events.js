/**
 * Alternative Events Data (1950-2040)
 * Events for the alternative timeline showing Corporate, Benefactor, and Pluralist systems
 */

export const alternativeEventsData = [
  {
    year: 1950,
    title: 'National Science Foundation Created',
    description: 'NSF establishes the first comprehensive system for funding, validating, disseminating, coordinating, and preserving scientific knowledge in the post-war era.',
    affects: ['Coordination', 'Engagement', 'Quality', 'Preservation', 'Inference'],
    type: 'simple',
    system: 'institutional',
    startsSystem: {
      name: 'Institutional Science System',
      tagline: 'Protocols Become Global Infrastructure',
      overview: 'Federal funding transforms science at scale. The creation of NSF (1950) and expansion of NIH establish stable, large-scale public funding—replacing the fragmented systems of previous eras. The five protocols, which first emerged together in Organized Science and professionalized over the following century, now become integrated into a self-reinforcing global system: federal grants fund research → peer review validates claims → journals disseminate findings → citations allocate credit → tenure rewards productivity. This configuration achieves immense success and global dominance—but it was never intentionally designed. It emerged organically. Now it faces mounting stress from challenges it wasn\'t built to handle.',
      configuration: {
        dominant: 'Quality + Coordination (depends on citations, moves slowly)',
        values: 'Academic credit, prestige, reputation',
        timeline: 'Very slow (3-5 year projects, 6-7 year tenure)',
        access: 'Restricted (paywalls, subscription journals)',
        metrics: 'Citations, h-index, journal Impact Factor, tenure, grants'
      },
      technicalSubstrate: 'PDF and web publishing; email and HTTP/HTTPS; DOIs and ORCIDs for persistent identification; XML metadata schemas (Dublin Core, JATS); citation databases (Web of Science, Scopus, Google Scholar); preprint servers (arXiv, bioRxiv); institutional authentication (Shibboleth); publisher platforms; data repositories (Zenodo, Figshare); version control (Git); federal grant systems (NSF, NIH); bibliometric indices (Impact Factor, h-index); formalized peer review infrastructure; cloud computing',
      problem: 'Bearing too much weight; stressed by reproducibility crisis, funding scarcity, fraud, monopoly pricing'
    },
    protocolEffects: {
      'Inference': 'Federal grants fund hypothesis-driven research at universities',
      'Quality': 'Peer review by academic experts determines validity',
      'Engagement': 'Academic journals disseminate findings to researcher communities',
      'Coordination': 'Grant cycles and tenure systems coordinate researcher incentives',
      'Preservation': 'University libraries and journal archives preserve the record'
    }
  },
  {
    year: 1969,
    title: 'ARPANET First Connection',
    description: 'The first message sent over ARPANET, creating a decentralized network that prioritized resilience over central control.',
    affects: ['Engagement'],
    type: 'simple',
    system: 'pluralist',
    startsEra: {
      name: 'Networked Technical Substrate',
      years: '1969-1999',
      substrate: 'Packet switching, TCP/IP protocols, distributed network architecture (ARPANET 1969), email (SMTP), FTP, Telnet, DNS, UNIX operating system, C programming language, open source movement (GNU 1983, Linux 1991), World Wide Web (1991), HTTP/HTTPS, distributed version control concepts',
      overview: 'Networked computing infrastructure emerges, enabling decentralized communication and collaboration. A technical substrate for digital systems begins to form. The system operates independently on mostly isolated infrastructure.'
    },
    protocolEffects: {
      'Engagement': 'Demonstrated that peer-to-peer networks could enable communication without central authority'
    }
  },
  {
    year: 1976,
    title: 'Genentech Founded',
    description: 'First venture capital-backed biotech startup (Boyer & Swanson), pioneering the VC-corporate science model.',
    affects: ['Coordination'],
    type: 'simple',
    system: 'corporate',
    protocolEffects: {
      'Coordination': 'Venture capital funding model for science-based startups'
    }
  },
  {
    year: 1980,
    title: 'Genentech IPO',
    description: 'Spectacular IPO becomes organizational model for hundreds of biotech startups. Corporate Science System emerges.',
    affects: ['Coordination', 'Engagement', 'Preservation', 'Quality', 'Inference'],
    type: 'simple',
    system: 'corporate',
    startsSystem: {
      name: 'Corporate Science System',
      tagline: 'A Second Configuration Emerges',
      overview: 'A second complete system emerges with a radically different configuration of the five protocols—VC and corporate funding instead of grants, patents in addition to journals, FDA approval instead of peer review alone, trade secrets instead of open publication. Catalyzed by Genentech IPO (1980) creating organizational model for biotech startups. Optimized for rapid translation to products and profit.',
      configuration: {
        dominant: 'Inference + Coordination (speed, profit, secrecy)',
        values: 'Commercial translation, financial returns, market dominance',
        timeline: 'Fast (<1 year cycles, quarterly milestones)',
        access: 'Highly restricted (trade secrets, delayed publication)',
        metrics: 'FDA approvals, patents, valuations, IPO/acquisition, revenue'
      },
      technicalSubstrate: 'Proprietary databases and internal knowledge management; trade secret document systems; FDA regulatory platforms (eCTD, CDER); patent databases and IP management; closed clinical trial registries; proprietary analytics and drug discovery platforms; siloed data lakes with restricted access; walled authentication systems incompatible with open infrastructure',
      difference: 'Less focus on citations; optimizes for speed over academic credit; validation through translation, not peer review alone'
    },
    protocolEffects: {
      'Coordination': 'VC funding + stock options + IP licensing creates coherent funding model',
      'Engagement': 'IPOs and public markets finance corporate research',
      'Preservation': 'Patents, regulatory filings, trade secrets as systematic preservation',
      'Quality': 'FDA regulatory approval + peer review + patent scrutiny',
      'Inference': 'Startup model enables rapid iteration and risk-taking'
    }
  },
  {
    year: 1983,
    title: 'GNU Project Founded',
    description: 'Richard Stallman launches the GNU Project, establishing the free software movement and creating an alternative to proprietary software.',
    affects: ['Preservation'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Preservation': 'Enshrined the right to access, modify, and redistribute software as fundamental freedoms'
    }
  },
  {
    year: 1991,
    title: 'Linux Kernel Released',
    description: 'Linus Torvalds releases Linux under a free license, demonstrating that collaborative development can rival corporate models.',
    affects: ['Coordination'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Coordination': 'Proved that thousands of distributed contributors could coordinate complex systems without hierarchical management'
    }
  },
  {
    year: 1998,
    title: 'Open Source Initiative',
    description: 'The Open Source Initiative formalizes transparent peer review and collaborative quality assurance as an alternative to traditional gatekeeping.',
    affects: ['Quality'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Quality': 'Many eyes make bugs shallow - transparent code review replaced closed editorial processes'
    }
  },
  {
    year: 2000,
    title: 'CrossRef DOI System',
    description: 'CrossRef launches persistent digital identifiers (DOIs) for scholarly literature, enabling machine-resolvable linking between digital research objects.',
    affects: ['Preservation', 'Engagement', 'Inference'],
    type: 'simple',
    system: 'institutional',
    startsEra: {
      name: 'Digitized Technical Substrate',
      years: '2000-2024',
      tagline: 'Analog Processes Digitized—But Not Redesigned',
      substrate: 'Persistent identifiers (DOIs, ORCIDs, RORs); HTTP/HTTPS and REST APIs; XML metadata schemas (Dublin Core, JATS, DataCite); relational databases with web frontends; PDF as digital paper; email replacing postal mail; web forms replacing paper forms; citation databases (Web of Science, Scopus, Google Scholar); institutional authentication (Shibboleth, ORCID OAuth); version control (Git); cloud infrastructure emerging',
      overview: 'Analog processes are digitized but not redesigned. PDFs replace paper journals, email replaces postal mail, web forms replace paper forms—but the underlying workflows remain unchanged. Digital facsimiles of physical artifacts, not digital-native infrastructure.',
      status: 'The three systems\' technical infrastructure are beginning to diverge. Without intentional design of a shared technical substrate, fragmentation risks acceleration.',
    },
    protocolEffects: {
      'Preservation': 'Digital identifiers enable digital resolvability',
      'Engagement': 'Digital dissemination',
      'Inference': 'Computational research'
    }
  },
  {
    year: 2001,
    title: 'Wikipedia Launched',
    description: 'Wikipedia proves that collaborative knowledge building can work at massive scale without traditional editorial hierarchies.',
    affects: ['Engagement'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Engagement': 'Demonstrated that open editing and consensus-building could produce reliable knowledge at internet scale'
    }
  },
  {
    year: 2002,
    title: 'Budapest Open Access Initiative',
    description: 'Foundations begin requiring open access to research outputs.',
    affects: ['Engagement', 'Preservation'],
    type: 'simple',
    system: 'benefactor',
    protocolEffects: {
      'Engagement': 'Mandated public access to foundation-funded research',
      'Preservation': 'Open repositories for permanent public access'
    }
  },
  {
    year: 2005,
    title: 'Git Version Control',
    description: 'Git introduces distributed version control, enabling coordination without central authority.',
    affects: ['Preservation', 'Coordination'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Preservation': 'Every clone is a complete backup - no single point of failure for code history',
      'Coordination': 'Branches and merges enabled parallel development without requiring permission or coordination overhead'
    }
  },
  {
    year: 2008,
    title: 'Bitcoin & Blockchain',
    description: 'Bitcoin introduces blockchain technology, demonstrating trustless coordination through cryptographic proof rather than institutional authority.',
    affects: ['Coordination'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Coordination': 'Replaced trusted intermediaries with cryptographic consensus - coordination without central control'
    }
  },
  {
    year: 2008,
    title: 'GitHub Launches',
    description: 'GitHub combines version control with social features, creating new models for collaborative engagement and code preservation.',
    affects: ['Engagement', 'Preservation'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Engagement': 'Social coding - forks, stars, and pull requests created new forms of scientific collaboration',
      'Preservation': 'Decentralized hosting ensured no single entity could remove or censor code'
    }
  },
  {
    year: 2014,
    title: 'IPFS Protocol',
    description: 'The InterPlanetary File System introduces content-addressed storage, making data preservation independent of specific servers or institutions.',
    affects: ['Preservation'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Preservation': 'Content addressing means data is identified by what it is, not where it is - permanent and location-independent'
    }
  },
  {
    year: 2015,
    title: 'Ethereum Smart Contracts',
    description: 'Ethereum extends blockchain with programmable contracts, enabling complex coordination without intermediaries.',
    affects: ['Coordination'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Coordination': 'Programmable rules executed automatically - funding, attribution, and governance without human gatekeepers'
    }
  },
  {
    year: 2015,
    title: 'Chan Zuckerberg Initiative',
    description: '$10B+ commitment to cure all diseases by century\'s end, with open science mandates.',
    affects: ['Coordination', 'Engagement'],
    type: 'simple',
    system: 'benefactor',
    protocolEffects: {
      'Coordination': 'Mega-foundation scale enabling long-term research programs',
      'Engagement': 'Required preprints and open source software'
    }
  },
  {
    year: 2017,
    title: 'Gates Foundation Open Access Policy',
    description: 'Strict policy requiring preprints, open access, data sharing. Benefactor Science System emerges.',
    affects: ['Engagement', 'Preservation', 'Quality', 'Coordination', 'Inference'],
    type: 'simple',
    system: 'benefactor',
    startsSystem: {
      name: 'Benefactor Science System',
      tagline: 'A Third Configuration Emerges',
      overview: 'A third complete system emerges, distinguished by mandatory openness requirements. Mega-foundations (Gates, Chan Zuckerberg, Wellcome) reconfigure the protocols—requiring preprints before review, mandating data sharing, demanding open source code—creating an alternative to both closed corporate and slow institutional models. Optimized for mission-driven science with radical transparency.',
      configuration: {
        dominant: 'Engagement + Preservation (radical openness, public access)',
        values: 'Mission impact, accessibility, transparency, equity',
        timeline: 'Varies by mission (some long-term, some rapid)',
        access: 'Fully open (mandated preprints, no APCs, open data)',
        metrics: 'Mission impact, public reach, open compliance, community benefit'
      },
      technicalSubstrate: 'Preprint servers (bioRxiv, medRxiv, arXiv); open repositories (Zenodo, Figshare, Dryad); open source code platforms (GitHub, GitLab); FAIR data principles and open data mandates; CC-BY licensing requirements; open access publishing with no APCs; ORCID integration; open grant databases and transparency requirements',
      policies: {
        gates: 'We will not pay any APCs. APCs are not equitable.',
        astera: 'Complete prohibition on journal publications. We\'ve opted out.'
      },
      rebellion: 'Intentionally moving away from the journal system; forcing alternative infrastructure adoption'
    },
    protocolEffects: {
      'Engagement': 'Mandatory public preprints before peer review',
      'Preservation': 'Required data sharing and open source mandates',
      'Quality': 'Transparent peer review with public preprints',
      'Coordination': 'Foundation grants with systematic open science requirements'
    }
  },
  {
    year: 2020,
    title: 'Decentralized Identity Standards',
    description: 'W3C standardizes Decentralized Identifiers (DIDs), enabling identity and attribution without central registries.',
    affects: ['Coordination'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Coordination': 'Self-sovereign identity - researchers control their own credentials and reputation across systems'
    }
  },
  {
    year: 2022,
    title: 'Large Language Models',
    description: 'ChatGPT and similar models demonstrate AI-assisted inference at scale, pointing toward new forms of knowledge generation.',
    affects: ['Inference'],
    type: 'simple',
    system: 'pluralist',
    protocolEffects: {
      'Inference': 'AI assists in hypothesis generation, literature review, and experimental design - augmenting human reasoning'
    },
    startsEra: {
      name: 'Polyscientric Research System',
      isGoal: true,
      years: '2035+',
      tagline: 'Unlimited Configurations Emerge on Shared Technical Substrate',
      overview: 'Unlimited new configurations of the scientific protocols emerge and are built with intentionality. Speed-optimized systems validate findings within hours. Tournament systems drive competitive replication. Citizen swarm systems coordinate millions of micro-contributors. AI-hybrid systems integrate human and machine reasoning. Commons systems make all outputs public goods from inception. Monastic systems pursue decade-scale deep investigation.',
      emergence: 'These are illustrative examples. The actual diversity will be far greater as communities design systems that embody and serve their specific needs and values.',
      antifragility: 'As one system stutters or fails, others thrive. No single point of failure. Science becomes antifragile through plurality.'
    }
  },
  {
    year: 2025,
    type: 'era',
    startsEra: {
      name: 'The Digitalization Decade',
      years: '2025-2035',
      tagline: 'Building Digital-Native Infrastructure',
      overview: 'The next decade is about building the shared technical substrate—the shared machine layer enabling multiple scientific systems to interoperate. The work ahead is vast: building the identifiers, schemas, provenance graphs, verification protocols, and execution standards that make interoperability possible. Some groups are already building pieces of this infrastructure across different contexts. Coordination of these efforts toward a unified vision is essential to completing the substrate. Once built, the substrate enables diverse systems to verify each other\'s claims, share provenance, and build on collective knowledge—even as each system configures the five protocols differently through distinct governance, incentives, and quality thresholds. This plurality creates antifragility: when one system stutters or fails, others carry the weight. As pressure increases on the whole, variety emerges to meet it. Science becomes resilient through many systems, not one.',
      workAhead: {
        'Identifiers': 'Globally unique, resolvable PIDs for all artefacts, including data, code, models, claims, reviews, methods',
        'Schemas & Types': 'Canonical object models; content-addressed payloads; semantic registries',
        'Provenance Graph': 'Append-only lineage with versioning and cryptographic linking',
        'Verification Protocols': 'Test-harness specs, attestation formats, result capsules',
        'Execution & Packaging': 'Container/image specs; reproducible environments; build manifests',
        'APIs & Eventing': 'Query/submit/subscribe interfaces; audit logs; change feeds',
        'Access & Integrity': 'Authn/authz, key management, signatures, timestamping',
        'Registries/Resolvers': 'Discovery indices, CID resolvers, capability catalogs'
      }
    }
  }
];
