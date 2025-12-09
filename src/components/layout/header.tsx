import Link from 'next/link'
import { AuthHeader } from './auth-header'

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo - Left Section */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold text-iosp-blue">IOSP</span>
          </Link>
        </div>

        {/* Desktop Navigation - Center Section */}
        <nav className="hidden md:flex items-center justify-center space-x-6 text-sm font-medium flex-1">
          <Link href="/coming-soon" className="transition-colors hover:text-iosp-cyan">
            Events
          </Link>
          <Link href="/coming-soon" className="transition-colors hover:text-iosp-cyan">
            News
          </Link>
          <Link href="/coming-soon" className="transition-colors hover:text-iosp-cyan">
            Members
          </Link>
          <Link href="/coming-soon" className="transition-colors hover:text-iosp-cyan">
            About
          </Link>
        </nav>

        {/* Desktop Auth - Right Section */}
        <div className="flex-1 flex items-center justify-end">
          <AuthHeader />
        </div>
      </div>
    </header>
  )
}
