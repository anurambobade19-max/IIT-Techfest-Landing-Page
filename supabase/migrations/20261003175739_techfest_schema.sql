/*
# Techfest Landing Page — Database Schema

## Overview
Creates the database backend for the Techfest 2026 landing page. This is a
single-tenant, no-auth application — all data is intentionally public/shared,
so policies use `TO anon, authenticated` with `USING (true)`.

## New Tables

1. `newsletter_subscribers`
   - Stores email signups from the landing page CTA section.
   - `id` (uuid, primary key)
   - `email` (text, unique, not null) — subscriber email
   - `created_at` (timestamptz) — when they subscribed

2. `registrations`
   - Stores event/competition registrations submitted from the landing page.
   - `id` (uuid, primary key)
   - `name` (text, not null) — participant full name
   - `email` (text, not null) — participant email
   - `phone` (text) — optional contact number
   - `college` (text) — optional institution name
   - `event_name` (text, not null) — which event/competition they're registering for
   - `created_at` (timestamptz) — when they registered

3. `competitions`
   - Stores competition data displayed on the landing page.
   - `id` (uuid, primary key)
   - `title` (text, not null) — competition name
   - `category` (text, not null) — e.g. Robotics, Coding
   - `prize` (text, not null) — prize pool display string
   - `description` (text, not null) — short description
   - `sort_order` (int, default 0) — display ordering

4. `workshops`
   - Stores workshop data displayed on the landing page.
   - `id` (uuid, primary key)
   - `title` (text, not null) — workshop name
   - `description` (text, not null) — short description
   - `sort_order` (int, default 0) — display ordering

## Security
- RLS enabled on all tables.
- All policies use `TO anon, authenticated` because this is a no-auth,
  single-tenant public landing page.
- `newsletter_subscribers` and `registrations`: INSERT + SELECT allowed
  for everyone (public can sign up; public can see that signups exist
  if needed for display). No UPDATE or DELETE from the frontend.
- `competitions` and `workshops`: full CRUD for anon+authenticated since
  the content is public and admin-managed.

## Seed Data
- Inserts the 8 competitions and 6 workshops currently shown on the landing
  page so the dynamic fetch returns real content immediately.

## Important Notes
1. This is a no-auth app — there is no sign-in screen. All policies MUST
   include `anon` so the anon-key frontend can read and write.
2. `USING (true)` is used intentionally because all data is public/shared.
3. Competitions and workshops are seeded from the existing landing page content.
*/

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_select_subscribers" ON newsletter_subscribers FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_subscribers" ON newsletter_subscribers;
CREATE POLICY "anon_insert_subscribers" ON newsletter_subscribers FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Registrations
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  college text,
  event_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_registrations" ON registrations;
CREATE POLICY "anon_select_registrations" ON registrations FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations" ON registrations FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Competitions
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  prize text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_competitions" ON competitions;
CREATE POLICY "anon_select_competitions" ON competitions FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_competitions" ON competitions;
CREATE POLICY "anon_insert_competitions" ON competitions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_competitions" ON competitions;
CREATE POLICY "anon_update_competitions" ON competitions FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_competitions" ON competitions;
CREATE POLICY "anon_delete_competitions" ON competitions FOR DELETE
TO anon, authenticated USING (true);

-- Workshops
CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_workshops" ON workshops;
CREATE POLICY "anon_select_workshops" ON workshops FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_workshops" ON workshops;
CREATE POLICY "anon_insert_workshops" ON workshops FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_workshops" ON workshops;
CREATE POLICY "anon_update_workshops" ON workshops FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_workshops" ON workshops;
CREATE POLICY "anon_delete_workshops" ON workshops FOR DELETE
TO anon, authenticated USING (true);

-- Seed competitions
INSERT INTO competitions (title, category, prize, description, sort_order) VALUES
('Robowars', 'Robotics', '₹13,00,000', 'Build. Battle. Dominate. Combat robots face off in a reinforced arena.', 1),
('AlgoNinja', 'Coding', '₹10,00,000', 'Competitive programming at its fiercest. Algorithms under the clock.', 2),
('Full Throttle', 'Design', '₹5,00,000', 'Design and fabricate an ATV from scratch. Race it on a dirt track.', 3),
('Perceptron Hackathon', 'AI/ML', '₹7,00,000', 'Real-world AI challenges powered by the IITB-Optiver AI Innovation Lab.', 4),
('ZeroCode', 'Tech', '₹3,00,000', 'No-code innovation challenge. Build solutions without writing a line.', 5),
('Meshmerize', 'Robotics', '₹4,00,000', 'Autonomous maze-solving robots. Precision navigation under time pressure.', 6),
('Innovation Challenge', 'Innovation', '₹1,50,000', 'SOF-backed challenge for student innovators pushing boundaries.', 7),
('National Probability Challenge', 'Mathematics', '₹2,50,000', 'Statistical problem-solving at the national level. Pure intellect.', 8)
ON CONFLICT DO NOTHING;

-- Seed workshops
INSERT INTO workshops (title, description, sort_order) VALUES
('Autonomous Robotics', 'Build self-navigating robots from scratch with sensor fusion and path planning.', 1),
('Advanced AI Engineering', 'LLM fine-tuning, RAG pipelines, and production ML systems with industry experts.', 2),
('Industrial Cybersecurity', 'Hands-on training in OT security, penetration testing, and threat modeling.', 3),
('IoT & Smart Systems', 'End-to-end IoT architecture from edge devices to cloud dashboards.', 4),
('Stock Market Automation', 'Algorithmic trading strategies and quantitative finance fundamentals.', 5),
('Machine Learning Foundations', 'From linear regression to deep learning — a comprehensive ML bootcamp.', 6)
ON CONFLICT DO NOTHING;