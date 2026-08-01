-- Sign-ups for the "Build a sovereign data node" workshop (IOSP 2026, Store
-- stage). Public insert only; reads go through the dashboard or a server-side
-- secret-key client, matching the posture of iosp_2026_signups.
-- Idempotent: safe to re-run.

create table if not exists public.resilient_data_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  institution text not null default '',
  field text not null default '',
  location text not null default '',
  -- pi / laptop / either — drives Pi allocation and purchase quantity.
  mode text not null,
  -- Pi-only answers; null when the signup is laptop-only.
  pi_home text,
  pi_plug text,
  home_internet text[] not null default '{}',
  provider text,
  router_access text,
  anchor text,
  -- yes / maybe / no, plus the dataset detail answers.
  dataset text,
  dataset_what text,
  dataset_size text,
  laptop text,
  terminal text,
  tools text[] not null default '{}',
  notes text
);

alter table public.resilient_data_signups
  drop constraint if exists resilient_data_signups_mode_check;
alter table public.resilient_data_signups
  add constraint resilient_data_signups_mode_check
  check (mode in ('pi', 'laptop', 'either'));

create index if not exists resilient_data_signups_created_idx
  on public.resilient_data_signups (created_at desc);

alter table public.resilient_data_signups enable row level security;

-- Anyone can submit, capped by the shared hourly rate limiter (migration 0005).
-- No reads, updates, or deletes via the publishable key.
drop policy if exists "resilient_data_signups_insert_anyone" on public.resilient_data_signups;
create policy "resilient_data_signups_insert_anyone"
  on public.resilient_data_signups
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and public.iosp_insert_rate_ok('public.resilient_data_signups', 20)
  );
