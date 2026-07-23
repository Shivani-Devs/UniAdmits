alter table users enable row level security;
alter table universities enable row level security;
alter table programs enable row level security;
alter table submissions enable row level security;
alter table extracurriculars enable row level security;
alter table submission_flags enable row level security;
alter table submission_votes enable row level security;
alter table offer_letters enable row level security;

create policy "public read universities" on universities for select using (true);
create policy "public read programs" on programs for select using (true);
create policy "public read submissions" on submissions for select using (true);
create policy "public read ecs" on extracurriculars for select using (true);

create policy "own user row" on users for select using (auth.uid() = id);
create policy "own user insert" on users for insert with check (auth.uid() = id);

create policy "insert own submission" on submissions for insert with check (auth.uid() = user_id);
create policy "update own submission" on submissions for update using (auth.uid() = user_id);
create policy "delete own submission" on submissions for delete using (auth.uid() = user_id);

create policy "insert own ecs" on extracurriculars for insert with check (
  exists (select 1 from submissions s where s.id = submission_id and s.user_id = auth.uid())
);

create policy "insert own vote" on submission_votes for insert with check (auth.uid() = user_id);
create policy "read votes" on submission_votes for select using (true);

create policy "insert flag" on submission_flags for insert with check (true);
create policy "read flags admin" on submission_flags for select using (
  exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin')
);

create policy "insert own offer letter" on offer_letters for insert with check (
  exists (select 1 from submissions s where s.id = submission_id and s.user_id = auth.uid())
);
create policy "admin manage offer letters" on offer_letters for update using (
  exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin')
);
