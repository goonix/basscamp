-- ============================================================
-- Basscamp initial schema
-- Run this in the Supabase SQL editor (supabase.com > SQL Editor)
-- ============================================================

-- ------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------

create table if not exists practice_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users(id) on delete cascade not null,
  date             date not null,
  duration_minutes integer not null check (duration_minutes > 0),
  topics           text[] not null default '{}',
  drills_completed text[] not null default '{}',
  notes            text not null default '',
  created_at       timestamptz not null default now()
);

create table if not exists drill_completions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  drill_id     text not null,
  completed_at timestamptz not null default now(),
  -- 1 = needs work, 2 = getting it, 3 = solid
  rating       smallint not null check (rating between 1 and 3)
);

create table if not exists user_preferences (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  default_tuning    text not null default 'standard'
                      check (default_tuning in ('standard', 'drop-d', 'half-step-down')),
  default_fret_count integer not null default 12
                      check (default_fret_count in (12, 24)),
  color_scheme      text not null default 'auto'
                      check (color_scheme in ('light', 'dark', 'auto')),
  updated_at        timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------

create index if not exists practice_sessions_user_id_date_idx
  on practice_sessions (user_id, date desc);

create index if not exists drill_completions_user_id_drill_id_idx
  on drill_completions (user_id, drill_id);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------

alter table practice_sessions  enable row level security;
alter table drill_completions  enable row level security;
alter table user_preferences   enable row level security;

-- practice_sessions policies
create policy "Users can view their own sessions"
  on practice_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on practice_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sessions"
  on practice_sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own sessions"
  on practice_sessions for delete
  using (auth.uid() = user_id);

-- drill_completions policies
create policy "Users can view their own completions"
  on drill_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own completions"
  on drill_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own completions"
  on drill_completions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own completions"
  on drill_completions for delete
  using (auth.uid() = user_id);

-- user_preferences policies
create policy "Users can view their own preferences"
  on user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on user_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on user_preferences for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Auto-create preferences row on new user signup
-- ------------------------------------------------------------

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.user_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
