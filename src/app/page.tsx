'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { CycleLogo } from '@/components/cycle-logo'
import { IospSignupModal, type SignupKind } from '@/components/iosp-2026-signup-modal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ThemeKey = '01' | '02' | '03' | '04'

type Theme = {
  n: ThemeKey
  title: string
  desc: string
  body: string[]
  inLeiden: string
}

const THEMES: readonly Theme[] = [
  {
    n: '01',
    title: 'Modular Research Components',
    desc: 'The tools and frameworks for composable research.',
    body: [
      'Today’s research ships as monoliths: figure, method, claim, dataset, and software all welded into one PDF. Modular research components break the paper apart — every method, dataset, model, claim, and review becomes a first-class object with its own identifier, schema, and version history.',
    ],
    inLeiden: 'We’ll highlight, hack on, and extend the work already pushing this vision forward.',
  },
  {
    n: '02',
    title: 'Funding Open Science & Open Source',
    desc: 'How money moves through the open ecosystem.',
    body: [
      'Open infrastructure runs on a starvation diet. Grants reward novelty, not maintenance. Institutions reward publications, not protocols. This theme asks how money should actually move through an open ecosystem so the substrate gets built — and stays built.',
    ],
    inLeiden:
      'We’ll dig into core and satellite (funders evaluating slow, accountable cores rather than thousands of individual projects, with funds routed through cores into the satellites in their orbit), transitive funding (money that flows downstream through the dependency graph to the libraries, datasets, and methods your work actually relies on), and what funding looks like when science itself becomes modular — when the unit of work isn’t a paper but a reusable component.',
  },
  {
    n: '03',
    title: 'Resilient Data & PID Infrastructure',
    desc: 'How research data gets stored, found, and accessed — persistent identifiers, content addressing, and distributed preservation.',
    body: [
      'The substrate of open science is its identifiers, its addressing, and its preservation guarantees. When a PID rots, a dataset moves, or a registry shuts down, the citation graph silently breaks. Resilient infrastructure assumes failure: content-addressed payloads, distributed mirroring, append-only provenance, and resolvers that fall back instead of 404.',
    ],
    inLeiden:
      'We’ll convene the people already maintaining this layer, stress-test where it breaks under modular research workloads, and push the projects extending it forward.',
  },
  {
    n: '04',
    title: 'Assessment, Evaluation & Insights',
    desc: 'How we measure, verify, and understand the impact of research and the infrastructure supporting it.',
    body: [
      'JIF, h-index, and citation counts measure papers — not the things science actually depends on: replications, methods that hold up, datasets that get reused, software that doesn’t break, reviews that catch errors. As research itself becomes modular, the question gets harder: how do you evaluate a method, a dataset, a claim, or a review on its own terms?',
    ],
    inLeiden:
      'We’ll work alongside the projects rethinking assessment for a modular science world — trust signals, attestations, and verification that travel with the artifact instead of the paper around it.',
  },
]

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  )
}

function HomePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showNewsletterModal, setShowNewsletterModal] = useState(false)
  const [signupKind, setSignupKind] = useState<SignupKind>(null)
  const [activeTheme, setActiveTheme] = useState<ThemeKey | null>(null)
  const activeThemeData = activeTheme ? THEMES.find((t) => t.n === activeTheme) ?? null : null
  const [theoryOpen, setTheoryOpen] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)

  // URL → modal state. URL is the source of truth for which modal is open.
  useEffect(() => {
    const signup = searchParams.get('signup')
    setSignupKind(
      signup === 'showcase' ||
        signup === 'committee' ||
        signup === 'sponsor' ||
        signup === 'participant'
        ? signup
        : null,
    )
    const theme = searchParams.get('theme')
    setActiveTheme(
      theme === '01' || theme === '02' || theme === '03' || theme === '04' ? theme : null,
    )
    setTheoryOpen(searchParams.get('modal') === 'theory')
  }, [searchParams])

  // Set/clear a modal param. Only one modal can be open at a time, so opening
  // a new one clears the others.
  const setModalParam = (key: 'signup' | 'theme' | 'modal', value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    ;(['signup', 'theme', 'modal'] as const).forEach((k) => {
      if (k !== key) params.delete(k)
    })
    if (value === null) params.delete(key)
    else params.set(key, value)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const scrollToIosp2025 = () => {
    const element = document.getElementById('iosp-2025')
    if (!element) return
    const offset = 80
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (typeof window !== 'undefined' && timelineRef.current) {
      import('gsap').then((gsapModule) => {
        import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
          const gsap = gsapModule.default
          const ScrollTrigger = ScrollTriggerModule.default

          gsap.registerPlugin(ScrollTrigger)

          // Pin the timeline while scrolling
          ScrollTrigger.create({
            trigger: '.scroll-timeline-container',
            start: 'top top',
            end: '+=4000',
            pin: true,
            scrub: 1
          })

          // Animate all protocol paths drawing
          const paths = ['#inference-path', '#quality-path', '#engagement-path', '#coordination-path', '#preservation-path']
          paths.forEach((path) => {
            gsap.to(path, {
              strokeDashoffset: 0,
              scrollTrigger: {
                trigger: '.scroll-timeline-container',
                start: 'top top',
                end: '+=4000',
                scrub: 1
              }
            })
          })

          // Era backgrounds fade in
          gsap.to('.era-individual', {
            opacity: 0.3,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top',
              end: 'top top+=500',
              scrub: 1
            }
          })

          gsap.to('.era-preinst', {
            opacity: 0.5,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=1000',
              end: 'top top+=1500',
              scrub: 1
            }
          })

          gsap.to('.era-inst', {
            opacity: 0.6,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=2000',
              end: 'top top+=2500',
              scrub: 1
            }
          })

          gsap.to('.era-predigital', {
            opacity: 0.5,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=3000',
              end: 'top top+=3500',
              scrub: 1
            }
          })

          // Event markers appear
          gsap.to('#event-1665', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=400',
              end: 'top top+=500',
              scrub: 1
            }
          })

          gsap.to('#event-1876', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=1200',
              end: 'top top+=1300',
              scrub: 1
            }
          })

          gsap.to('#event-1945', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=2000',
              end: 'top top+=2100',
              scrub: 1
            }
          })

          gsap.to('#event-present', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=3800',
              end: 'top top+=3900',
              scrub: 1
            }
          })

          // Callout boxes fade in and out
          gsap.to('#callout-1665', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=300',
              end: 'top top+=800',
              scrub: 1,
              onEnter: () => gsap.to('#callout-1665', { opacity: 1 }),
              onLeave: () => gsap.to('#callout-1665', { opacity: 0 }),
              onEnterBack: () => gsap.to('#callout-1665', { opacity: 1 }),
              onLeaveBack: () => gsap.to('#callout-1665', { opacity: 0 })
            }
          })

          gsap.to('#callout-1876', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=1100',
              end: 'top top+=1700',
              scrub: 1,
              onEnter: () => gsap.to('#callout-1876', { opacity: 1 }),
              onLeave: () => gsap.to('#callout-1876', { opacity: 0 }),
              onEnterBack: () => gsap.to('#callout-1876', { opacity: 1 }),
              onLeaveBack: () => gsap.to('#callout-1876', { opacity: 0 })
            }
          })

          gsap.to('#callout-1945', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=1900',
              end: 'top top+=2600',
              scrub: 1,
              onEnter: () => gsap.to('#callout-1945', { opacity: 1 }),
              onLeave: () => gsap.to('#callout-1945', { opacity: 0 }),
              onEnterBack: () => gsap.to('#callout-1945', { opacity: 1 }),
              onLeaveBack: () => gsap.to('#callout-1945', { opacity: 0 })
            }
          })

          gsap.to('#callout-present', {
            opacity: 1,
            scrollTrigger: {
              trigger: '.scroll-timeline-container',
              start: 'top top+=3700',
              end: 'top top+=4000',
              scrub: 1
            }
          })
        })
      })
    }
  }, [])

  const testimonials = [
    {
      quote: "It felt like we started a movement! This [event] incorporated stakeholders and put us in a better position to build the next system for science and publishing that deliberately incorporates their needs and our values.",
      name: "Matthew Akamatsu",
      affiliation: "UW Discourse Graphs"
    },
    {
      quote: "Got out of my house and met people; great conversations; lots of creative spitballing; met with some potential funders; made new friends; made some progress on some ideas; had the opportunity to make first pitch for new project.",
      name: "Laure Haak",
      affiliation: "Mighty Red Barn"
    },
    {
      quote: "Great discussions and valuable connections that would be really hard to have in traditional academic conferences.",
      name: "Ronen Tamari",
      affiliation: "Cosmik, Astera Fellow"
    },
    {
      quote: "I gained exposure to future technologies, [while] meeting people who want to change the world of science.",
      name: "Franck Marchis",
      affiliation: "SETI Institute"
    },
    {
      quote: "Amazing intro to science/research world as someone not deeply in this space. Learned high level concepts and low level technical frameworks. As a contractor working in open source, decentralized technologies, there is simply nothing more valuable than a conference like this.",
      name: "Paul Weidner",
      affiliation: "Technologist"
    },
    {
      quote: "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of. It was thought provoking and a great networking opportunity.",
      name: "Doug Schuster",
      affiliation: "NSF NCAR"
    },
    {
      quote: "Contact with developers and representatives of OS projects. A lot of learning about the tools, projects developed and under development. Possibility to participate in new initiatives. Debates about challenges and the future.",
      name: "Edilson Damasio",
      affiliation: "Universidade Estadual de Maringá"
    },
    {
      quote: "I had the chance to meet and connect with interesting people and learn about exciting initiatives.",
      name: "Isabel Abedrapo",
      affiliation: "Remolino"
    },
    {
      quote: "Expert opinion across a range of relevant topics including challenges research libraries face when sharing data and very useful guidelines to keep in mind when rolling out new research technologies.",
      name: "Martin Karlsson",
      affiliation: "Coordination Network"
    },
    {
      quote: "I met some great people with whom I hope to collaborate in the future.",
      name: "Daniela Saderi",
      affiliation: "PREReview"
    },
    {
      quote: "The connections to others and the chance to have conversations were great.",
      name: "Beth Duckles",
      affiliation: "Organizational Mycology"
    },
  ]

  const getPrevIndex = () => (currentTestimonial - 1 + testimonials.length) % testimonials.length
  const getNextIndex = () => (currentTestimonial + 1) % testimonials.length

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced with mission */}
      <section className="relative py-24 md:py-40 gradient-primary overflow-visible">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-iosp-cyan rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-iosp-teal rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Decorative geometric shapes */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 border-4 border-white rotate-12"></div>
          <div className="absolute bottom-32 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/3 left-1/2 w-24 h-24 border-4 border-white -rotate-45"></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              Institute of Open Science Practices
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 mb-10 font-heading font-semibold animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Advancing Infrastructure for Open Science
            </p>
            <p className="text-lg md:text-xl text-white/85 mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              We connect researchers and technologists working on critical open science infrastructure.
              By coordinating collaborations, serving as first users, and sharing what we learn,
              we advance the technologies that enable open-by-default scientific practice.
            </p>
            <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                className="bg-white text-iosp-blue hover:bg-gray-100 font-bold hover:scale-105 transition-transform h-14 px-10 text-lg rounded-md"
                onClick={() => {
                  const element = document.getElementById('iosp-2026');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                IOSP 2026, October 12&ndash;15
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white/90 hover:text-white hover:bg-white/10 font-medium"
                onClick={() => {
                  const element = document.getElementById('iosp-2025');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                IOSP 2025 Recap
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {/* Tagline above scroll indicator */}
            <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-white/70 tracking-wider uppercase font-semibold">
                Build the infrastructure that makes open easy to practice
              </p>
            </div>

            {/* Scroll indicator - clickable */}
            <div
              className="block mt-6"
              onClick={() => {
                const element = document.getElementById('iosp-2026');
                if (element) {
                  const offset = 80; // Height of navbar
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <div className="animate-bounce cursor-pointer hover:text-white/80 transition-colors">
                <ChevronDown className="h-8 w-8 mx-auto text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IOSP 2026 - Announcement */}
      <section id="iosp-2026" className="py-20 md:py-28 relative overflow-hidden bg-iosp-blue text-white">
        {/* Corner atmospheric glows */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px] opacity-50 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(1,145,189,0.6), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(23,121,115,0.5), transparent 70%)' }}
        />

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Editorial masthead strip */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 pb-5 mb-12 border-b border-white/25 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/65">
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-iosp-amber animate-pulse motion-reduce:animate-none" />
                IOSP &mdash; Edition 02
              </span>
              <span className="hidden md:inline">Portgebouw &amp; GoFAIR, Leiden</span>
              <span>Oct 12&ndash;15, 2026</span>
            </div>

            {/* HERO */}
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-8 mb-14">
              <div className="md:col-span-7">
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-iosp-amber mb-5 flex items-center gap-3">
                  <span className="block w-8 h-px bg-iosp-amber" />
                  Institute of Open Science Practices
                </div>
                <h2 className="font-heading font-bold tracking-tight leading-[0.95] text-5xl md:text-7xl">
                  Leiden
                </h2>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono">
                  <div className="text-2xl md:text-3xl text-white tracking-tight">
                    12 <span className="text-iosp-amber">&rarr;</span> 15
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/65">
                    October 2026
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 md:pl-8 md:border-l md:border-white/25 flex flex-col justify-end">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/65 mb-3">
                  Venue
                </div>
                <p className="text-base leading-relaxed text-white/85">
                  <span className="text-white font-semibold">Portgebouw, University of Leiden, and GoFAIR</span>{' '}
                  host us on Oct 12, 13, and 15. On Oct 14 we field-trip to the{' '}
                  <a
                    href="https://opensciencefestival.nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-iosp-amber hover:text-iosp-amber transition-colors"
                  >
                    National Open Science Festival
                  </a>{' '}
                  in Delft, then reconvene for the final day.
                </p>
              </div>
            </div>

            {/* PRODUCTION-DRIVEN */}
            <div className="border-t border-white/25 pt-10 mb-14">
              <div className="grid md:grid-cols-12 gap-x-8 gap-y-6 items-center">
                <div className="md:col-span-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber mb-4">
                    Production-driven
                  </div>

                  {/* Stacked proportional stats — size IS the visualization */}
                  <div className="space-y-4">
                    <div className="leading-none">
                      <div className="font-heading font-bold text-xl text-white/65 tracking-tight">
                        10<span className="text-iosp-amber">%</span>
                      </div>
                      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65 leading-snug">
                        Presentations and Panels
                      </div>
                    </div>

                    <div className="leading-none">
                      <div className="font-heading font-bold text-3xl text-white/85 tracking-tight">
                        15<span className="text-iosp-amber">%</span>
                      </div>
                      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65 leading-snug">
                        Tooling Showcase
                      </div>
                    </div>

                    <div className="leading-none pt-1">
                      <div className="font-heading font-bold text-6xl md:text-7xl text-white tracking-tight">
                        75<span className="text-iosp-amber">%</span>
                      </div>
                      <div className="mt-2.5 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/65">
                        Hands-on building
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-8 md:pl-8 md:border-l md:border-white/25">
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber mb-3">
                    Less talking. More building. More collaboration.
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-white/85">
                    IOSP is a curated event designed around hands-on work, bringing tool-builders and researchers together to actively build solutions across four core themes. We cap talks at 10% of the runtime and tooling showcases at 15%, leaving the remaining 75% for hands-on production.
                  </p>

                  {/* 3 compact evidence cards under the prose — subgrid keeps dividers aligned */}
                  <div className="mt-8 mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber flex items-center gap-3">
                    <span className="block w-6 h-px bg-iosp-amber" />
                    Outcomes
                  </div>
                  <div className="grid sm:grid-cols-3 sm:grid-rows-[auto_1fr_auto] gap-3">
                    {[
                      {
                        title: 'People you couldn’t meet anywhere else',
                        body: 'Researchers and tool-builders shoulder-to-shoulder for four days. The people building infrastructure side-by-side with those using it.',
                        evidence: <><span className="text-iosp-amber font-semibold">87%</span> of participants cited facilitated networking as a core value, meeting researchers and tool-builders they otherwise wouldn’t.</>,
                      },
                      {
                        title: 'Tools and projects you didn’t know existed',
                        body: 'Discover novel infrastructure being built across the open-science ecosystem — both the high-level concepts and the technical details for putting them to work.',
                        evidence: <span className="italic">&ldquo;I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of.&rdquo;</span>,
                      },
                      {
                        title: 'Work that lives past Leiden',
                        body: (
                          <>
                            Leave with concrete collaborations.{' '}
                            <a href="https://mira.science" target="_blank" rel="noopener noreferrer" className="text-iosp-amber hover:underline font-semibold pointer-events-auto">
                              mira.science
                            </a>{' '}
                            is one direct example of a project that grew out of work begun at IOSP.
                          </>
                        ),
                        evidence: <><span className="text-iosp-amber font-semibold">80%</span> wanted to continue the work they started in workshops, taking collaborations, prototypes, and direction back to their teams.</>,
                      },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className="relative bg-white/5 border border-white/10 rounded-md p-4 sm:row-span-3 sm:grid sm:grid-rows-subgrid group transition-colors hover:bg-white/[0.08] hover:border-white/25"
                      >
                        <a
                          href="#iosp-2025"
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToIosp2025()
                          }}
                          aria-label={`View IOSP 2025 evidence: ${c.title}`}
                          className="absolute inset-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-iosp-amber"
                        />
                        <div className="relative pointer-events-none font-heading font-semibold text-white text-sm leading-snug flex items-start justify-between gap-2">
                          <span>{c.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-white/65 group-hover:text-iosp-amber group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="relative pointer-events-none text-xs text-white/85 leading-relaxed mt-2">
                          {c.body}
                        </p>
                        <div className="relative pointer-events-none border-t border-white/10 pt-2.5 mt-3">
                          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/65 mb-1">
                            From IOSP 2025
                          </div>
                          <div className="text-[11px] text-white/85 leading-relaxed">
                            {c.evidence}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FOUR THEMES */}
            <div className="border-t border-white/25 pt-10 mb-14">
              <div className="flex items-end justify-between mb-8 gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/65 mb-2">
                    Programme
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                    Four themes
                  </h3>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/65">
                  Parallel tracks
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-white/25 rounded-lg overflow-hidden">
                {THEMES.map((t) => (
                  <button
                    key={t.n}
                    type="button"
                    onClick={() => setModalParam('theme', t.n)}
                    aria-label={`Read more about ${t.title}`}
                    className="bg-iosp-blue p-6 group transition-colors duration-300 hover:bg-[#0e5174] text-left focus:outline-none focus-visible:bg-[#0e5174] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-iosp-amber"
                  >
                    <div className="flex items-start gap-4">
                      <div className="font-mono text-iosp-amber text-sm tracking-wider pt-1 min-w-[24px]">
                        {t.n}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-semibold text-white text-lg mb-2 leading-snug flex items-start justify-between gap-3">
                          <span>{t.title}</span>
                          <ArrowRight className="h-4 w-4 text-white/65 group-hover:text-iosp-amber transition-all duration-300 group-hover:translate-x-1 mt-1.5 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-white/85 leading-relaxed">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Foundation layer — the stack beneath the four themes */}
              <button
                type="button"
                onClick={() => setModalParam('modal', 'theory')}
                aria-label="Read our theory of change"
                className="mt-3 relative w-full bg-iosp-blue border border-white/25 rounded-lg overflow-hidden group transition-colors duration-300 hover:bg-[#0e5174] text-left focus:outline-none focus-visible:bg-[#0e5174] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-iosp-amber"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-iosp-amber to-transparent" />
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="md:min-w-[180px]">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber mb-2">
                      Foundation
                    </div>
                    <div className="font-heading font-semibold text-white text-xl leading-none flex items-center gap-3">
                      <span>Theory</span>
                      <ArrowRight className="h-4 w-4 text-white/65 group-hover:text-iosp-amber transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="md:border-l md:border-white/25 md:pl-8 flex-1">
                    <p className="text-sm text-white/85 leading-relaxed">
                      The conceptual thread running beneath all four themes &mdash; the questions, frameworks, and critiques that ground production work in deeper understanding of open science as a system.
                    </p>
                  </div>
                </div>
              </button>
            </div>
            {/* CTAs */}
            <div className="border-t border-white/25 pt-10">
              <div className="flex items-end justify-between mb-8 gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/65 mb-2">
                    Action
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                    Get involved
                  </h3>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/65">
                  Open calls
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-px bg-white/25 rounded-lg overflow-hidden">
                {[
                  {
                    kind: 'showcase' as const,
                    tag: 'Showcase',
                    title: 'Building a tool?',
                    desc: 'Working on tooling or infrastructure for one of the four themes? Submit it to the production showcase so we can stress-test and build on it in Leiden.',
                    action: 'Submit to the showcase',
                  },
                  {
                    kind: 'committee' as const,
                    tag: 'Committee',
                    title: 'Help organize',
                    desc: "We're opening the organizing committee — programming, logistics, outreach. The first open organizing call is May 4.",
                    action: 'Get in touch',
                  },
                  {
                    kind: 'sponsor' as const,
                    tag: 'Sponsor',
                    title: 'Become a sponsor',
                    desc: 'IOSP is free to join. Every sponsor dollar funds a travel grant — last year in Denver, sponsors brought 10 people from 5 countries.',
                    action: 'Send a participant to Leiden',
                  },
                ].map((cta) => (
                  <button
                    type="button"
                    key={cta.kind}
                    onClick={() => setModalParam('signup', cta.kind)}
                    className="bg-iosp-blue p-6 group flex flex-col text-left transition-colors duration-300 hover:bg-[#0e5174] focus:outline-none focus-visible:ring-2 focus-visible:ring-iosp-amber"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber mb-4">
                      [ {cta.tag} ]
                    </div>
                    <div className="font-heading text-lg md:text-xl font-bold mb-3 leading-tight">
                      {cta.title}
                    </div>
                    <p className="text-sm text-white/85 leading-relaxed flex-grow mb-6">
                      {cta.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white">
                        {cta.action}
                      </span>
                      <ArrowRight className="h-4 w-4 text-iosp-amber transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* REGISTER YOUR INTEREST */}
            <div className="border-t border-white/25 pt-10 mt-14">
              <div className="flex items-end justify-between mb-8 gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/65 mb-2">
                    Participate
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                    Register your interest
                  </h3>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/65">
                  Curated &middot; limited
                </span>
              </div>

              <div className="relative bg-iosp-blue border border-white/25 rounded-lg overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-iosp-amber to-transparent" />
                <div className="p-6 md:p-8 grid md:grid-cols-12 gap-x-8 gap-y-6 items-start">
                  {/* Quiet sidebar facts — last year & this year capacity */}
                  <div className="md:col-span-3 md:border-r md:border-white/25 md:pr-8 space-y-5">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/65 mb-3">
                        Last year
                      </div>
                      <div className="flex items-end gap-2 leading-none">
                        <div className="flex flex-col items-start">
                          <div className="font-mono text-2xl md:text-3xl text-white/85 tracking-tight">
                            425
                          </div>
                          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
                            Registered
                          </div>
                        </div>
                        <div className="font-mono text-2xl md:text-3xl text-iosp-amber tracking-tight pb-[18px]">
                          /
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="font-mono text-2xl md:text-3xl text-white/85 tracking-tight">
                            80
                          </div>
                          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/65">
                            Capacity
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-5 border-t border-white/10">
                      <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber mb-2">
                        This year
                      </div>
                      <div className="font-mono text-2xl md:text-3xl text-white tracking-tight leading-none">
                        100
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
                        Capacity &mdash; Leiden
                      </div>
                    </div>
                  </div>
                  {/* Copy + CTA */}
                  <div className="md:col-span-9 flex flex-col gap-5">
                    <p className="text-base md:text-lg leading-relaxed text-white/85">
                      IOSP is a curated event &mdash; registering does <span className="text-white font-semibold">not</span> guarantee a seat. Last year we received 425 registrations for an 80-person room, and we expect similar interest in Leiden.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-white/85">
                      The good news: <span className="text-white font-semibold">IOSP is free to join</span>, and every sponsorship dollar goes directly to travel grants so as many participants as possible can join us in Leiden, regardless of their financials and geographic location. Tell us you&apos;d like to participate and we&apos;ll be in touch as we work through the list.
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => setModalParam('signup', 'participant')}
                        className="inline-flex items-center gap-2 bg-iosp-amber text-iosp-blue hover:bg-iosp-amber/90 font-semibold rounded-md py-3 px-5 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-iosp-amber focus-visible:ring-offset-2 focus-visible:ring-offset-iosp-blue"
                      >
                        Register interest
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <IospSignupModal kind={signupKind} onClose={() => setModalParam('signup', null)} />

        <Dialog
          open={activeThemeData !== null}
          onOpenChange={(o) => {
            if (!o) setModalParam('theme', null)
          }}
        >
          <DialogContent>
            {activeThemeData && (
              <>
                <DialogHeader>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber flex items-center gap-3">
                    <span className="block w-6 h-px bg-iosp-amber" />
                    Theme {activeThemeData.n}
                  </div>
                  <DialogTitle>{activeThemeData.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  {activeThemeData.body.map((p, i) => (
                    <p key={i} className="text-base text-white/85 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  <div className="border-t border-white/25 pt-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber mb-3">
                      In Leiden
                    </div>
                    <p className="text-base text-white/85 leading-relaxed">
                      {activeThemeData.inLeiden}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={theoryOpen}
          onOpenChange={(o) => {
            if (!o) setModalParam('modal', null)
          }}
        >
          <DialogContent>
            <DialogHeader>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-iosp-amber flex items-center gap-3">
                <span className="block w-6 h-px bg-iosp-amber" />
                Foundation
              </div>
              <DialogTitle>Theory of change</DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              <p className="text-base text-white/85 leading-relaxed">
                How modern science gets funded, conducted, published, evaluated, and preserved was never engineered. It emerged.
              </p>
              <p className="text-base text-white/85 leading-relaxed">
                Inference, quality, engagement, coordination, and preservation are the five protocols every system of science configures on whatever substrate an era can provide. When the substrate shifts, the protocols reconfigure around it. Each new substrate, from vellum to movable type to the post to the web, has reshaped how science got funded, validated, and preserved.
              </p>
              <p className="text-base text-white/85 leading-relaxed">
                The next substrate is already being built &mdash; persistent identifiers, schemas, provenance graphs, verification protocols, execution standards, registries, funding protocols &mdash; in pieces, across many communities. The work ahead is to align efforts, and to configure their outputs so multiple systems of science can run in parallel and absorb each other&rsquo;s failures.
              </p>
              <div className="border-t border-white/25 pt-5">
                <Link
                  href="/theory"
                  className="inline-flex items-center gap-2 bg-iosp-amber text-iosp-blue hover:bg-iosp-amber/90 font-semibold px-4 py-2.5 rounded-md transition-colors group"
                  onClick={() => setModalParam('modal', null)}
                >
                  Read the full theory of change
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Section 1: What is IOSP */}
      <section id="what-is-iosp" className="py-20 md:py-28 bg-white relative" style={{ overflowX: 'hidden', overflowY: 'visible' }}>
        {/* Diagonal gradient slices */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-iosp-purple/15 via-iosp-purple/5 to-transparent -skew-x-12 transform translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-2/5 h-full bg-gradient-to-tr from-iosp-cyan/15 via-iosp-cyan/5 to-transparent skew-x-12 transform -translate-x-1/4"></div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-6 leading-tight">
                  What is IOSP?
                </h2>
                <div className="w-16 h-1 bg-iosp-purple mb-8"></div>

                <CycleLogo />
              </div>

              <div className="md:col-span-3 border-l-2 border-iosp-teal/30 pl-8">
                <div className="mb-6">
                  <p className="text-2xl font-heading font-semibold text-charcoal mb-4 leading-relaxed">
                    An Event. A Community. A Coordinating Institute.
                  </p>
                  <p className="text-xl text-charcoal leading-relaxed">
                    IOSP facilitates the advancement of critical technologies and infrastructures that enable
                    open-by-default science.
                  </p>
                </div>
                <p className="text-lg text-slate leading-relaxed mb-6">
                  We host annual events and facilitate a living community—convening a community of researchers
                  and technologists who use, support, and socialize novel infrastructure. We build our events
                  using the tools we advance from the research submission infrastructure to our note taking tools.
                </p>
                <p className="text-lg text-slate leading-relaxed">
                  Innovative infrastructure is emerging across the open science ecosystem—often independently, with parallel efforts unaware of one another.
                  IOSP provides the platform where emerging technologies showcase their progress, where working groups
                  discover complementary efforts, and where researchers connect with the tools they need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Science Should Be - Core Values */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-iosp-purple/10 to-iosp-blue/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-iosp-blue mb-8">
                Science Should Be
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <div className="text-xl md:text-2xl font-heading font-semibold text-iosp-teal">Community-Accountable</div>
                <div className="hidden md:block w-2 h-2 bg-iosp-teal rounded-full"></div>
                <div className="text-xl md:text-2xl font-heading font-semibold text-iosp-teal">Collaborative</div>
                <div className="hidden md:block w-2 h-2 bg-iosp-teal rounded-full"></div>
                <div className="text-xl md:text-2xl font-heading font-semibold text-iosp-teal">Auditable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Cycle - Explained */}
      <section className="py-20 md:py-28 bg-cloud relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Header Layout - Similar to "What is IOSP" */}
            <div className="grid md:grid-cols-5 gap-12 items-center mb-16">
              <div className="md:col-span-2">
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-6 leading-tight">
                  How IOSP Works
                </h3>
                <div className="w-16 h-1 bg-iosp-teal mb-8"></div>
              </div>

              <div className="md:col-span-3 border-l-2 border-iosp-teal/30 pl-8">
                <p className="text-xl text-charcoal leading-relaxed">
                  IOSP is a continuous, year-long operation. Annual events are checkpoints where we identify challenges and test solutions built by the open community throughout the year.
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-iosp-teal/20 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-iosp-coral tracking-wider uppercase mb-2">Ongoing</div>
                  <h3 className="font-heading text-2xl font-bold text-iosp-blue mb-4">Identify</h3>
                </div>
                <p className="text-slate leading-relaxed">
                  Through direct connections, workshops, and continuous engagement with the open science community, we identify critical gaps in infrastructure and the people and tools working to fill them.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-iosp-teal/20 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-iosp-teal tracking-wider uppercase mb-2">Annual Event</div>
                  <h3 className="font-heading text-2xl font-bold text-iosp-blue mb-4">Converge</h3>
                </div>
                <p className="text-slate leading-relaxed">
                  At our annual event, we bring together the identified players—researchers, technologists, and infrastructure builders—to showcase progress, define priorities, and align efforts around shared challenges.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-iosp-teal/20 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-iosp-blue tracking-wider uppercase mb-2">Throughout the Year</div>
                  <h3 className="font-heading text-2xl font-bold text-iosp-blue mb-4">Support</h3>
                </div>
                <p className="text-slate leading-relaxed">
                  Year-round, we provide resources, facilitate connections, and help working groups advance their solutions—turning event momentum into lasting infrastructure.
                </p>
              </div>
            </div>

            {/* Repeat - After Cards */}
            <div className="mt-16">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div>
                  <div className="mb-6">
                    <h4 className="font-heading text-2xl font-bold text-iosp-blue mb-3">Repeat</h4>
                    <div className="w-12 h-px bg-slate/30"></div>
                  </div>
                  <p className="text-xl text-charcoal leading-relaxed font-semibold max-w-2xl">
                    Every event identifies bottlenecks and next steps. Every collaboration produces working code.
                    Every year turns the key a little further.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-24 flex-shrink-0">
                    <svg viewBox="0 0 150 150" className="w-full h-full">
                      <g transform="rotate(30 75 75)">
                        {/* Circle centered at 75,75 with gap on right side */}
                        <path
                          d="M 120 100 A 55 55 0 1 1 120 50"
                          fill="none"
                          stroke="#083A52"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />

                        {/* Arrow in the gap - pointing downward */}
                        <path
                          d="M 120 70 L 125 80 L 130 70 Z"
                          fill="#177973"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2: Philosophy Quote */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-iosp-purple/10 to-iosp-blue/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <blockquote>
                <p className="text-3xl md:text-5xl font-heading font-bold text-iosp-teal leading-relaxed mb-4">
                  A thousand coordinated people, collaborating on small, achievable outputs, can raise cities.
                </p>
              </blockquote>
              <div className="flex justify-end">
                <a
                  href="https://en.wikipedia.org/wiki/Raising_of_Chicago"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate hover:text-iosp-teal transition-colors inline-flex items-center gap-1"
                >
                  Learn about the Raising of Chicago
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IT'S TIME TO BUILD SECTION - with 5th column */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-4">
                It's Time to Build
              </h3>
              <div className="w-24 h-1 bg-iosp-cyan mx-auto mb-6"></div>
              <p className="text-xl text-charcoal max-w-4xl mx-auto">
                The modern implementation of the scientific protocols were designed in a pre-digital era.
              </p>
            </div>

            {/* Timeline Table - 5 columns (with Building Now) */}
            <div className="overflow-x-auto mb-16">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-iosp-blue/20">
                    <th className="text-left p-4 font-heading text-lg text-iosp-blue">Protocol</th>
                    <th className="text-center p-4">
                      <div className="text-sm font-semibold text-slate">1665-1876</div>
                      <div className="text-xs text-slate/70 font-normal italic">Organized</div>
                    </th>
                    <th className="text-center p-4">
                      <div className="text-sm font-semibold text-slate">1876-1950</div>
                      <div className="text-xs text-slate/70 font-normal italic">Professional</div>
                    </th>
                    <th className="text-center p-4">
                      <div className="text-sm font-semibold text-slate">1950-Present</div>
                      <div className="text-xs text-slate/70 font-normal italic">Institutional</div>
                    </th>
                    <th className="text-center p-4 bg-iosp-cyan/5">
                      <div className="text-sm font-semibold text-iosp-cyan">Building Now</div>
                      <div className="text-xs text-iosp-cyan/80 font-normal italic">Digital-Native</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Protocol 1: Inference */}
                  <tr className="border-b border-slate/10 hover:bg-iosp-blue/5 transition-colors">
                    <td className="p-4">
                      <div className="font-heading font-bold text-iosp-blue">Inference</div>
                      <div className="text-xs text-slate italic">Generate, analyze, experiment</div>
                    </td>
                    <td className="p-4 text-sm text-slate text-center">Hand calculations<br/>Lab notebooks</td>
                    <td className="p-4 text-sm text-slate text-center">Institutionalized labs<br/>Standardized methods</td>
                    <td className="p-4 text-sm text-slate text-center">Unreproducible local computations<br/>Personal digital notebooks</td>
                    <td className="p-4 text-sm font-semibold text-charcoal text-center bg-iosp-cyan/5">
                      Executable narratives<br/>
                      Reproducible containers<br/>
                      Live computational environments
                    </td>
                  </tr>

                  {/* Protocol 2: Quality */}
                  <tr className="border-b border-slate/10 hover:bg-iosp-teal/5 transition-colors">
                    <td className="p-4">
                      <div className="font-heading font-bold text-iosp-teal">Quality</div>
                      <div className="text-xs text-slate italic">Verify, replicate, trust</div>
                    </td>
                    <td className="p-4 text-sm text-slate text-center">Witnessed demos<br/>Society meetings</td>
                    <td className="p-4 text-sm text-slate text-center">University seminars<br/>Laboratory replication</td>
                    <td className="p-4 text-sm text-slate text-center">Manuscript peer review<br/>Citation databases<br/>Impact factors</td>
                    <td className="p-4 text-sm font-semibold text-charcoal text-center bg-iosp-cyan/5">
                      Computational verification<br/>
                      Trust attestation
                    </td>
                  </tr>

                  {/* Protocol 3: Engagement */}
                  <tr className="border-b border-slate/10 hover:bg-iosp-purple/5 transition-colors">
                    <td className="p-4">
                      <div className="font-heading font-bold text-iosp-purple">Engagement</div>
                      <div className="text-xs text-slate italic">Connect, share, discover</div>
                    </td>
                    <td className="p-4 text-sm text-slate text-center">Letters & libraries<br/>Society proceedings</td>
                    <td className="p-4 text-sm text-slate text-center">Academic journals<br/>University presses</td>
                    <td className="p-4 text-sm text-slate text-center">Journal consolidation<br/>Digital subscriptions</td>
                    <td className="p-4 text-sm font-semibold text-charcoal text-center bg-iosp-cyan/5">
                      Object graphs<br/>
                      Curation over open research<br/>
                      Open by default
                    </td>
                  </tr>

                  {/* Protocol 4: Coordination */}
                  <tr className="border-b border-slate/10 hover:bg-iosp-coral/5 transition-colors">
                    <td className="p-4">
                      <div className="font-heading font-bold text-iosp-coral">Coordination</div>
                      <div className="text-xs text-slate italic">Credit, fund, collaborate</div>
                    </td>
                    <td className="p-4 text-sm text-slate text-center">Private patronage<br/>Named discoveries</td>
                    <td className="p-4 text-sm text-slate text-center">University positions<br/>Institutional funding</td>
                    <td className="p-4 text-sm text-slate text-center">Grant funding<br/>Tenure system<br/>h-index & citations</td>
                    <td className="p-4 text-sm font-semibold text-charcoal text-center bg-iosp-cyan/5">
                      Contribution graphs<br/>
                      Micro-attribution<br/>
                      Community-specific metrics
                    </td>
                  </tr>

                  {/* Protocol 5: Preservation */}
                  <tr className="hover:bg-iosp-cyan/5 transition-colors">
                    <td className="p-4">
                      <div className="font-heading font-bold text-iosp-cyan">Preservation</div>
                      <div className="text-xs text-slate italic">Store, access, archive</div>
                    </td>
                    <td className="p-4 text-sm text-slate text-center">Physical archives<br/>Manual copying</td>
                    <td className="p-4 text-sm text-slate text-center">Library systems<br/>Catalog standards</td>
                    <td className="p-4 text-sm text-slate text-center">DOI system<br/>Siloed repositories<br/>Lossy digital archives</td>
                    <td className="p-4 text-sm font-semibold text-charcoal text-center bg-iosp-cyan/5">
                      Content addressing<br/>
                      Distributed data hosting<br/>
                      Redundant archives
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Learn More Link */}
            <div className="text-center mt-12">
              <Link href="/theory" className="inline-flex items-center gap-2 text-iosp-blue hover:text-iosp-teal transition-colors text-lg font-semibold group">
                Learn More About How We Think About Science
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PROPOSAL A: Consolidated & Simplified (8 cards) */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-4">
                Infrastructure Emerging Across the Ecosystem
              </h3>
              <div className="w-24 h-1 bg-iosp-cyan mx-auto mb-6"></div>
              <p className="text-xl text-charcoal max-w-3xl mx-auto">
                Independent teams across the ecosystem are building components critical to a new, open technical substrate for science.
                IOSP convenes the community and provides the coordination infrastructure that enables them to connect, collaborate, and build integrated solutions together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Storage & Preservation - MERGED */}
              <div className="bg-gradient-to-br from-iosp-cyan/5 to-transparent rounded-xl p-6 border-2 border-iosp-cyan/20 relative hover:border-iosp-cyan/40 hover:shadow-lg transition-all">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-slate uppercase tracking-wide">
                    IOSP 2025
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-iosp-cyan mb-3 pr-20">Storage & Preservation</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Persistent, FAIR-compliant storage with content addressing (CIDs) • distributed archives • automated metadata • long-term preservation protocols.
                </p>
              </div>

              {/* Compute & Execution */}
              <div className="bg-white rounded-xl p-6 border border-slate/10 hover:border-iosp-blue/30 hover:shadow-lg transition-all relative">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-slate uppercase tracking-wide">
                    IOSP 2025
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-iosp-blue mb-3 pr-20">Compute & Execution</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Reproducible computational environments • container specs • execution manifests • distributed compute coordination • data visitation.
                </p>
              </div>

              {/* Validation & Trust */}
              <div className="bg-white rounded-xl p-6 border border-slate/10 hover:border-iosp-teal/30 hover:shadow-lg transition-all relative">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-slate uppercase tracking-wide">
                    IOSP 2025
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-iosp-teal mb-3 pr-20">Validation & Trust</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Automated testing • continuous replication • cryptographic proofs of correctness • provenance tracking • trust scoring • attestation models • open algorithms.
                </p>
              </div>

              {/* Knowledge Graphs & Semantics - RENAMED from Modular Research */}
              <div className="bg-gradient-to-br from-iosp-purple/5 to-transparent rounded-xl p-6 border-2 border-iosp-purple/20 relative hover:border-iosp-purple/40 hover:shadow-lg transition-all">
                <h4 className="font-heading text-xl font-semibold text-iosp-purple mb-3">Knowledge Graphs & Semantics</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Semantic registries • knowledge graphs • composable research objects • cross-platform data schemas.
                </p>
              </div>

              {/* Discovery & Communication - MERGED */}
              <div className="bg-white rounded-xl p-6 border border-slate/10 hover:border-iosp-purple/30 hover:shadow-lg transition-all relative">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-slate uppercase tracking-wide">
                    IOSP 2025
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-iosp-purple mb-3 pr-20">Discovery & Communication</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Federated search • semantic discovery • publishing APIs • event streams • collaborative review platforms • micropublishing.
                </p>
              </div>

              {/* Attribution & Credit */}
              <div className="bg-gradient-to-br from-iosp-coral/5 to-transparent rounded-xl p-6 border-2 border-iosp-coral/20 relative hover:border-iosp-coral/40 hover:shadow-lg transition-all">
                <h4 className="font-heading text-xl font-semibold text-iosp-coral mb-3">Attribution & Credit</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Contribution graphs • portable reputation • micro-attribution • transparent governance records.
                </p>
              </div>

              {/* Identity & Authentication */}
              <div className="bg-gradient-to-br from-iosp-teal/5 to-transparent rounded-xl p-6 border-2 border-iosp-teal/20 relative hover:border-iosp-teal/40 hover:shadow-lg transition-all">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-slate uppercase tracking-wide">
                    IOSP 2025
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-iosp-teal mb-3 pr-24">Identity & Authentication</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Decentralized identifiers (DIDs) • key management • authentication protocols • agent registries.
                </p>
              </div>

              {/* Funding Innovation */}
              <div className="bg-gradient-to-br from-iosp-blue/5 to-transparent rounded-xl p-6 border-2 border-iosp-blue/20 relative hover:border-iosp-blue/40 hover:shadow-lg transition-all">
                <h4 className="font-heading text-xl font-semibold text-iosp-blue mb-3">Funding Innovation</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Alternative funding models • retroactive public goods • quadratic funding • granular funding.
                </p>
              </div>

              {/* Collaboration Infrastructure */}
              <div className="bg-white rounded-xl p-6 border border-slate/10 hover:border-iosp-purple/30 hover:shadow-lg transition-all relative">
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-slate uppercase tracking-wide">
                    IOSP 2025
                  </span>
                </div>
                <h4 className="font-heading text-xl font-semibold text-iosp-purple mb-3 pr-20">Collaboration Infrastructure</h4>
                <p className="text-slate text-sm leading-relaxed">
                  Real-time coordination • federated workflows • cross-institutional projects • team science tools • shared workspaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* IOSP 2025 - Past Event Success */}
      <section id="iosp-2025" className="py-20 md:py-28 bg-cloud">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-6">
                  IOSP 2025: Building Infrastructure in Practice
                </h2>
                <p className="text-lg text-slate max-w-3xl mx-auto mb-4">
                  <span className="font-semibold">February 23-25, 2025 • Denver Museum of Nature and Science</span>
                </p>
              </div>

              {/* Intro paragraph and stats side-by-side */}
              <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                <div>
                  <p className="text-xl text-slate leading-relaxed">
                    Our inaugural event highlighted the scientific community's appetite for infrastructure that makes open science easy to practice—connecting researchers, technologists, and infrastructure builders to stress-test emerging tools in real-world settings.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    <div>
                      <div className="text-6xl font-heading font-bold text-iosp-teal mb-1">425</div>
                      <div className="text-sm uppercase tracking-wide text-slate font-semibold">Open Registrations</div>
                    </div>

                    <ArrowRight className="h-8 w-8 text-iosp-purple flex-shrink-0" />

                    <div>
                      <div className="text-6xl font-heading font-bold text-iosp-blue mb-1">80</div>
                      <div className="text-sm uppercase tracking-wide text-slate font-semibold">Curated Invitations to Participate</div>
                    </div>
                  </div>

                  <p className="text-slate text-sm leading-relaxed">
                    60-capacity venue • At capacity for both days
                  </p>
                </div>
              </div>

              {/* Event Format & Infrastructure - Side by side */}
              <div className="mt-8 border-t border-slate/10 pt-6">
                <div className="grid md:grid-cols-3 gap-x-12 gap-y-6 items-start">
                  {/* Event Format */}
                  <div className="md:border-r md:border-slate/10 md:pr-12">
                    <h4 className="font-heading text-sm font-bold text-iosp-blue mb-3 uppercase tracking-wide">Event Format</h4>
                    <div className="flex flex-col gap-2 text-sm text-slate">
                      <div>
                        <span className="font-semibold text-iosp-coral">Day 1:</span> Knowledge Dissemination
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-teal">Day 2:</span> Workshops
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-purple">Day 3:</span> Coworking Space in RiNo
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Stack - spans 2 columns */}
                  <div className="md:col-span-2">
                    <h4 className="font-heading text-sm font-bold text-iosp-blue mb-3 uppercase tracking-wide">Infrastructure Stack</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate">
                      <div>
                        <span className="font-semibold text-iosp-blue">DeSci Publish</span> • Submission & peer-review
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-blue">Silk</span> • Identity & credentials
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-blue">IPFS</span> • Content-addressed storage
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-blue">Ceramic</span> • Data interoperability
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-blue">CODEX</span> • Persistent identifiers (dPIDs)
                      </div>
                      <div>
                        <span className="font-semibold text-iosp-blue">Coordination Network</span> • AI synthesis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participant Testimonials - Interactive Carousel */}
            <div className="mb-20 relative py-20">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-iosp-blue/5 to-transparent"></div>
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-iosp-purple/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-iosp-cyan/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-4">
                    In Their Own Words
                  </h3>
                  <p className="text-lg text-slate max-w-2xl mx-auto">
                    What participants gained from IOSP 2025
                  </p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-7xl mx-auto px-4">
                  {/* Left Arrow */}
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-iosp-blue hover:text-white text-iosp-blue rounded-full p-3 shadow-lg transition-all hover:scale-110"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  {/* Testimonials Display */}
                  <div className="flex items-start justify-center gap-6 px-16">
                    {/* Left (prev) testimonial - faded */}
                    <div className="w-80 h-80 opacity-40 scale-90 transition-all duration-300 hidden md:block">
                      <Card className="border-iosp-teal/20 h-full">
                        <CardContent className="p-6 h-full flex flex-col">
                          <p className="text-sm text-slate italic flex-grow overflow-y-auto">
                            {testimonials[getPrevIndex()].quote}
                          </p>
                          <p className="text-xs text-iosp-blue font-semibold mt-4 flex-shrink-0">
                            — {testimonials[getPrevIndex()].name}, {testimonials[getPrevIndex()].affiliation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center (current) testimonial - prominent */}
                    <div className="w-96 h-80 opacity-100 scale-100 transition-all duration-300">
                      <Card className="border-iosp-teal/20 shadow-xl h-full">
                        <CardContent className="p-8 h-full flex flex-col">
                          <p className="text-base text-slate italic leading-relaxed flex-grow overflow-y-auto">
                            {testimonials[currentTestimonial].quote}
                          </p>
                          <p className="text-sm text-iosp-blue font-semibold mt-6 flex-shrink-0">
                            — {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].affiliation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right (next) testimonial - faded */}
                    <div className="w-80 h-80 opacity-40 scale-90 transition-all duration-300 hidden md:block">
                      <Card className="border-iosp-teal/20 h-full">
                        <CardContent className="p-6 h-full flex flex-col">
                          <p className="text-sm text-slate italic flex-grow overflow-y-auto">
                            {testimonials[getNextIndex()].quote}
                          </p>
                          <p className="text-xs text-iosp-blue font-semibold mt-4 flex-shrink-0">
                            — {testimonials[getNextIndex()].name}, {testimonials[getNextIndex()].affiliation}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-iosp-blue hover:text-white text-iosp-blue rounded-full p-3 shadow-lg transition-all hover:scale-110"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`rounded-full transition-all ${
                        index === currentTestimonial
                          ? 'bg-iosp-blue w-8 h-3'
                          : 'bg-iosp-blue/30 hover:bg-iosp-blue/50 w-3 h-3'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* IOSP 2025 Impact - Unified Bento Grid Collage */}
            <div className="mt-20 relative">
              {/* Large number background */}
              <div className="absolute top-0 right-0 text-[20rem] font-heading font-bold text-iosp-blue/5 leading-none select-none pointer-events-none">
                95%
              </div>

              <div className="relative z-10">
                {/* Section Header */}
                <div className="mb-16">
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-iosp-blue mb-4">
                    IOSP 2025: The Complete Picture
                  </h3>
                </div>

                {/* Unified Bento-style asymmetric grid */}
                <div className="grid md:grid-cols-12 gap-6">
                  {/* Row 1: Hero 95% stat */}
                  <div className="md:col-span-12 bg-gradient-to-br from-iosp-teal via-iosp-teal/90 to-iosp-cyan p-12 rounded-3xl text-white relative overflow-hidden group hover:scale-[1.01] transition-transform">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="text-8xl md:text-9xl font-heading font-bold mb-4">95%</div>
                      <div className="text-2xl font-heading font-semibold mb-2">Would Participate Again</div>
                      <p className="text-white/90 text-lg mb-4">
                        Nearly every single respondent said they would participate in the next IOSP
                      </p>
                      <blockquote className="text-white/80 italic text-base border-l-4 border-white/40 pl-4">
                        "I would pay to attend this event. $100 minimum."
                      </blockquote>
                    </div>
                  </div>

                  {/* Row 2: 93% + 80% stats + Movement Building tall card */}
                  <div className="md:col-span-3 bg-gradient-to-br from-iosp-purple to-iosp-purple/80 p-8 rounded-3xl text-white hover:scale-[1.01] transition-transform">
                    <div className="text-6xl font-heading font-bold mb-2">93%</div>
                    <div className="text-lg font-semibold">Would Recommend</div>
                    <p className="text-white/80 text-sm mt-2">To a colleague in their field</p>
                  </div>

                  <div className="md:col-span-3 bg-gradient-to-br from-iosp-cyan to-iosp-cyan/80 p-8 rounded-3xl text-white hover:scale-[1.01] transition-transform">
                    <div className="text-6xl font-heading font-bold mb-2">80%</div>
                    <div className="text-lg font-semibold">Continuing Work</div>
                    <p className="text-white/80 text-sm mt-2">Want to continue work started in the workshops</p>
                  </div>

                  <div className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-iosp-coral to-iosp-coral/80 rounded-3xl p-8 text-white relative overflow-hidden hover:scale-[1.01] transition-transform">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <h4 className="font-heading text-2xl font-bold mb-4">Movement Building</h4>
                      <p className="text-white/90 mb-6 flex-grow">
                        From "potential energy" to active stakeholder engagement—participants felt they were part of starting something transformative.
                      </p>
                      <blockquote className="text-white/80 italic text-sm border-l-4 border-white/40 pl-4">
                        "It felt like we started a movement!"
                      </blockquote>
                    </div>
                  </div>

                  {/* Row 3: 8+ stat + 87% stat + Quote */}
                  <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-iosp-cyan/20 hover:shadow-lg transition-all">
                    <div className="text-center">
                      <div className="text-4xl font-heading font-bold text-iosp-cyan mb-2">8+</div>
                      <div className="text-sm font-semibold text-iosp-blue mb-1">Future Organizers</div>
                      <p className="text-xs text-slate">
                        Want to participate in planning IOSP 2026
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-3 bg-white border-2 border-iosp-blue/20 rounded-3xl p-8 hover:shadow-2xl hover:border-iosp-blue/40 transition-all">
                    <div className="text-center">
                      <div className="text-6xl font-heading font-bold text-iosp-blue mb-2">87%</div>
                      <div className="text-lg font-semibold text-iosp-blue mb-2">Valued Connections</div>
                      <p className="text-slate text-sm">
                        Cited facilitated networking as a core value
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-3 p-6 flex items-center">
                    <blockquote className="text-slate italic text-sm leading-relaxed">
                      "Great discussions and valuable connections that would be really hard to have in traditional academic conferences."
                    </blockquote>
                  </div>

                  {/* Row 4: 12+ stat + Networking feature */}
                  <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-iosp-coral/20 hover:shadow-lg transition-all">
                    <div className="text-center">
                      <div className="text-4xl font-heading font-bold text-iosp-coral mb-2">12+</div>
                      <div className="text-sm font-semibold text-iosp-blue mb-1">Future Facilitators</div>
                      <p className="text-xs text-slate">
                        Are interested in facilitating sessions at future events
                      </p>
                    </div>
                  </div>

                  {/* Row 4: Networking (most valued) - wide feature */}
                  <div className="md:col-span-6 bg-gradient-to-br from-iosp-teal/10 via-iosp-teal/5 to-transparent rounded-3xl p-8 border-2 border-iosp-teal/30 relative overflow-hidden hover:border-iosp-teal/50 transition-all">
                    <div className="absolute top-4 right-4 w-32 h-32 bg-iosp-teal/5 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="mb-4">
                        <div className="text-sm text-iosp-teal font-bold uppercase tracking-wide mb-1">Most Valued</div>
                        <div className="text-2xl font-heading font-bold text-iosp-blue">Networking & Connections</div>
                      </div>
                      <p className="text-slate text-sm leading-relaxed mb-4">
                        The overwhelming standout—participants consistently highlighted the quality of facilitated connections and networking opportunities as a core value. The round tables and informal conversations enabled relationships that continue months after the event.
                      </p>
                      <blockquote className="text-slate italic text-xs border-l-4 border-iosp-teal/40 pl-4">
                        "Contact with developers and representatives of OS projects. A lot of learning about the tools, projects developed and under development. Possibility to participate in new initiatives. Debates about challenges and the future."
                      </blockquote>
                    </div>
                  </div>

                  {/* Row 5: Collaborations - large feature + Quote */}
                  <div className="md:col-span-6 bg-gradient-to-br from-iosp-purple to-iosp-purple/80 rounded-3xl p-8 text-white relative overflow-hidden hover:scale-[1.01] transition-transform">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <h4 className="font-heading text-2xl font-bold mb-3">Collaborations That Couldn't Happen Elsewhere</h4>
                      <p className="text-white/90 mb-4 text-sm">
                        Breakthrough conversations that participants "kept meaning to have over email/zoom" but needed the in-person format to materialize.
                      </p>
                      <blockquote className="text-white/70 italic text-xs border-l-4 border-white/30 pl-4">
                        "Put us in a better position to build the next system for science and publishing that deliberately incorporates [stakeholder] needs and our values."
                      </blockquote>
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-gradient-to-br from-iosp-blue/10 to-transparent rounded-3xl p-8 border border-iosp-blue/20 hover:border-iosp-blue/40 hover:shadow-lg transition-all">
                    <div className="mb-3">
                      <div className="font-heading text-xl font-bold text-iosp-blue">Quality Speakers</div>
                    </div>
                    <p className="text-slate text-sm mb-4 leading-relaxed">
                      Frequently praised for the high-caliber speaker lineup and presentation quality across diverse topics
                    </p>
                    <blockquote className="text-slate italic text-xs border-l-4 border-iosp-blue/40 pl-3">
                      "Expert opinion across a range of relevant topics including especially the challenges research libraries face when sharing data and very useful guidelines to keep in mind when rolling out new research technologies."
                    </blockquote>
                  </div>

                  <div className="md:col-span-6 bg-gradient-to-br from-iosp-coral/10 to-transparent rounded-3xl p-8 border border-iosp-coral/20 hover:border-iosp-coral/40 hover:shadow-lg transition-all">
                    <div className="mb-4">
                      <div className="font-heading text-xl font-bold text-iosp-blue">Event Structure & Facilitation</div>
                    </div>
                    <p className="text-slate text-sm mb-4 leading-relaxed">
                      The event format struck the right balance between structured content and hands-on collaboration. Workshops enabled direct engagement between researchers and builders, while Q&A panels facilitated deeper discussion. The schedule and pacing allowed for dense information sharing while maintaining engagement.
                    </p>
                    <div className="space-y-3">
                      <blockquote className="text-slate italic text-xs border-l-4 border-iosp-coral/40 pl-3">
                        "The schedule and format allowed for there to be such a dense amount of information to be shared. Amazed by this. Series of medium length talks followed by shared Q/A was great."
                      </blockquote>
                    </div>
                  </div>

                  {/* Row 6: Technology Exposure + engagement stats */}
                  <div className="md:col-span-7 bg-gradient-to-br from-iosp-blue to-iosp-blue/80 rounded-3xl p-8 text-white relative overflow-hidden hover:scale-[1.01] transition-transform">
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <h4 className="font-heading text-2xl font-bold mb-4">Technology Exposure & Adoption</h4>
                      <p className="text-white/90 text-sm mb-4">
                        Researchers discovered novel infrastructure they weren't previously aware of, learning both high-level concepts and technical implementation details.
                      </p>
                      <blockquote className="text-white/80 italic text-xs border-l-4 border-white/40 pl-4">
                        "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of."
                      </blockquote>
                    </div>
                  </div>

                  <div className="md:col-span-5 p-6 flex items-center">
                    <blockquote className="text-slate italic text-sm leading-relaxed">
                      "I gained exposure to future technologies, [while] meeting people who want to change the world of science."
                    </blockquote>
                  </div>

                  {/* Row 7: Future topics exploration */}
                  <div className="md:col-span-12 bg-white rounded-3xl p-8 border border-iosp-blue/10 hover:shadow-xl transition-all">
                    <h4 className="font-heading text-xl font-bold text-iosp-blue mb-4">
                      What Participants Want to Explore Next
                    </h4>
                    <p className="text-slate text-sm mb-6">
                      Topics that emerged from participant feedback for future IOSP events
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-iosp-teal rounded-full mt-2"></div>
                        <div>
                          <div className="font-semibold text-iosp-blue text-sm">Scaling Infrastructure</div>
                          <p className="text-xs text-slate">Models for scaling open science infrastructure</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-iosp-blue rounded-full mt-2"></div>
                        <div>
                          <div className="font-semibold text-iosp-blue text-sm">Global Collaboration</div>
                          <p className="text-xs text-slate">Bridging with the Global South</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-iosp-purple rounded-full mt-2"></div>
                        <div>
                          <div className="font-semibold text-iosp-blue text-sm">Attribution & Governance</div>
                          <p className="text-xs text-slate">Community-owned governance models</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-iosp-coral rounded-full mt-2"></div>
                        <div>
                          <div className="font-semibold text-iosp-blue text-sm">Cultural Change</div>
                          <p className="text-xs text-slate">Driving change in scientific practice</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-iosp-teal rounded-full mt-2"></div>
                        <div>
                          <div className="font-semibold text-iosp-blue text-sm">Large-Scale Data</div>
                          <p className="text-xs text-slate">Petabyte-scale decentralized storage</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-iosp-blue rounded-full mt-2"></div>
                        <div>
                          <div className="font-semibold text-iosp-blue text-sm">Modular Publishing</div>
                          <p className="text-xs text-slate">Nanopublications & discourse graphs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Participants */}
            <div className="mt-16">
              <h3 className="font-heading text-3xl font-bold text-iosp-blue mb-8 text-center">
                Speakers & Workshop Leaders
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Kathryn Knight</div>
                  <div className="text-xs text-slate">ORNL</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Beth Duckles</div>
                  <div className="text-xs text-slate">Organizational Mycology</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Sandra Gesing</div>
                  <div className="text-xs text-slate">US RSE + SGX3</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Juliane Schneider</div>
                  <div className="text-xs text-slate">PNNL</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Jonathan Starr</div>
                  <div className="text-xs text-slate">NumFOCUS & SciOS</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Gideon Nave</div>
                  <div className="text-xs text-slate">University of Pennsylvania</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Erik Schultes</div>
                  <div className="text-xs text-slate">GoFAIR Foundation</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Isabel Abedrapo</div>
                  <div className="text-xs text-slate">Remolino</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Daniela Saderi</div>
                  <div className="text-xs text-slate">PREreview</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Ellie DeSota</div>
                  <div className="text-xs text-slate">SciOS</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Doug Schuster</div>
                  <div className="text-xs text-slate">NSF NCAR</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Cornelius Ihle</div>
                  <div className="text-xs text-slate">Gipp Lab</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Laure Haak</div>
                  <div className="text-xs text-slate">Mighty Red Barn</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Philipp Koellinger</div>
                  <div className="text-xs text-slate">Vrije Universiteit Amsterdam</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Franck Marchis</div>
                  <div className="text-xs text-slate">SETI Institute</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Filipp Kramer</div>
                  <div className="text-xs text-slate">Alchemy Bio, Astera Fellow</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Dion Whitehead</div>
                  <div className="text-xs text-slate">Metapage, Astera Fellow</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Edvard Hübinette</div>
                  <div className="text-xs text-slate">DeSci Labs</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Martin Karlsson</div>
                  <div className="text-xs text-slate">Coordination Network</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Saif Haobsh</div>
                  <div className="text-xs text-slate">Fylo, Astera Fellow</div>
                </div>
                <div className="hidden lg:block"></div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Ronen Tamari</div>
                  <div className="text-xs text-slate">Cosmik, Astera Fellow</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-iosp-blue">Matthew Akamatsu</div>
                  <div className="text-xs text-slate">UW, Discourse Graphs</div>
                </div>
              </div>

              <div className="bg-iosp-blue/5 rounded-xl p-8">
                <h4 className="font-heading text-xl font-bold text-iosp-blue mb-6 text-center">
                  Planning Committee
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-iosp-blue">Jonathan Starr</div>
                    <div className="text-xs text-slate">NumFOCUS & SciOS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-iosp-blue">Ellie DeSota</div>
                    <div className="text-xs text-slate">SciOS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-iosp-blue">Franck Marchis</div>
                    <div className="text-xs text-slate">SETI Institute</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-iosp-blue">Erik Schultes</div>
                    <div className="text-xs text-slate">GoFAIR Foundation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-iosp-blue">Chris Erdmann</div>
                    <div className="text-xs text-slate">SciLifeLabs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-iosp-blue">Shady El Damaty</div>
                    <div className="text-xs text-slate">OpSci & Holonym</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            {/* CTA Section - Stay Informed */}
      <section className="py-20 md:py-28 bg-iosp-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-iosp-cyan rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-iosp-teal rounded-full blur-3xl"></div>
        </div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be the first to know about IOSP 2026 updates, new resources, and community events
          </p>
          <Button
            size="lg"
            className="bg-white text-iosp-blue hover:bg-gray-100 font-semibold"
            onClick={() => setShowNewsletterModal(true)}
          >
            Join Newsletter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNewsletterModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <button
              onClick={() => setShowNewsletterModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="font-heading text-2xl font-bold text-iosp-blue mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-slate leading-relaxed">
              We&apos;re working on building this. For now, please email{' '}
              <a
                href="mailto:contact@scios.tech"
                className="text-iosp-blue hover:underline font-semibold"
              >
                contact@scios.tech
              </a>{' '}
              to subscribe to our newsletter and stay updated on IOSP 2026 news, resources, and community events.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
