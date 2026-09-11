create table public.join_with_us_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) > 0),
  phone text not null check (phone ~ '^\+628[0-9]{7,11}$'),
  birth_date date not null check (birth_date <= current_date),
  created_at timestamptz not null default now()
);

alter table public.join_with_us_leads enable row level security;

revoke all on table public.join_with_us_leads from anon, authenticated;
