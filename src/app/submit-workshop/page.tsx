import type { Metadata } from 'next'
import Link from 'next/link'
import { WorkshopForm } from '@/components/iosp-2026-workshop-form'

// Unlisted: reachable only by URL. Kept out of the nav and sitemap, and told
// not to index so it doesn't surface in search.
export const metadata: Metadata = {
  title: 'Submit a Workshop',
  description: 'Propose a workshop for IOSP 2026, Oct 12–15 in Leiden.',
  robots: { index: false, follow: false },
}

export default function SubmitWorkshopPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* slim brand header — no section nav, this page stands alone */}
      <header className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft hover:text-royal transition-colors"
          >
            Institute of Open Science Practices
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
            IOSP 2026
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="space-y-3 pb-8 mb-10 border-b border-rule">
          <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-royal">
            [ Workshop submission ]
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
            Run a workshop at IOSP 2026
          </h1>
          <p className="text-base text-ink-soft leading-relaxed max-w-2xl">
            IOSP is 75% co-design and build — the sessions are the event. Tell us what you’d run,
            who it’s for, and what you need. We read every submission as we shape the schedule for
            Oct 12–15 in Leiden.
          </p>
          <p className="text-sm text-ink-mute leading-relaxed max-w-2xl">
            Fields marked <span className="text-royal font-medium">Public</span> may appear on the
            published schedule. <span className="text-ink-soft font-medium">Private</span> fields are
            for organizers only.
          </p>
        </div>

        <WorkshopForm />

        <footer className="mt-16 pt-6 border-t border-rule">
          <p className="text-xs text-ink-mute leading-relaxed">
            Questions? Email{' '}
            <a
              href="mailto:contact@scios.tech"
              className="underline decoration-rule underline-offset-2 hover:decoration-royal hover:text-royal transition-colors"
            >
              contact@scios.tech
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  )
}
