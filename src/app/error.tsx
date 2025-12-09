'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-iosp-coral/5 via-white to-iosp-amber/5 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-iosp-coral/10 rounded-full">
            <AlertTriangle className="h-8 w-8 text-iosp-coral" />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading text-2xl font-bold mb-3 text-slate-900">
          Something Went Wrong
        </h1>
        <p className="text-slate-600 mb-8">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            size="lg"
            className="bg-gradient-to-r from-iosp-cyan to-iosp-teal text-white hover:shadow-lg transition-all"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>

        {/* Error ID for support */}
        {error.digest && (
          <p className="mt-8 text-xs text-slate-400">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
