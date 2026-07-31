import type { Metadata } from 'next'
import { getSupabaseServerClient } from '@/lib/supabase/server'

// Public health readout of the IOSP resilient-data clusters. Data arrives from
// the workshop's observer node (node-00) via /api/datanetwork/push every
// minute; this page re-renders at most once a minute.

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Resilient Data',
  description:
    'Live health of the IOSP researcher-owned data clusters: at-risk datasets, archived on hardware researchers control.',
}

type Row = {
  scraped_at: string
  cluster: 'iosp-nodes' | 'iosp-laptops'
  peer: string
  peer_name: string
  metric: 'ping' | 'freespace'
  value: string | null
}

type PinRow = {
  scraped_at: string
  cluster: Row['cluster']
  cid: string
  name: string | null
  peer: string
  peer_name: string
  status: string
}

type SpotRow = {
  checked_at: string
  cluster: Row['cluster']
  cid: string
  ok: boolean
  target_name: string
}

const CLUSTERS: { key: Row['cluster']; title: string; desc: string }[] = [
  {
    key: 'iosp-nodes',
    title: 'iosp-nodes',
    desc: 'Raspberry Pi nodes that went home with researchers.',
  },
  {
    key: 'iosp-laptops',
    title: 'iosp-laptops',
    desc: 'Researchers’ own laptops.',
  },
]

// The recorder is a member of iosp-laptops only to hear its gossip; its stored
// copies are excluded from how this cluster is presented and studied.
const RECORDER_NAME = 'node-00-observer'
const STRIP_PASSES = 180 // ≈ the last 3 hours at one pass per minute
const GAP_MS = 7.5 * 60 * 1000

const hhmm = (iso: string) =>
  new Date(iso).toISOString().slice(11, 16) + ' UTC'
const gb = (v: string | null) =>
  v ? (Number(v) / 1e9).toFixed(1) + ' GB' : null

