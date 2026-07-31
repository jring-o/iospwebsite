-- Security hardening (2026-07-31). Idempotent: safe to re-run.
--
-- 1) stats_consent defaults to FALSE — consent must be an explicit opt-in
--    (a pre-checked consent box is not valid consent under EU rules; the form
--    now ships unchecked). Rows inserted before this date carried the
--    pre-checked default and should be treated as weak consent when producing
--    sponsor stats.
--
-- 2) Coarse database-level rate limits on every public write surface. These
--    tables accept anon inserts by design, and the publishable key is public,
--    so app-level limits alone can be bypassed by calling the API directly —
--    the cap has to live in the insert policies themselves. Caps are global
--    per hour and sit far above legitimate traffic; a capped insert surfaces
--    as an RLS violation, which the forms already answer with their generic
--    try-again message.

-- 1. Consent default.
alter table public.iosp_2026_signups alter column stats_consent set default false;

-- 2. Throttle helpers. SECURITY DEFINER so the policy can count rows the
-- anon role is not allowed to read. regclass parameter prevents SQL injection.
create or replace function public.iosp_insert_rate_ok(tbl regclass, cap integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  execute format(
    'select count(*) from %s where created_at > now() - interval ''1 hour''',
    tbl)
    into n;
  return n < cap;
end
$$;

create or replace function public.iosp_headshot_rate_ok(cap integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  select count(*) into n
    from storage.objects
    where bucket_id = 'workshop-headshots'
      and created_at > now() - interval '1 hour';
  return n < cap;
end
$$;

-- 3. Recreate the insert policies with the caps added.
drop policy if exists "iosp_2026_signups_insert_anyone" on public.iosp_2026_signups;
create policy "iosp_2026_signups_insert_anyone"
  on public.iosp_2026_signups
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and public.iosp_insert_rate_ok('public.iosp_2026_signups', 30)
  );

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
    and public.iosp_insert_rate_ok('public.iosp_2026_workshops', 10)
  );

drop policy if exists "workshop_headshots_insert_anon" on storage.objects;
create policy "workshop_headshots_insert_anon"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'workshop-headshots'
    and public.iosp_headshot_rate_ok(20)
  );
