import { z } from 'zod'

// Workshop submissions for IOSP 2026. One schema, validated via superRefine.
// Mirrors the signup-schema shape so the server action / form stay consistent.

// The four IOSP 2026 themes — these are the "Track" options. The scrappy CSV used
// working codenames (Resilient and Sovereign Data, Modular research, Funding, VOWELS);
// these are the canonical, public-facing theme titles they map to. VOWELS is the
// acronym for Assessment, Evaluation, Insights, Observability, & Utility (A-E-I-O-U)
// and is surfaced as the public brand on the site; the full name is the stored value.
export const TRACKS = [
  'Modular Research Components',
  'Funding Open Science & Open Source',
  'Resilient Data & Sovereign Infrastructure',
  'Assessment, Evaluation, Insights, Observability, & Utility',
] as const

// Session length. Plan for 1.5h; a 3h slot is offered only if the schedule allows.
export const LENGTHS: ReadonlyArray<{ value: string; label: string }> = [
  { value: '45m', label: '45 minutes' },
  { value: '1.5h', label: '1.5 hours' },
  { value: '3h', label: '3 hours (if space allows)' },
]

// Target headcount. Free-ish buckets matching the examples in the planning sheet.
export const SIZES = ['~8 (intensive / hands-on)', '~30', '50–100'] as const

// Who the workshop is for (multi-select).
export const TARGET_AUDIENCES = [
  'Technologists',
  'Researchers',
  'Funders',
  'Publishers',
  'Other',
] as const

// How much prior knowledge a participant needs (single-select).
export const AUDIENCE_REQUIREMENTS = ['Anyone', 'Technical'] as const

// A/V the room needs (multi-select). The big room provides a mic automatically.
// "Other" reveals a free-text field for anything not listed.
export const AV_NEEDS = ['Projector', 'HDMI-to-USB-C adaptor', 'Audio', 'Other'] as const

export const workshopSchema = z
  .object({
    // --- Presenter ---
    presenterName: z.string().trim().min(1, 'Your name is required.').max(120),
    email: z.string().trim().toLowerCase().email('Please enter a valid email.'),
    affiliation: z.string().trim().max(200).optional().default(''),
    bio: z.string().trim().max(1200).optional().default(''),
    // Public URL of an uploaded headshot, or a link the submitter pasted.
    headshotUrl: z.string().trim().max(1000).optional().default(''),
    // Optional co-presenters / co-leads for jointly-run sessions. Empty rows are
    // dropped server-side; per-row email is validated only when non-empty.
    coPresenters: z
      .array(
        z.object({
          name: z.string().trim().max(120).optional().default(''),
          email: z.string().trim().max(320).optional().default(''),
          affiliation: z.string().trim().max(200).optional().default(''),
        }),
      )
      .optional()
      .default([]),

    // --- Session (public-facing unless noted) ---
    title: z.string().trim().min(1, 'A session title is required.').max(200),
    track: z.string().trim().min(1, 'Pick a track.').max(120),
    publicDescription: z.string().trim().max(2000).optional().default(''),
    outcome: z.string().trim().max(1500).optional().default(''),
    targetAudience: z.array(z.string()).optional().default([]),
    audienceRequirement: z.string().trim().max(60).optional().default(''),
    // Surfaced only when audienceRequirement is "Technical": technical in what?
    audienceRequirementDetail: z.string().trim().max(300).optional().default(''),

    // --- Logistics ---
    length: z.string().trim().min(1, 'Pick a session length.').max(40),
    size: z.string().trim().max(60).optional().default(''),
    needsTechFacilitation: z.boolean().optional().default(false),
    avNeeds: z.array(z.string()).optional().default([]),
    // Free-text shown when "Other" is picked in avNeeds.
    avNeedsOther: z.string().trim().max(300).optional().default(''),
    materialsNeeded: z.string().trim().max(1500).optional().default(''),
    // Private — organizers only, never shown publicly.
    runOfShow: z.string().trim().max(4000).optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (!TRACKS.includes(data.track as (typeof TRACKS)[number])) {
      ctx.addIssue({ code: 'custom', path: ['track'], message: 'Pick one of the listed tracks.' })
    }
    if (data.publicDescription.trim().length < 20) {
      ctx.addIssue({
        code: 'custom',
        path: ['publicDescription'],
        message: 'Give us a couple of sentences participants will read.',
      })
    }
    if (data.outcome.trim().length < 10) {
      ctx.addIssue({
        code: 'custom',
        path: ['outcome'],
        message: 'Tell us what participants walk away with.',
      })
    }
    if (data.targetAudience.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['targetAudience'],
        message: 'Pick at least one target audience.',
      })
    }
    data.coPresenters.forEach((cp, i) => {
      if (cp.email && !z.string().email().safeParse(cp.email).success) {
        ctx.addIssue({
          code: 'custom',
          path: ['coPresenters', i, 'email'],
          message: 'Enter a valid email or leave blank.',
        })
      }
    })
  })

export type WorkshopInput = z.input<typeof workshopSchema>
export type WorkshopParsed = z.output<typeof workshopSchema>

export type WorkshopResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
