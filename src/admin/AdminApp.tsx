import { useEffect, useState } from "react";
import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "../styles/admin.css";
import SitesAdmin from "./pages/SitesAdmin";
import AddSiteAdmin from "./pages/AddSiteAdmin";
import SiteDetailAdmin from "./pages/SiteDetailAdmin";
import SiteContentAdmin from "./pages/SiteContentAdmin";
import HeroAdmin from "./pages/HeroAdmin";
import ExperienceAdmin from "./pages/ExperienceAdmin";
import SkillsAdmin from "./pages/SkillsAdmin";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import { loadSites } from "../lib/sitesStore";
import { buildSchema } from "../lib/schemaBuilder";
import type { ContentSection } from "../lib/schemaBuilder";
import type { RegisteredSite } from "../types/content";

const CV_NAV = [
	{ to: "/admin/hero", label: "Hero / About", icon: "✦" },
	{ to: "/admin/experience", label: "Experience", icon: "◈" },
	{ to: "/admin/skills", label: "Skills", icon: "◉" },
	{ to: "/admin/projects", label: "Projects", icon: "▦" },
];

const AdminApp = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [activeSite, setActiveSite] = useState<RegisteredSite | null>(null);
	const [siteSchema, setSiteSchema] = useState<ContentSection[]>([]);

	useEffect(() => {
		// Detect /admin/sites/:id or /admin/sites/:id/content/...
		const match = location.pathname.match(/\/admin\/sites\/([^/]+)/);
		const siteId = match?.[1];
		if (siteId && siteId !== "new") {
			const found = loadSites().find((s) => s.id === siteId) ?? null;
			setActiveSite(found);
			if (found?.scan_data) {
				setSiteSchema(buildSchema(found.scan_data, found.id).sections);
			} else {
				setSiteSchema([]);
			}
		} else {
			setActiveSite(null);
			setSiteSchema([]);
		}
	}, [location.pathname]);

	const isInContent = location.pathname.includes("/content");

	return (
		<div className="admin-shell">
			<aside className="admin-sidebar">
				<div className="admin-logo">CMS</div>
				<nav className="admin-nav">
					{/* Sites */}
					<NavLink to="/admin/sites" end={false}>
						<span>⊞</span><span>My Sites</span>
					</NavLink>

					{/* Per-site dynamic nav — any scanned site */}
					{activeSite && siteSchema.length > 0 && (
						<>
							<div className="admin-nav-divider">
								<span>{activeSite.name}</span>
							</div>
							<NavLink
								to={`/admin/sites/${activeSite.id}`}
								end
								className={({ isActive }) => isActive && !isInContent ? "active" : ""}
							>
								<span>⊙</span><span>Overview</span>
							</NavLink>
							{siteSchema.map((section) => (
								<button
									key={section.id}
									className={`admin-nav-btn${isInContent && location.pathname.includes(section.id) ? " active" : ""}`}
									onClick={() => navigate(`/admin/sites/${activeSite.id}/content/${section.id}`)}
								>
									<span>{section.icon}</span>
									<span>{section.label}</span>
								</button>
							))}
						</>
					)}

					{/* Overview-only for sites with no scan data yet */}
					{activeSite && !siteSchema.length && (
						<>
							<div className="admin-nav-divider">
								<span>{activeSite.name}</span>
							</div>
							<NavLink to={`/admin/sites/${activeSite.id}`} end>
								<span>⊙</span><span>Overview</span>
							</NavLink>
						</>
					)}

					{/* Personal CV nav — only when not viewing another site */}
					{(!activeSite || activeSite.id === "cv-tsx") && (
						<>
							<div className="admin-nav-divider">
								<span>Personal CV</span>
							</div>
							{CV_NAV.map(({ to, label, icon }) => (
								<NavLink key={to} to={to}>
									<span>{icon}</span>
									<span>{label}</span>
								</NavLink>
							))}
						</>
					)}
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
					<Route path="sites/:id/content" element={<SiteContentAdmin />} />
					<Route path="sites/:id/content/:sectionId" element={<SiteContentAdmin />} />
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
