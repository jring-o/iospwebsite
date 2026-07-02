import { Mark } from "@/components/mark";

export function SiteFooter() {
  return (
    <footer className="pb-14 pt-8" data-screen-label="10 Footer">
      <div className="wrap">
        <div className="border-t border-rule pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
            <span className="inline-flex items-center gap-3 text-ink">
              <Mark size={16} arcColor="var(--ink)" arrowColor="var(--royal)" />
              Institute of Open Science Practices
            </span>
            <span>Founded 2024</span>
          </div>
          <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
            <a
              href="mailto:contact@scios.tech"
              className="no-underline transition-colors duration-500 ease-spring hover:text-royal"
            >
              contact@scios.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
