'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  signupSchema,
  DETAIL_FIELDS,
  type SignupResult,
} from '@/lib/iosp-2026-signup-schema'

export async function submitIospSignup(input: unknown): Promise<SignupResult> {
  const parsed = signupSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data
  const fields = DETAIL_FIELDS[data.kind]
  const details: Record<string, unknown> = {}
  for (const f of fields) {
    const v = (data as unknown as Record<string, unknown>)[f]
    // Skip empty strings and empty arrays in the JSONB payload.
    if (v === '' || (Array.isArray(v) && v.length === 0)) continue
    details[f] = v
  }

  // For committee/participant the form asks for "Affiliation" — store it in the same
  // top-level `organization` column so a single query covers all kinds.
  const organizationSource =
    data.kind === 'committee' || data.kind === 'participant'
      ? data.affiliation
      : data.organization
  const organization = organizationSource?.trim() || null

  // Audience-fingerprint fields are only collected on non-sponsor forms.
  const audienceRoles =
    data.kind !== 'sponsor' ? (data.audienceRoles ?? []) : []
  const sector = data.kind !== 'sponsor' ? data.sector?.trim() || null : null
  const region = data.kind !== 'sponsor' ? data.region?.trim() || null : null

  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from('iosp_2026_signups').insert({
      kind: data.kind,
      name: data.name,
      email: data.email,
      organization,
      themes: data.themes ?? [],
      needs_travel_support: data.kind === 'participant' ? Boolean(data.needsTravelSupport) : false,
      roles: audienceRoles,
      sector,
      region,
      stats_consent: data.statsConsent !== false,
      details,
    })
    if (error) {
      console.error('iosp_2026_signups insert failed:', error)
      return {
        ok: false,
        error: 'We couldn’t save your submission. Please try again or email contact@scios.tech.',
      }
    }
    return { ok: true }
  } catch (err) {
    console.error('iosp_2026_signups unexpected error:', err)
    return {
      ok: false,
      error: 'Something went wrong on our end. Please try again.',
    }
  }
}
