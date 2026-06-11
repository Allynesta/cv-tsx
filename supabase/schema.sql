-- Run this in your Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

create extension if not exists "uuid-ossp";

-- Hero (single row)
create table hero (
  id uuid primary key default uuid_generate_v4(),
  name text not null default 'Ally Nesta',
  label text not null default 'Full-Stack Web Developer',
  roles text[] not null default array['Full Stack Developer', 'React Specialist', 'UI Enthusiast'],
  description text not null default 'Passionate about crafting exceptional digital experiences.'
);

insert into hero (name, label, roles, description) values (
  'Ally Nesta',
  'Full-Stack Web Developer',
  array['Full Stack Developer', 'React Specialist', 'UI Enthusiast'],
  'Passionate about crafting exceptional digital experiences — from pixel-perfect frontends to robust backend systems. Work smart. Deliver quality.'
);

-- Experience
create table experience (
  id uuid primary key default uuid_generate_v4(),
  company text not null,
  role text not null,
  period text not null,
  items text[] not null default '{}',
  order_index integer not null default 0,
  created_at timestamptz default now()
);

insert into experience (company, role, period, items, order_index) values
  ('Bilendi Services Ltd', 'Lead Technical Scriptor', '2022 – Present',
   array['Implement new survey projects','Participate in project launching meetings','Survey programming at complexity levels 3–5: maxdiff, segmentation, conjoint, multicountry','Hands-on with HTML, CSS, JavaScript, jQuery, and Python'], 0),
  ('SGS & CO Ltd', 'Software QA Tester — Level 1', '2021',
   array['Ensured quality of evolutionary and corrective application versions','Created user manuals for new features','Created and executed test suites and test cases'], 1),
  ('Enabling Environments Ltd', 'Web Developer', '2020',
   array['Maintenance of company website using WordPress'], 2),
  ('ABC Motor LTD', 'IT Trainee', '2019',
   array['Helpdesk support — collecting staff requests via ticketing system','Infrastructure support — on-site staff assistance','Networking — Windows Server and firewall','Web development — maintaining company website'], 3);

-- Skills
create table skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  rating integer not null check (rating between 1 and 5),
  category text not null check (category in ('Frontend', 'Backend', 'Development Tools')),
  order_index integer not null default 0
);

insert into skills (name, rating, category, order_index) values
  ('HTML', 4, 'Frontend', 0), ('CSS', 3, 'Frontend', 1),
  ('JavaScript', 3, 'Frontend', 2), ('React', 2, 'Frontend', 3),
  ('Python', 4, 'Backend', 0), ('PHP', 3, 'Backend', 1),
  ('JavaScript', 3, 'Backend', 2),
  ('GitHub', 2, 'Development Tools', 0), ('VS Code', 3, 'Development Tools', 1);

-- Projects
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  image_url text not null default '',
  alt text not null default '',
  link text,
  order_index integer not null default 0,
  created_at timestamptz default now()
);

insert into projects (title, description, tags, image_url, alt, link, order_index) values
  ('My Planner App', 'A smart productivity app to organize tasks efficiently with calendar integration.',
   array['TypeScript','Node.js','MongoDB'], '', 'Planner App Preview', 'https://myplanner-green.vercel.app/', 0),
  ('Personal CV Website', 'A modern CV website showcasing skills and experience. Fully responsive and SEO optimized.',
   array['React','TypeScript','Vite'], '', 'CV Website Preview', null, 1),
  ('RNA-SEQ Analysis', 'A web-based platform for RNA-seq research with data visualization and user insights.',
   array['R','Shiny','Bioinformatics'], '', 'RNA-SEQ Preview', 'https://rnaseqanalysis.shinyapps.io/apps/', 2),
  ('Offline Hike', 'A website for a tour guide featuring data presentation and booking functionality.',
   array['HTML','CSS','JavaScript'], '', 'Offline Hike Preview', 'https://offlinehike.com/', 3),
  ('Random Quote Generator', 'An interactive random quote generator leveraging a public quotes API.',
   array['React','JavaScript','API'], '', 'Caption App Preview', 'https://captions-woad.vercel.app/', 4);

-- Row Level Security: allow anon to read and write (personal site — no user data)
alter table hero enable row level security;
alter table experience enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;

create policy "public read" on hero for select using (true);
create policy "public write" on hero for all using (true) with check (true);

create policy "public read" on experience for select using (true);
create policy "public write" on experience for all using (true) with check (true);

create policy "public read" on skills for select using (true);
create policy "public write" on skills for all using (true) with check (true);

create policy "public read" on projects for select using (true);
create policy "public write" on projects for all using (true) with check (true);
