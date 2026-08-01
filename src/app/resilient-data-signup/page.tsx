import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ResilientDataSignupForm } from '@/components/resilient-data-signup-form'
import rpiWithCheese from './rpi-with-cheese.jpg'

// Flip to false to close sign-ups by hand (planned close: after September 10).
// The page then shows a closed notice in place of the form.
const SIGNUPS_OPEN = true

export const metadata: Metadata = {
  title: 'Build a Sovereign Data Node — Sign-up',
  description:
    'Sign up for the IOSP 2026 workshop: build a sovereign data node as part of a resilient data cluster. Leiden, Oct 12–15.',
}

export default function ResilientDataSignupPage() {
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
            [ Workshop sign-up ]
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
            Run your own resilient, sovereign data storage infrastructure
          </h1>
          <p className="text-base text-ink-soft leading-relaxed max-w-2xl">
            Build a sovereign data node as part of a resilient data cluster.
            IOSP 2026, Leiden, Oct 12–15.
          </p>
        </div>

        <div className="space-y-4 text-[15px] text-ink-soft leading-relaxed mb-10 [&_strong]:font-medium [&_strong]:text-ink">
          <p>
            At IOSP in Leiden (Oct 12–15) we’re running a hands-on workshop
            where up to 20 participants each stand up their own sovereign
            data-archive server, link them together to form a researcher-owned
            network, and load them with at-risk datasets from their own fields,
            in collaboration with the data-rescue workshop that follows
            directly after. There are two ways to take part:
          </p>
          <ul className="list-none space-y-3 pl-0">
            <li className="border-l-2 border-royal/40 pl-4">
              <strong>Take-home Raspberry Pi (10 of the 20 seats)</strong> — we
              provide a Raspberry Pi with 200–500GB of storage, furnished by
              the IPFS Foundation’s Implementations Fund. A Pi is a silent
              computer the size of a small, delicious block of Vermont cheddar
              cheese. It is designed to stay on, draw minimal power, and serve
              as a maintenance-free node in a network. The 10 Pi nodes will
              link together to form Resilient Network #1.
            </li>
            <li className="border-l-2 border-royal/40 pl-4">
              <strong>Laptop node (everyone else)</strong> — you set up your
              personal laptop as a member of Resilient Network #2, using the
              same software, the same knowledge, and the same skills as the Pi
              network.
            </li>
          </ul>
          <figure className="my-8 mx-auto max-w-sm">
            <Image
              src={rpiWithCheese}
              alt="A Raspberry Pi 5 in its white case beside a block of Cabot Vermont sharp cheddar of roughly the same size"
              placeholder="blur"
              sizes="(max-width: 640px) 100vw, 384px"
              className="w-full border border-rule"
            />
            <figcaption className="mt-2 text-center text-xs text-ink-mute">
              For scale: the node, beside the block of Vermont cheddar.
            </figcaption>
          </figure>
          <p>
            Both networks are practically and nearly technically identical, and
            both hold identical copies of the data rescued later in the track.
            The only difference is the hardware: a Pi can be set up as a
            single-purpose unit, and left on a desk or in a closet for years on
            end; a laptop is your laptop… it moves with you, experiences
            regular hibernations and resets, and is used for multiple purposes.
          </p>
          <p>
            Because the Pi machines are limited, we ask anyone taking one to
            commit ahead of time to setting it up at home after the workshop.
            For most people home setup means plugging it in, and running a
            command or two on your laptop to get it set up. You will be shown
            these steps at the workshop, provided with detailed instructions to
            follow, assisted by robust agent-skills, and have open
            communication with the workshop facilitators for months after the
            workshop to help you set your Pi up at home. Once the Pi is running
            at home, it is hands-off from then on.
          </p>
          <p>The laptop network will also have these things! Though they will be slightly different.</p>
          <p>
            This workshop is limited to 20 participants. Pis will be
            distributed based on sign-up responses. Sign-ups close{' '}
            <strong>September 10</strong>; we will confirm seats and Pi
            allocations by email soon after. While the room is not
            first-come-first-serve, earlier sign-up will be a consideration
            should the room be over-booked.
          </p>
        </div>

        {SIGNUPS_OPEN ? (
          <ResilientDataSignupForm />
        ) : (
          <div className="border border-rule bg-paper-card px-6 py-10 text-center space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-royal">
              [ Sign-ups closed ]
            </div>
            <h2 className="font-serif text-2xl text-ink">
              Sign-ups for this workshop have closed.
            </h2>
            <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
              Email{' '}
              <a
                href="mailto:contact@scios.tech"
                className="underline decoration-rule underline-offset-2 hover:decoration-royal hover:text-royal transition-colors"
              >
                contact@scios.tech
              </a>{' '}
              to ask about a waitlist spot.
            </p>
          </div>
        )}

        <footer className="mt-16 pt-6 border-t border-rule space-y-4">
          <p className="text-xs text-ink-mute leading-relaxed">
            <span className="font-medium text-ink-soft">Note:</span> every node
            from both networks broadcasts a small heartbeat (“I’m alive, here’s
            my free disk space, here’s the files I’m serving”), and the
            networks’ anchors run regular spot-checks that fetch a random piece
            of the archive from a random node, confirming the data is there and
            being served. You can see what this looks like on the{' '}
            <Link
              href="/datanetwork"
              className="underline decoration-rule underline-offset-2 hover:decoration-royal hover:text-royal transition-colors"
            >
              live network dashboard
            </Link>
            . We record this data and will publish an aggregate study of how
            researcher-run infrastructure survives in the real world, including
            which type of network is still standing three months after the
            workshop. The study sees node uptime, free space, and whether each
            node still holds and serves the archive’s own datasets; it never
            sees your files, your browsing, or anything else on your machine.
          </p>
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
