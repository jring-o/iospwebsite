import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Construction } from 'lucide-react'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-iosp-cyan/10 via-white to-iosp-teal/10 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-iosp-cyan to-iosp-teal rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-iosp-cyan to-iosp-teal p-6 rounded-full">
              <Construction className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-iosp-cyan to-iosp-teal bg-clip-text text-transparent">
            Coming Soon
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          We're working hard to bring you this page. Check back soon for updates!
        </p>

        {/* Additional Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-iosp-cyan/20 mb-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            In the meantime, explore our home page to learn more about IOSP, our mission,
            and how we're building the infrastructure that makes open science easy to practice.
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/">
          <Button size="lg" className="bg-gradient-to-r from-iosp-cyan to-iosp-teal text-white hover:shadow-lg hover:scale-105 transition-all">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="h-2 w-2 bg-iosp-cyan rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="h-2 w-2 bg-iosp-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-2 w-2 bg-iosp-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}
