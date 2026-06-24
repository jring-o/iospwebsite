'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { workshopSchema, type WorkshopResult } from '@/lib/iosp-2026-workshop-schema'

export async function submitWorkshop(input: unknown): Promise<WorkshopResult> {
  const parsed = workshopSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const d = parsed.data
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : null
  }

  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from('iosp_2026_workshops').insert({
      presenter_name: d.presenterName,
      email: d.email,
      affiliation: clean(d.affiliation),
      bio: clean(d.bio),
      headshot_url: clean(d.headshotUrl),
      title: d.title,
      track: d.track,
      public_description: clean(d.publicDescription),
      outcome: clean(d.outcome),
      target_audience: d.targetAudience,
      audience_requirement: clean(d.audienceRequirement),
      length: d.length,
      size: clean(d.size),
      needs_tech_facilitation: d.needsTechFacilitation,
      av_needs: d.avNeeds,
      materials_needed: clean(d.materialsNeeded),
      run_of_show: clean(d.runOfShow),
    })

    if (error) {
      console.error('iosp_2026_workshops insert failed:', error)
      return {
        ok: false,
        error: 'We couldn’t save your submission. Please try again or email contact@scios.tech.',
      }
    }
    return { ok: true }
  } catch (err) {
    console.error('iosp_2026_workshops unexpected error:', err)
    return {
      ok: false,
      error: 'Something went wrong on our end. Please try again.',
    }
  }
}
