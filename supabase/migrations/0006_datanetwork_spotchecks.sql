-- Resilient Data retrieval spot-checks (tier 3, inside path): the observer
-- corners one specific member over bitswap and makes it serve a real block of
-- a pinned dataset — proof of serving, not just the pin tracker's roll call.
-- Pushed by node-00 alongside heartbeats and pin status. Rows are public data
-- by design (CIDs, node names, cluster peer IDs, pass/fail, timing — never
-- addresses; the probe's error detail stays on the observer).
-- Idempotent: safe to re-run.

-- 1. Base table.
create table if not exists public.datanetwork_spotchecks (
  id bigint generated always as identity primary key,
  pushed_at timestamptz not null default now(),
  checked_at timestamptz not null,  -- when the observer ran the probe
  cluster text not null,            -- 'iosp-nodes' | 'iosp-laptops'
  cid text not null,                -- dataset probed
  name text,                        -- the pin's human name
  target_peer text not null,        -- cluster peer ID of the probed member
  target_name text not null,        -- 'laptop-00', ...
  ok boolean not null,              -- did the member serve the block?
  elapsed_ms integer                -- probe duration on success
);

create index if not exists datanetwork_spotchecks_checked_at_idx
  on public.datanetwork_spotchecks (checked_at desc);

-- Makes pushes idempotent: the observer re-sends a window after outages.
create unique index if not exists datanetwork_spotchecks_dedupe
  on public.datanetwork_spotchecks (checked_at, cluster, cid, target_peer);

-- 2. RLS: public read only; writes only through the token-guarded
-- /api/datanetwork/push-spots route with the secret key.
alter table public.datanetwork_spotchecks enable row level security;

drop policy if exists "datanetwork spotchecks public read" on public.datanetwork_spotchecks;
create policy "datanetwork spotchecks public read" on public.datanetwork_spotchecks
  for select using (true);
