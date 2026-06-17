import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultExperience, defaultSkills, defaultProjects } from "../../data/defaults";

interface Stats {
	projects: number;
	experience: number;
	skills: number;
}

const DashboardAdmin = () => {
	const [stats, setStats] = useState<Stats>({
		projects: defaultProjects.length,
		experience: defaultExperience.length,
		skills: defaultSkills.length,
	});

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		Promise.all([
			supabase.from("projects").select("id", { count: "exact", head: true }),
			supabase.from("experience").select("id", { count: "exact", head: true }),
			supabase.from("skills").select("id", { count: "exact", head: true }),
		]).then(([p, e, s]) => {
			setStats({
				projects: p.count ?? 0,
				experience: e.count ?? 0,
				skills: s.count ?? 0,
			});
		});
	}, []);

	return (
		<div>
			<h1 className="admin-page-title">Dashboard</h1>
			<p className="admin-page-subtitle">Welcome to your personal CMS</p>

			<div
				className={`admin-status-badge ${isConfigured ? "connected" : "fallback"}`}
				style={{ marginBottom: "var(--space-6)" }}
			>
				<span>●</span>
				{isConfigured
					? "Supabase connected"
					: "Using local defaults — configure Supabase to persist changes"}
			</div>

			<div className="admin-stats">
				<div className="admin-stat">
					<div className="admin-stat-value">{stats.projects}</div>
					<div className="admin-stat-label">Projects</div>
				</div>
				<div className="admin-stat">
					<div className="admin-stat-value">{stats.experience}</div>
					<div className="admin-stat-label">Experience</div>
				</div>
				<div className="admin-stat">
					<div className="admin-stat-value">{stats.skills}</div>
					<div className="admin-stat-label">Skills</div>
				</div>
				<div className="admin-stat">
					<div className="admin-stat-value">1</div>
					<div className="admin-stat-label">Hero section</div>
				</div>
			</div>

			{!isConfigured && (
				<div className="admin-card">
					<h2 className="admin-card-title" style={{ marginBottom: "var(--space-3)" }}>
						Set up Supabase
					</h2>
					<p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
						To persist your changes, add these to your <code>.env.local</code> and redeploy:
					</p>
					<pre style={{
						background: "var(--color-bg-alt)",
						padding: "var(--space-4)",
						borderRadius: "var(--radius-md)",
						fontSize: "0.8rem",
						marginTop: "var(--space-3)",
						overflowX: "auto",
					}}>
{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhb...`}
					</pre>
					<p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "var(--space-3)" }}>
						Then run the SQL in <code>supabase/schema.sql</code> in your Supabase SQL editor.
					</p>
				</div>
			)}
		</div>
	);
};

export default DashboardAdmin;
