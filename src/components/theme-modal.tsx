"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ThemeKey = "01" | "02" | "03" | "04";

export type Theme = {
  n: ThemeKey;
  title: string;
  desc: string;
  body: string[];
  inLeiden: string;
  workshops?: string[];
};

export const THEMES: readonly Theme[] = [
  {
    n: "01",
    title: "Modular Research Components",
    desc: "The tools and frameworks for composable research.",
    body: [
      "Today's research ships as monoliths: figure, method, claim, dataset, and software all welded into one PDF. Modular research components break the paper apart — every method, dataset, model, claim, and review becomes a first-class object with its own identifier, schema, and version history.",
    ],
    inLeiden:
      "We'll highlight, hack on, and extend the work already pushing this vision forward.",
  },
  {
    n: "02",
    title: "Funding Open Science & Open Source",
    desc: "How money moves through the open ecosystem.",
    body: [
      "Open infrastructure runs on a starvation diet. Grants reward novelty, not maintenance. Institutions reward publications, not protocols. This theme asks how money should actually move through an open ecosystem so the substrate gets built — and stays built.",
    ],
    inLeiden:
      "We'll dig into core and satellite, transitive funding, and what funding research looks like when science itself becomes modular.",
  },
  {
    n: "03",
    title: "Resilient Data & Sovereign Infrastructure",
    desc: "How research data and infrastructure stay alive — persistent identifiers, distributed preservation, and systems that don't depend on a single host.",
    body: [
      "The core of research data is its identifiers, its addressing, and its preservation guarantees. Resilient infrastructure assumes domain failure, whether a server, a funding stream, an organization, or a jurisdiction. The only solution is content-addressed payloads, distributed mirroring, append-only provenance, and resolvers that cannot 404.",
      "Sovereign infrastructure adds the question of control — who decides whether a service stays up, who can pull the plug, and what happens to the data if they do. Local-first systems, self-hosted nodes, and decentralized preservation networks turn “someone else's server” into infrastructure the people who depend on it actually own.",
    ],
    inLeiden:
      "We'll convene the people already building and maintaining this layer, learn how to use it effectively, stress-test where it breaks under modular research workloads, and guide the projects extending it forward.",
    workshops: [
      "Save your discipline's at-risk data — Cornelius Ihle, University of Göttingen",
    ],
  },
  {
    n: "04",
    title: "Assessment, Evaluation, & Insights",
    desc: "How we measure, verify, and understand the impact of research and the infrastructure supporting it.",
    body: [
      "JIF, h-index, and citation counts measure papers — not the things science actually depends on: replications, methods that hold up, datasets that get reused, software that doesn't break, reviews that catch errors. As research itself becomes modular, the question gets harder: how do you evaluate a method, a dataset, a claim, or a review on its own terms?",
    ],
    inLeiden:
      "We'll work alongside the projects rethinking research assessment — trust signals, attestations, and verification that travel with the artifact instead of the paper around it.",
  },
];

type Props = {
  themeKey: ThemeKey | null;
  onClose: () => void;
};

export function ThemeModal({ themeKey, onClose }: Props) {
  const theme = themeKey ? THEMES.find((t) => t.n === themeKey) ?? null : null;
  const open = theme !== null;

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent>
        {theme && (
          <>
            <DialogHeader>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-royal flex items-center gap-3">
                <span aria-hidden="true" className="block w-6 h-px bg-royal" />
                Theme {theme.n}
              </div>
              <DialogTitle>{theme.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              {theme.body.map((p, i) => (
                <p
                  key={i}
                  className="text-[15px] text-ink-soft leading-relaxed"
                >
                  {p}
                </p>
              ))}

              <div className="border-t border-rule pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-royal mb-3">
                  In Leiden
                </div>
                <p className="text-[15px] text-ink-soft leading-relaxed">
                  {theme.inLeiden}
                </p>
              </div>

              {theme.workshops && theme.workshops.length > 0 && (
                <div className="border-t border-rule pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-royal mb-3">
                    Workshops
                  </div>
                  <ul className="space-y-2">
                    {theme.workshops.map((w, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[15px] text-ink-soft leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="text-royal font-mono shrink-0 mt-1 leading-none"
                        >
                          →
                        </span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
