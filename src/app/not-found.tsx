import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-iosp-cyan/5 via-white to-iosp-teal/5 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <div className="text-8xl font-heading font-bold bg-gradient-to-r from-iosp-cyan to-iosp-teal bg-clip-text text-transparent">
            404
          </div>
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-slate-100 rounded-full">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading text-2xl font-bold mb-3 text-slate-900">
          Page Not Found
        </h1>
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-iosp-cyan to-iosp-teal text-white hover:shadow-lg transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
