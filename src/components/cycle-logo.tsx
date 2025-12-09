'use client'

import { useEffect, useState } from 'react'

export function CycleLogo() {
  const [activePhase, setActivePhase] = useState(0)

  const phases = ['Identify', 'Build', 'Test', 'Repeat']

  useEffect(() => {
    // Auto-cycle through phases - interval must be longer than fade for proper crossfade
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-6 -ml-3">
      {/* Cycle Logo - Based on SciOS structure */}
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

      {/* Auto-fading phase text */}
      <div className="relative h-12 w-32 overflow-hidden">
        {phases.map((phase, index) => (
          <div
            key={phase}
            className="absolute inset-0 flex items-center"
            style={{
              opacity: activePhase === index ? 1 : 0,
              transition: activePhase === index
                ? 'opacity 800ms ease-in 400ms'  // Fade in after 400ms delay
                : 'opacity 800ms ease-out',       // Fade out immediately
            }}
          >
            <span className="font-heading text-2xl font-bold text-iosp-blue">
              {phase}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
