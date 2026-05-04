-- IOSP 2026 signups: showcase submissions, organizing committee interest,
-- sponsorship interest, and participant registrations.
-- Idempotent: safe to re-run on a fresh DB or to bring an older table forward.

-- 1. Base table — created fresh if missing, otherwise left alone (we'll evolve it below).
create table if not exists public.iosp_2026_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null,
  name text not null,
  email text not null,
  organization text,
  themes text[] not null default '{}',
  needs_travel_support boolean not null default false,
  -- Audience-fingerprint fields used to produce aggregate stats for sponsors.
  -- Optional; null when the submitter skipped them or for kinds that don't ask.
  roles text[] not null default '{}',
  sector text,
  region text,
  -- Default true: the consent checkbox in the form is pre-checked.
  stats_consent boolean not null default true,
  details jsonb not null default '{}'::jsonb
);

-- 2. Catch up older versions of the table that pre-date these columns.
alter table public.iosp_2026_signups
  add column if not exists organization text,
  add column if not exists themes text[] not null default '{}',
  add column if not exists needs_travel_support boolean not null default false,
  add column if not exists roles text[] not null default '{}',
  add column if not exists sector text,
  add column if not exists region text,
  add column if not exists stats_consent boolean not null default true,
  add column if not exists details jsonb not null default '{}'::jsonb;

-- 2b. Migrate any rows previously stored under kind='attendee' to kind='participant'.
update public.iosp_2026_signups set kind = 'participant' where kind = 'attendee';

-- 3. Replace any existing `kind` check constraint with the current set of allowed values.
--    Drops every check constraint on this table that mentions `kind`, then re-adds ours.
do $$
declare cn text;
begin
  for cn in
    select conname from pg_constraint
    where conrelid = 'public.iosp_2026_signups'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%kind%'
  loop
    execute format('alter table public.iosp_2026_signups drop constraint %I', cn);
  end loop;
end$$;

alter table public.iosp_2026_signups
  add constraint iosp_2026_signups_kind_check
  check (kind in ('showcase','committee','sponsor','participant'));

-- 4. Indexes.
create index if not exists iosp_2026_signups_kind_created_idx
  on public.iosp_2026_signups (kind, created_at desc);

-- GIN index lets you query "find all signups touching theme X" cheaply across kinds.
create index if not exists iosp_2026_signups_themes_idx
  on public.iosp_2026_signups using gin (themes);

-- 5. Row-level security.
alter table public.iosp_2026_signups enable row level security;

-- Anyone can submit. No reads, updates, or deletes via the publishable key —
-- admin access goes through the dashboard or a server-side secret-key client.
drop policy if exists "iosp_2026_signups_insert_anyone" on public.iosp_2026_signups;
create policy "iosp_2026_signups_insert_anyone"
  on public.iosp_2026_signups
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
