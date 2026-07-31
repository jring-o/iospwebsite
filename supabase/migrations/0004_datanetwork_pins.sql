-- Resilient Data pin-status matrix: which cluster member reports holding which
-- CID, sampled every ~5 minutes by the observer node (node-00) from each
-- cluster's own pin tracker and pushed alongside the heartbeats. Fronted by
-- the /datanetwork "Datasets" panel (per-CID serving counts). Rows are public
-- data by design (CIDs, dataset pin names, node names, cluster peer IDs —
-- never PII, never addresses).
-- Idempotent: safe to re-run.

-- 1. Base table.
create table if not exists public.datanetwork_pins (
  id bigint generated always as identity primary key,
  pushed_at timestamptz not null default now(),
  scraped_at timestamptz not null,  -- when the observer polled cluster status
  cluster text not null,            -- 'iosp-nodes' | 'iosp-laptops'
  cid text not null,                -- content address of the pinned dataset
  name text,                        -- the pin's human name ('genesis', ...)
  peer text not null,               -- cluster peer ID (public identifier)
  peer_name text not null,          -- 'node-00', 'laptop-00', ...
  status text not null              -- 'pinned' | 'pinning' | 'pin_error' | ...
);

create index if not exists datanetwork_pins_scraped_at_idx
  on public.datanetwork_pins (scraped_at desc);

-- Makes pushes idempotent: the observer may re-send a window after an outage.
create unique index if not exists datanetwork_pins_dedupe
  on public.datanetwork_pins (scraped_at, cluster, cid, peer);

-- 2. RLS: the dashboard is public — anyone may read. There are deliberately NO
-- insert/update/delete policies: writes happen only through the token-guarded
-- /api/datanetwork/push-pins route, which uses the secret key.
alter table public.datanetwork_pins enable row level security;

drop policy if exists "datanetwork pins public read" on public.datanetwork_pins;
create policy "datanetwork pins public read" on public.datanetwork_pins
  for select using (true);
