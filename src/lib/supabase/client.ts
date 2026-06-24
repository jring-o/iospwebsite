import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

// Browser-side client, used for direct uploads to public storage buckets
// (e.g. workshop headshots). Reads the same NEXT_PUBLIC_* env the server uses.
export function getSupabaseBrowserClient(): SupabaseClient {
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in environment.',
    )
  }
  cached = createBrowserClient(url, key)
  return cached
}
