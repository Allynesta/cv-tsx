import { NavLink, Routes, Route } from "react-router-dom";
import "../styles/admin.css";
import SitesAdmin from "./pages/SitesAdmin";
import AddSiteAdmin from "./pages/AddSiteAdmin";
import SiteDetailAdmin from "./pages/SiteDetailAdmin";
import HeroAdmin from "./pages/HeroAdmin";
import ExperienceAdmin from "./pages/ExperienceAdmin";
import SkillsAdmin from "./pages/SkillsAdmin";
import ProjectsAdmin from "./pages/ProjectsAdmin";

const CV_NAV = [
	{ to: "/admin/hero", label: "Hero / About", icon: "✦" },
	{ to: "/admin/experience", label: "Experience", icon: "◈" },
	{ to: "/admin/skills", label: "Skills", icon: "◉" },
	{ to: "/admin/projects", label: "Projects", icon: "▦" },
];

const AdminApp = () => {

	return (
		<div className="admin-shell">
			<aside className="admin-sidebar">
				<div className="admin-logo">CMS</div>
				<nav className="admin-nav">
					{/* Sites */}
					<NavLink to="/admin/sites" end={false}>
						<span>⊞</span><span>My Sites</span>
					</NavLink>

					{/* CV section divider */}
					<div className="admin-nav-divider">
						<span>Personal CV</span>
					</div>
					{CV_NAV.map(({ to, label, icon }) => (
						<NavLink key={to} to={to}>
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
					<Route index element={<SitesAdmin />} />
					<Route path="sites" element={<SitesAdmin />} />
					<Route path="sites/new" element={<AddSiteAdmin />} />
					<Route path="sites/:id" element={<SiteDetailAdmin />} />
					<Route path="hero" element={<HeroAdmin />} />
					<Route path="experience" element={<ExperienceAdmin />} />
					<Route path="skills" element={<SkillsAdmin />} />
					<Route path="projects" element={<ProjectsAdmin />} />
				</Routes>
			</main>
		</div>
	);
};

export default AdminApp;
