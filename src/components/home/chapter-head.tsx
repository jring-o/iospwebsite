import { Reveal } from "@/components/reveal";

/**
 * Chapter heading — announces a major transition between page zones
 * (e.g. leaving the event band and entering the institute story).
 * Echoes the masthead's royal gradient rule so chapters read as one motif.
 */
export function ChapterHead({
  title,
  className = "pt-24 md:pt-32",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="wrap">
        <Reveal>
          <div className="relative pb-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-royal to-transparent"
            />
            <h2 className="display m-0 text-[clamp(40px,6.5vw,88px)] text-ink">
              {title}
            </h2>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
