-- Run this in your Supabase SQL editor to enable live sync between the
-- admin panel and the public site (https://supabase.com/dashboard/project/_/sql).
--
-- Realtime is opt-in per table in Supabase. Without this, the site only
-- picks up admin edits on the next full page load.

alter publication supabase_realtime add table hero;
alter publication supabase_realtime add table experience;
alter publication supabase_realtime add table skills;
alter publication supabase_realtime add table projects;
