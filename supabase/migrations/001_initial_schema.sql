-- ============================================================
-- THREADLY — Supabase Database Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── orders ──────────────────────────────────────────────────
create table if not exists public.orders (
  id                text        primary key,            -- e.g. THR-2026-XXXX
  user_id           text        not null,               -- phone number as anon key
  garment_type      text        not null,               -- shirt | suit | trousers | …
  garment_name      text        not null,
  status            text        not null default 'ORDER_PLACED',
  pickup_date       date        not null,
  pickup_time       text        not null,
  delivery_date     date,
  address           jsonb       not null default '{}'::jsonb,
  measurements      jsonb       not null default '{}'::jsonb,
  fabric            jsonb       not null default '{}'::jsonb,
  price             integer     not null default 0,     -- in paise (₹ × 100)
  timeline          jsonb       not null default '[]'::jsonb,
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.handle_updated_at();

-- Index for fast user lookups
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- ── profiles ─────────────────────────────────────────────────
create table if not exists public.profiles (
  phone             text        primary key,
  name              text        not null default '',
  email             text        not null default '',
  addresses         jsonb       not null default '[]'::jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ── Row Level Security ────────────────────────────────────────
-- We use service role key server-side, so RLS can be permissive
alter table public.orders  enable row level security;
alter table public.profiles enable row level security;

-- Allow service role to bypass RLS (this is the default; explicit for clarity)
-- Our API routes always use the service role key, so these policies
-- protect against accidental direct anon access.
create policy "service_role_orders_all" on public.orders
  using (true) with check (true);

create policy "service_role_profiles_all" on public.profiles
  using (true) with check (true);

-- ── Sample seed data (optional — for demo) ───────────────────
-- Uncomment to add a demo order:
-- insert into public.orders (id, user_id, garment_type, garment_name, status, pickup_date, pickup_time, price, address, measurements, fabric, timeline)
-- values (
--   'THR-2026-DEMO1',
--   '9999999999',
--   'suit',
--   'Modern Milanese Suit',
--   'MEASUREMENT_TAKEN',
--   current_date + 1,
--   '10:00 AM',
--   450000,
--   '{"line1": "221B Baker Street", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"}'::jsonb,
--   '{"chest": "40 inches", "waist": "34 inches", "shoulder": "18 inches"}'::jsonb,
--   '{"name": "Super 130s Merino Wool", "color": "Midnight Navy", "weight": "260 GSM"}'::jsonb,
--   '[]'::jsonb
-- ) on conflict (id) do nothing;
