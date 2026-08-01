'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  resilientDataSignupSchema,
  type ResilientDataSignupResult,
} from '@/lib/resilient-data-signup-schema'

export async function submitResilientDataSignup(
  input: unknown,
): Promise<ResilientDataSignupResult> {
  const parsed = resilientDataSignupSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  // Honeypot tripped: answer success without writing anything.
  if (data.website.trim() !== '') return { ok: true }

  const laptopOnly = data.mode === 'laptop'
  const provider =
    data.provider === 'Another provider' && data.providerOther.trim()
      ? `Other: ${data.providerOther.trim()}`
      : data.provider

  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from('resilient_data_signups').insert({
      name: data.name,
      email: data.email,
      institution: data.institution,
      field: data.field,
      location: data.location,
      mode: data.mode,
      pi_home: laptopOnly ? null : data.piHome || null,
      pi_plug: laptopOnly ? null : data.piPlug || null,
      home_internet: data.homeInternet,
      provider,
      router_access: data.routerAccess,
      anchor: data.anchor,
      dataset: data.dataset,
      dataset_what: data.dataset === 'no' ? null : data.datasetWhat || null,
      dataset_size: data.dataset === 'no' ? null : data.datasetSize || null,
      laptop: data.laptop,
      terminal: data.terminal,
      tools: data.tools,
      notes: data.notes || null,
    })
    if (error) {
      console.error('resilient_data_signups insert failed:', error)
      return {
        ok: false,
        error:
          'We couldn’t save your sign-up. Please try again or email contact@scios.tech.',
      }
    }
    return { ok: true }
  } catch (err) {
    console.error('resilient_data_signups unexpected error:', err)
    return {
      ok: false,
      error: 'Something went wrong on our end. Please try again.',
    }
  }
}