export default async function DataNetworkPage() {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  const supabase = getSupabaseServerClient()
  // Newest first: Supabase caps responses at 1,000 rows regardless of .limit(),
  // and ascending order made the page render the OLDEST slice of the window
  // while fresh heartbeats accumulated unseen (frozen "Last heartbeat", 2026-07-31).
  // Descending keeps the cap on the newest rows; reverse restores time order.
  const { data } = await supabase
    .from('datanetwork_heartbeats')
    .select('scraped_at,cluster,peer,peer_name,metric,value')
    .gte('scraped_at', since)
    .order('scraped_at', { ascending: false })
    .limit(20000)

  // Pin-status matrix for the Datasets panel: newest-first, we only render the
  // latest snapshot per cluster (history stays in the table for the study).
  const { data: pinData } = await supabase
    .from('datanetwork_pins')
    .select('scraped_at,cluster,cid,name,peer,peer_name,status')
    .gte('scraped_at', since)
    .order('scraped_at', { ascending: false })
    .limit(5000)

  // Tier-3 retrieval probes: newest-first, latest verdict per (cluster, cid).
  const { data: spotData } = await supabase
    .from('datanetwork_spotchecks')
    .select('checked_at,cluster,cid,ok,target_name')
    .gte('checked_at', since)
    .order('checked_at', { ascending: false })
    .limit(2000)

  const rows = ((data ?? []) as Row[]).reverse()
  const passes = [...new Set(rows.map((r) => r.scraped_at))].sort()
  const passIdx = new Map(passes.map((t, i) => [t, i]))
  const latest = passes.length - 1

  type Node = {
    cluster: Row['cluster']
    peer: string
    name: string
    heard: Set<number>
    free: string | null
  }
  const nodes = new Map<string, Node>()
  for (const r of rows) {
    const key = r.cluster + '|' + r.peer
    const n =
      nodes.get(key) ??
      ({
        cluster: r.cluster,
        peer: r.peer,
        name: r.peer_name,
        heard: new Set(),
        free: null,
      } as Node)
    if (r.metric === 'ping') n.heard.add(passIdx.get(r.scraped_at)!)
    else n.free = r.value
    nodes.set(key, n)
  }
  const allNodes = [...nodes.values()].sort((a, b) => a.name.localeCompare(b.name))
  const members = allNodes.filter((n) => n.name !== RECORDER_NAME)
  const recorder = allNodes.find((n) => n.name === RECORDER_NAME)
  const onlineNow = members.filter((n) => n.heard.has(latest)).length

  // Latest pin snapshot per cluster, aggregated per CID. The denominator is
  // the cluster's member roster from the heartbeat window — a member that has
  // dropped out of the snapshot entirely still counts as not-serving, instead
  // of shrinking the total. The recorder's copies in iosp-laptops are excluded
  // from serving counts (observer-policy row).
  type PinSummary = {
    cid: string
    name: string | null
    served: number
    total: number
    trouble: string[]
  }
  const pinSnap = new Map<Row['cluster'], { at: string; pins: PinSummary[] }>()
  for (const c of CLUSTERS) {
    const cRows = ((pinData ?? []) as PinRow[]).filter((r) => r.cluster === c.key)
    if (cRows.length === 0) continue
    const at = cRows[0].scraped_at
    const memberPeers = new Map(
      allNodes
        .filter((n) => n.cluster === c.key && n.name !== RECORDER_NAME)
        .map((n) => [n.peer, n.name]),
    )
    const byCid = new Map<string, { name: string | null; seen: Map<string, PinRow> }>()
    for (const r of cRows) {
      if (r.scraped_at !== at) continue
      const p = byCid.get(r.cid) ?? { name: r.name, seen: new Map<string, PinRow>() }
      p.seen.set(r.peer, r)
      byCid.set(r.cid, p)
    }
    const pins: PinSummary[] = [...byCid.entries()].map(([cid, p]) => {
      let served = 0
      const trouble: string[] = []
      for (const r of p.seen.values()) {
        if (r.peer_name === RECORDER_NAME) continue
        if (r.status === 'pinned') served += 1
        else trouble.push(`${r.peer_name}: ${r.status.replaceAll('_', ' ')}`)
      }
      for (const [peer, name] of memberPeers) {
        if (!p.seen.has(peer)) trouble.push(`${name}: not reporting`)
      }
      const total = Math.max(memberPeers.size, served)
      return { cid, name: p.name, served, total, trouble }
    })
    pinSnap.set(c.key, {
      at,
      pins: pins.sort((a, b) => (a.name ?? a.cid).localeCompare(b.name ?? b.cid)),
    })
  }

  // Latest probe verdict per (cluster, cid); rows arrive newest-first.
  const spotLatest = new Map<string, SpotRow>()
  for (const s of (spotData ?? []) as SpotRow[]) {
    const k = s.cluster + '|' + s.cid
    if (!spotLatest.has(k)) spotLatest.set(k, s)
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-royal">
          IOSP 2026 · Leiden
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">
          Resilient Data
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          At-risk research datasets, archived on hardware researchers own and
          run themselves — two small IPFS clusters started at the IOSP 2026
          workshop. This page is the network&rsquo;s live health readout,
          reported by the clusters&rsquo; own gossip.
        </p>
      </header>

      {passes.length === 0 ? (
        <div
          className="mt-10 border border-rule bg-paper-card p-6 text-ink-soft"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          The observatory hasn&rsquo;t reported yet — heartbeats appear here
          within a few minutes of the recorder coming online.
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Nodes online', value: `${onlineNow}/${members.length}` },
              { label: 'Clusters', value: '2' },
              { label: 'Last heartbeat', value: hhmm(passes[latest]) },
              {
                label: 'Passes (24 h)',
                value: String(passes.length),
              },
            ].map((k) => (
              <div
                key={k.label}
                className="border border-rule bg-paper-card px-4 py-3"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  {k.label}
                </div>
                <div className="mt-1 font-mono text-2xl tabular-nums text-ink">
                  {k.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {CLUSTERS.map((c) => {
              const cm = members.filter((n) => n.cluster === c.key)
              return (
                <section
                  key={c.key}
                  className="border border-rule bg-paper-card p-6"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <h2 className="font-mono text-sm uppercase tracking-[0.14em] text-ink">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">{c.desc}</p>

                  {cm.length === 0 ? (
                    <p className="mt-4 text-sm text-ink-mute">
                      No member heartbeats in the last 24 hours.
                    </p>
                  ) : (
                    <div className="mt-4 flex flex-col gap-5">
                      {cm.map((n) => {
                        const first = Math.min(...n.heard)
                        const start = Math.max(first, latest - STRIP_PASSES + 1)
                        const total = latest - first + 1
                        const pct = Math.round((100 * n.heard.size) / total)
                        const on = n.heard.has(latest)
                        const free = gb(n.free)
                        const cells = []
                        for (let i = start; i <= latest; i++) {
                          const gap =
                            i > start &&
                            +new Date(passes[i]) - +new Date(passes[i - 1]) > GAP_MS
                          if (gap)
                            cells.push(
                              <span
                                key={'g' + i}
                                title={`recorder gap ${hhmm(passes[i - 1])}–${hhmm(passes[i])}`}
                                className="mx-1 w-px self-stretch border-l border-dashed border-rule-strong"
                              />,
                            )
                          cells.push(
                            <span
                              key={i}
                              title={`${hhmm(passes[i])} — ${n.heard.has(i) ? 'heartbeat heard' : 'not heard'}`}
                              className={
                                'h-6 w-[7px] rounded-[2px] ' +
                                (n.heard.has(i)
                                  ? 'bg-mint'
                                  : 'border border-rule bg-transparent')
                              }
                            />,
                          )
                        }
                        return (
                          <div key={n.name}>
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="font-mono text-sm text-ink">
                                {n.name}
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
                                <span
                                  className={
                                    'h-1.5 w-1.5 rounded-full ' +
                                    (on ? 'bg-mint' : 'border border-ink-mute')
                                  }
                                />
                                {on ? 'online' : 'not heard'}
                              </span>
                              <span className="ml-auto font-mono text-xs tabular-nums text-ink-soft">
                                {pct}% · {n.heard.size}/{total} passes
                                {free ? ` · ${free} free` : ''}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-stretch gap-[2px]">
                              {cells}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {(() => {
                    const snap = pinSnap.get(c.key)
                    if (!snap || snap.pins.length === 0) return null
                    return (
                      <div className="mt-5 border-t border-rule pt-4">
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                            Datasets · {snap.pins.length}
                          </h3>
                          <span className="font-mono text-[10px] tabular-nums text-ink-mute">
                            sampled {hhmm(snap.at)}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-col gap-1.5">
                          {snap.pins.map((p) => (
                            <div
                              key={p.cid}
                              className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                            >
                              <span
                                className={
                                  'h-1.5 w-1.5 self-center rounded-full ' +
                                  (p.served === p.total && p.total > 0
                                    ? 'bg-mint'
                                    : p.served > 0
                                      ? 'bg-royal'
                                      : 'border border-ink-mute')
                                }
                              />
                              <span className="text-sm text-ink">
                                {p.name || 'unnamed'}
                              </span>
                              <span className="font-mono text-xs text-ink-mute">
                                {p.cid.slice(0, 10)}…
                              </span>
                              <span
                                className="ml-auto font-mono text-xs tabular-nums text-ink-soft"
                                title={p.trouble.join(', ') || undefined}
                              >
                                {p.served}/{p.total} serving
                              </span>
                              {(() => {
                                const s = spotLatest.get(c.key + '|' + p.cid)
                                if (!s) return null
                                return (
                                  <span
                                    className={
                                      'font-mono text-[10px] tabular-nums ' +
                                      (s.ok ? 'text-mint' : 'text-royal')
                                    }
                                    title={`retrieval probe: ${s.target_name} ${
                                      s.ok
                                        ? 'served a real block'
                                        : 'did not serve'
                                    } at ${hhmm(s.checked_at)}`}
                                  >
                                    {s.ok
                                      ? `✓ served ${hhmm(s.checked_at)}`
                                      : `✗ probe failed ${hhmm(s.checked_at)}`}
                                  </span>
                                )
                              })()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}

                  {c.key === 'iosp-laptops' && recorder && (
                    <p className="mt-4 border-t border-rule pt-3 text-xs text-ink-mute">
                      Recorded by <span className="font-mono">node-00</span>{' '}
                      (observer) — heard{' '}
                      {Math.round(
                        (100 * recorder.heard.size) /
                          (latest - Math.min(...recorder.heard) + 1),
                      )}
                      % of passes. The observer&rsquo;s stored copies are not
                      counted as replicas of this cluster.
                    </p>
                  )}
                </section>
              )
            })}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-ink-mute">
            <span className="font-medium text-ink-soft">
              What this instrument can see:
            </span>{' '}
            the observer samples cluster gossip every minute; a node counts
            as heard if its heartbeat was live at that moment. Dips shorter
            than the sampling gap can pass unseen. A dashed divider marks a
            period when the recorder itself wasn&rsquo;t sampling — absence of
            evidence, not evidence of absence. &ldquo;Free&rdquo; is each
            node&rsquo;s configured archive budget remaining, not its whole
            disk. Strips show the most recent {STRIP_PASSES} passes; uptime
            percentages cover the window of passes the readout holds. Dataset
            rows come from each cluster&rsquo;s own pin tracker, sampled every
            ~5 minutes: &ldquo;serving&rdquo; counts members whose node reports
            the item pinned, and the observer&rsquo;s copies are not counted in
            iosp-laptops. A &ldquo;✓ served&rdquo; mark is stronger than the
            count: every 30 minutes the observer picks members and makes them
            actually deliver a block of the dataset over the wire — proof of
            serving, not a claim. The observer never probes its own copies, so
            marks appear only where another member answered.
          </p>
        </>
      )}
    </div>
  )
}
