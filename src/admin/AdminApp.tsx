import { NavLink, Routes, Route } from "react-router-dom";
import "../styles/admin.css";
import DashboardAdmin from "./pages/DashboardAdmin";
import HeroAdmin from "./pages/HeroAdmin";
import ExperienceAdmin from "./pages/ExperienceAdmin";
import SkillsAdmin from "./pages/SkillsAdmin";
import ProjectsAdmin from "./pages/ProjectsAdmin";

const NAV = [
	{ to: "/admin", label: "Dashboard", icon: "⊞", end: true },
	{ to: "/admin/hero", label: "Hero / About", icon: "✦" },
	{ to: "/admin/experience", label: "Experience", icon: "◈" },
	{ to: "/admin/skills", label: "Skills", icon: "◉" },
	{ to: "/admin/projects", label: "Projects", icon: "▦" },
];

const AdminApp = () => (
	<div className="admin-shell">
		<aside className="admin-sidebar">
			<div className="admin-logo">CMS</div>
			<nav className="admin-nav">
				{NAV.map(({ to, label, icon, end }) => (
					<NavLink key={to} to={to} end={end}>
						<span>{icon}</span>
						<span>{label}</span>
					</NavLink>
				))}
			</nav>
			<div className="admin-nav-footer">
				<a href="/" target="_blank" rel="noreferrer">↗ View site</a>
			</div>
		</aside>

		<main className="admin-main">
			<Routes>
				<Route index element={<DashboardAdmin />} />
				<Route path="hero" element={<HeroAdmin />} />
				<Route path="experience" element={<ExperienceAdmin />} />
				<Route path="skills" element={<SkillsAdmin />} />
				<Route path="projects" element={<ProjectsAdmin />} />
			</Routes>
		</main>
	</div>
);

export default AdminApp;
