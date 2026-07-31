-- Resilient Data cluster heartbeats: liveness/freespace samples pushed by the
-- workshop's observer node (node-00) every minute, from the clusters' own
-- gossip. Fronted by the public /datanetwork dashboard. Rows are public data
-- by design (node names + cluster peer IDs only — never PII, never addresses).
-- Idempotent: safe to re-run.

-- 1. Base table.
create table if not exists public.datanetwork_heartbeats (
  id bigint generated always as identity primary key,
  pushed_at timestamptz not null default now(),
  scraped_at timestamptz not null,  -- when the observer sampled the gossip
  cluster text not null,            -- 'iosp-nodes' | 'iosp-laptops'
  peer text not null,               -- cluster peer ID (public identifier)
  peer_name text not null,          -- 'node-00', 'laptop-00', ...
  metric text not null,             -- 'ping' (liveness) | 'freespace' (bytes of budget left)
  value text
);

create index if not exists datanetwork_heartbeats_scraped_at_idx
  on public.datanetwork_heartbeats (scraped_at desc);

-- Makes pushes idempotent: the observer may re-send a window after an outage.
create unique index if not exists datanetwork_heartbeats_dedupe
  on public.datanetwork_heartbeats (scraped_at, cluster, peer, metric);

-- 2. RLS: the dashboard is public — anyone may read. There are deliberately NO
-- insert/update/delete policies: writes happen only through the token-guarded
-- /api/datanetwork/push route, which uses the secret key.
alter table public.datanetwork_heartbeats enable row level security;

drop policy if exists "datanetwork public read" on public.datanetwork_heartbeats;
create policy "datanetwork public read" on public.datanetwork_heartbeats
  for select using (true);
