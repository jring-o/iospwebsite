"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function TheoryModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent>
        <DialogHeader>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-royal flex items-center gap-3">
            <span aria-hidden="true" className="block w-6 h-px bg-royal" />
            Foundation
          </div>
          <DialogTitle>Theory of change</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-[15px] text-ink-soft leading-relaxed">
            How modern science gets funded, conducted, published, evaluated,
            and preserved was never engineered. It emerged.
          </p>
          <p className="text-[15px] text-ink-soft leading-relaxed">
            Inference, quality, engagement, coordination, and preservation
            are the five protocols every system of science configures on
            whatever substrate an era can provide. When the substrate shifts,
            the protocols reconfigure around it. Each new substrate, from
            vellum to movable type to the post to the web, has reshaped how
            science got funded, validated, and preserved.
          </p>
          <p className="text-[15px] text-ink-soft leading-relaxed">
            The next substrate is already being built — persistent
            identifiers, schemas, provenance graphs, verification protocols,
            execution standards, registries, funding protocols — in pieces,
            across countless communities. The work ahead is to align efforts, and
            to configure their outputs toward the production of a shared technical substrate that endables
            a plurality of scientific systems — governance, incentive, assessment — to run in
            parallel, amplifying one another&rsquo;s strengths, and absorbing one another&rsquo;'s failures.
          </p>
          <p className="text-[15px] text-ink-soft leading-relaxed">The future is antifragile.</p>

          <div className="pt-4 mt-2 border-t border-rule">
            <a
              href="#build"
              onClick={onClose}
              className="inline-flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-royal no-underline"
            >
              <span className="font-serif italic text-[16px] tracking-normal normal-case transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
              Read more about our theory
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
