export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-7">
      <div className="max-w-md w-full">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-royal mb-6">
          404
        </div>
        <h1 className="font-serif font-normal text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          Page not found.
        </h1>
        <p className="text-ink-soft text-base leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist. IOSP lives at the home page.
        </p>
        <div className="border-t border-rule pt-6">
          <a
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] bg-ink text-paper px-4 py-2 inline-block hover:bg-royal-deep transition-colors"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  )
}
