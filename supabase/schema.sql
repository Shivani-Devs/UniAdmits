create table if not exists users (
  id uuid primary key references auth.users on delete cascade,
  email text unique,
  role text default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

create table if not exists universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  location text,
  description text
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references universities(id) on delete cascade,
  name text not null,
  faculty text,
  degree text
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  program_id uuid references programs(id) on delete cascade,
  year int not null,
  cycle text default '2025-2026',
  average numeric not null,
  province text,
  status text check (status in ('accepted','rejected','waitlisted')),
  verified boolean default false,
  scholarship boolean default false,
  date_applied date,
  date_decision date,
  supplemental_notes text,
  uniqueness_score int default 0,
  created_at timestamptz default now()
);

create table if not exists extracurriculars (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references submissions(id) on delete cascade,
  activity_name text not null,
  category text,
  position text
);

create table if not exists submission_flags (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references submissions(id) on delete cascade,
  reason text not null,
  created_at timestamptz default now()
);

create table if not exists submission_votes (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references submissions(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  vote_type text check (vote_type in ('helpful','suspicious')),
  unique (submission_id, user_id)
);

create table if not exists offer_letters (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references submissions(id) on delete cascade,
  file_path text not null,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

insert into storage.buckets (id, name, public)
values ('offer-letters', 'offer-letters', false)
on conflict (id) do nothing;
