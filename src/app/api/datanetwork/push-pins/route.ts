import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Pin-status ingest for the /datanetwork dashboard's "Datasets" panel. Called
// by the workshop's observer node (node-00) alongside the heartbeat push:
// which cluster member reports holding which CID, per the cluster's own pin
// tracker. Guarded by the same bearer token (DATANETWORK_PUSH_TOKEN); writes
// with the secret key because the table has no public write policies.

export const dynamic = 'force-dynamic'

const rowSchema = z.object({
  scraped_at: z.string().min(10),
  cluster: z.enum(['iosp-nodes', 'iosp-laptops']),
  cid: z.string().min(10).max(100),
  name: z.string().max(200).optional().nullable(),
  peer: z.string().min(10).max(100),
  peer_name: z.string().min(1).max(60),
  status: z.string().min(1).max(40),
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
    .from('datanetwork_pins')
    .upsert(parsed.data, {
      onConflict: 'scraped_at,cluster,cid,peer',
      ignoreDuplicates: true,
      count: 'exact',
    })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, received: parsed.data.length, inserted: count ?? 0 })
}
