'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-7">
      <div className="max-w-md w-full">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-royal mb-6">
          Error
        </div>
        <h1 className="font-serif font-normal text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          Something went wrong.
        </h1>
        <p className="text-ink-soft text-base leading-relaxed mb-8">
          We hit an unexpected error. Try again, or head back to the homepage.
        </p>
        <div className="flex flex-wrap items-center gap-6 border-t border-rule pt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="font-mono text-[11px] uppercase tracking-[0.18em] bg-ink text-paper px-4 py-2 hover:bg-royal-deep transition-colors"
          >
            Try again →
          </button>
          <a
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft border-b border-rule pb-0.5 hover:text-royal hover:border-royal transition-colors"
          >
            Home
          </a>
        </div>
        {error.digest && (
          <p className="mt-10 font-mono text-[10px] tracking-[0.06em] text-ink-mute">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
