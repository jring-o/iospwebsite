-- IOSP 2026 workshop submissions: proposals from people who want to run a
-- session at the event. Fronted by the unlisted /submit-workshop page.
-- Idempotent: safe to re-run.

-- 1. Base table.
create table if not exists public.iosp_2026_workshops (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Presenter
  presenter_name text not null,
  email text not null,
  affiliation text,
  bio text,                 -- public
  headshot_url text,        -- public storage URL or a link the submitter pasted

  -- Session (public-facing unless noted)
  title text not null,      -- public
  track text not null,      -- one of the four IOSP 2026 themes
  public_description text,  -- public
  outcome text,             -- public: what participants leave with
  target_audience text[] not null default '{}',
  audience_requirement text,

  -- Logistics
  length text not null,
  size text,
  needs_tech_facilitation boolean not null default false,
  av_needs text[] not null default '{}',
  materials_needed text,
  run_of_show text,         -- PRIVATE: organizers only

  -- Forward-compat for anything we add to the form later.
  details jsonb not null default '{}'::jsonb
);

-- 2. Catch up older versions of the table if it predates any column.
alter table public.iosp_2026_workshops
  add column if not exists affiliation text,
  add column if not exists bio text,
  add column if not exists headshot_url text,
  add column if not exists public_description text,
  add column if not exists outcome text,
  add column if not exists target_audience text[] not null default '{}',
  add column if not exists audience_requirement text,
  add column if not exists size text,
  add column if not exists needs_tech_facilitation boolean not null default false,
  add column if not exists av_needs text[] not null default '{}',
  add column if not exists materials_needed text,
  add column if not exists run_of_show text,
  add column if not exists details jsonb not null default '{}'::jsonb;

-- 3. Constrain track to the known set (drop any prior track check first).
do $$
declare cn text;
begin
  for cn in
    select conname from pg_constraint
    where conrelid = 'public.iosp_2026_workshops'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%track%'
  loop
    execute format('alter table public.iosp_2026_workshops drop constraint %I', cn);
  end loop;
end$$;

alter table public.iosp_2026_workshops
  add constraint iosp_2026_workshops_track_check
  check (track in (
    'Modular Research Components',
    'Funding Open Science & Open Source',
    'Resilient Data & Sovereign Infrastructure',
    'Assessment, Evaluation, Insights, Observability, & Utility'
  ));

-- 4. Indexes.
create index if not exists iosp_2026_workshops_track_created_idx
  on public.iosp_2026_workshops (track, created_at desc);

create index if not exists iosp_2026_workshops_audience_idx
  on public.iosp_2026_workshops using gin (target_audience);

-- 5. Row-level security: anyone can submit, nobody reads via the publishable key.
alter table public.iosp_2026_workshops enable row level security;

drop policy if exists "iosp_2026_workshops_insert_anyone" on public.iosp_2026_workshops;
create policy "iosp_2026_workshops_insert_anyone"
  on public.iosp_2026_workshops
  for insert
  to anon, authenticated
  with check (
    char_length(presenter_name) between 1 and 200
    and char_length(email) between 3 and 320
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(title) between 1 and 200
  );

-- 6. Storage bucket for headshots — public read, image-only, 5 MB cap.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'workshop-headshots',
  'workshop-headshots',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Anyone can upload to (only) this bucket; anyone can read it.
drop policy if exists "workshop_headshots_insert_anon" on storage.objects;
create policy "workshop_headshots_insert_anon"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'workshop-headshots');

drop policy if exists "workshop_headshots_read_public" on storage.objects;
create policy "workshop_headshots_read_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'workshop-headshots');
