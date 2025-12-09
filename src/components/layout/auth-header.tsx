import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AuthHeader() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/coming-soon">
        <Button variant="ghost">Log In</Button>
      </Link>
      <Link href="/coming-soon">
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}
