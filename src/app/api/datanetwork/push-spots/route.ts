import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Spot-check ingest for the /datanetwork dashboard: results of the observer's
// tier-3 retrieval probes (one specific member made to serve a real block).
// Guarded by the same bearer token as the heartbeat/pin pushes; writes with
// the secret key because the table has no public write policies.

export const dynamic = 'force-dynamic'

const rowSchema = z.object({
  checked_at: z.string().min(10),
  cluster: z.enum(['iosp-nodes', 'iosp-laptops']),
  cid: z.string().min(10).max(100),
  name: z.string().max(200).optional().nullable(),
  target_peer: z.string().min(10).max(100),
  target_name: z.string().min(1).max(60),
  ok: z.boolean(),
  elapsed_ms: z.number().int().min(0).max(600000).optional().nullable(),
})
const bodySchema = z.array(rowSchema).min(1).max(500)

export async function POST(request: Request) {
  const token = process.env.DATANETWORK_PUSH_TOKEN
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY
  if (!token || !url || !secretKey) {
    return NextResponse.json({ error: 'Ingest not configured.' }, { status: 503 })
  }

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let parsed
  try {
    parsed = bodySchema.safeParse(await request.json())
  } catch {
    return NextResponse.json({ error: 'Body must be JSON.' }, { status: 400 })
  }
  if (!parsed.success) {
    return NextResponse.json({ error: 'Bad row shape.' }, { status: 400 })
  }

  const supabase = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { error, count } = await supabase
    .from('datanetwork_spotchecks')
    .upsert(parsed.data, {
      onConflict: 'checked_at,cluster,cid,target_peer',
      ignoreDuplicates: true,
      count: 'exact',
    })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, received: parsed.data.length, inserted: count ?? 0 })
}
