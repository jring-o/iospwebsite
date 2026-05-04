import { z } from 'zod'

// Single schema with all kind-specific fields optional, validated via superRefine.
// This shape plays cleanly with react-hook-form (no discriminated-union friction).
export const signupSchema = z
  .object({
    kind: z.enum(['showcase', 'committee', 'sponsor', 'participant']),
    name: z.string().trim().min(1, 'Name is required.').max(120),
    email: z.string().trim().toLowerCase().email('Please enter a valid email.'),
    organization: z.string().trim().max(200).optional().default(''),
    // shared across kinds — top-level `themes` column. Required for showcase, optional otherwise.
    themes: z.array(z.string()).optional().default([]),
    // Audience-fingerprint — optional on participant/showcase/committee; ignored on sponsor.
    // Roles is multi-select (people wear multiple hats); sector and region are single.
    audienceRoles: z.array(z.string()).optional().default([]),
    sector: z.string().trim().max(120).optional().default(''),
    region: z.string().trim().max(120).optional().default(''),
    // Pre-checked consent to include this response in aggregate stats shared with sponsors.
    statsConsent: z.boolean().optional().default(true),
    // showcase
    projectName: z.string().trim().max(200).optional().default(''),
    projectUrl: z.string().trim().max(500).optional().default(''),
    pitch: z.string().trim().max(1500).optional().default(''),
    // committee
    affiliation: z.string().trim().max(200).optional().default(''),
    interestAreas: z.array(z.string()).optional().default([]),
    bandwidth: z.string().trim().max(800).optional().default(''),
    // sponsor
    role: z.string().trim().max(120).optional().default(''),
    range: z.string().max(120).optional().default(''),
    message: z.string().trim().max(1500).optional().default(''),
    // participant
    needsTravelSupport: z.boolean().optional().default(false),
    notes: z.string().trim().max(800).optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.kind === 'showcase') {
      if (!data.projectName.trim()) {
        ctx.addIssue({ code: 'custom', path: ['projectName'], message: 'Project name is required.' })
      }
      if (data.themes.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['themes'], message: 'Pick at least one theme.' })
      }
      if (data.pitch.trim().length < 20) {
        ctx.addIssue({
          code: 'custom',
          path: ['pitch'],
          message: 'Give us a sentence or two so we know what you’re building.',
        })
      }
      if (!data.projectUrl.trim()) {
        ctx.addIssue({ code: 'custom', path: ['projectUrl'], message: 'Project URL or repo is required.' })
      } else if (!z.string().url().safeParse(data.projectUrl).success) {
        ctx.addIssue({ code: 'custom', path: ['projectUrl'], message: 'Please enter a valid URL.' })
      }
    }
    if (data.kind === 'committee') {
      if (data.interestAreas.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['interestAreas'], message: 'Pick at least one area.' })
      }
    }
    if (data.kind === 'sponsor') {
      if (!data.organization.trim()) {
        ctx.addIssue({ code: 'custom', path: ['organization'], message: 'Organization is required.' })
      }
      if (!data.role.trim()) {
        ctx.addIssue({ code: 'custom', path: ['role'], message: 'Your role is required.' })
      }
      if (!data.range) {
        ctx.addIssue({ code: 'custom', path: ['range'], message: 'Pick a sponsorship range.' })
      }
      if (data.themes.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['themes'], message: 'Pick at least one theme.' })
      }
      if (!data.message.trim()) {
        ctx.addIssue({ code: 'custom', path: ['message'], message: 'A short message is required.' })
      }
    }
  })

export type SignupInput = z.input<typeof signupSchema>
export type SignupParsed = z.output<typeof signupSchema>

export type SignupResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

// Map kind → which fields belong in the JSONB `details` column.
// Top-level columns hold the cross-kind concepts: `name`, `email`, `organization`, `themes`,
// and (participant-only) `needs_travel_support`.
// `organization` is "Organization" for showcase/sponsor and "Affiliation" for committee/participant.
// `themes` is "Which themes does it touch?" for showcase and "Which themes interest you?" for the rest.
export const DETAIL_FIELDS: Record<SignupParsed['kind'], readonly string[]> = {
  showcase: ['projectName', 'projectUrl', 'pitch'],
  committee: ['interestAreas', 'bandwidth'],
  sponsor: ['role', 'range', 'message'],
  participant: ['notes'],
}
