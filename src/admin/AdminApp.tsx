import { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "../styles/admin.css";
import DashboardAdmin from "./pages/DashboardAdmin";
import HeroAdmin from "./pages/HeroAdmin";
import ExperienceAdmin from "./pages/ExperienceAdmin";
import SkillsAdmin from "./pages/SkillsAdmin";
import ProjectsAdmin from "./pages/ProjectsAdmin";
import AdminLogin from "./AdminLogin";
import { useAdminAuth } from "./useAdminAuth";
import { ToastProvider } from "./toast";

const NAV = [
	{ to: "/admin", label: "Dashboard", icon: "⊞", end: true },
	{ to: "/admin/hero", label: "Hero / About", icon: "✦" },
	{ to: "/admin/experience", label: "Experience", icon: "◈" },
	{ to: "/admin/skills", label: "Skills", icon: "◉" },
	{ to: "/admin/projects", label: "Projects", icon: "▦" },
];

const AdminApp = () => {
	const { authed, loading, login, logout, mode } = useAdminAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	if (loading) {
		return (
			<div className="admin-loading">
				<span className="admin-loading-dot" />
			</div>
		);
	}

	if (!authed) {
		return <AdminLogin onLogin={login} mode={mode} />;
	}

	const close = () => setSidebarOpen(false);

	return (
		<ToastProvider>
			<div className="admin-shell">

				{/* Mobile top bar */}
				<header className="admin-mobile-header">
					<div className="admin-logo" style={{ padding: 0, border: 0, margin: 0 }}>CMS</div>
					<button
						className="admin-hamburger"
						onClick={() => setSidebarOpen(true)}
						aria-label="Open navigation"
					>
						<span /><span /><span />
					</button>
				</header>

				{/* Backdrop */}
				<div
					className={`admin-sidebar-overlay${sidebarOpen ? " is-open" : ""}`}
					onClick={close}
					aria-hidden="true"
				/>

				<aside className={`admin-sidebar${sidebarOpen ? " is-open" : ""}`}>
					<div className="admin-sidebar-top">
						<div className="admin-logo">CMS</div>
						<button className="admin-sidebar-close" onClick={close} aria-label="Close navigation">✕</button>
					</div>

					<nav className="admin-nav">
						{NAV.map(({ to, label, icon, end }) => (
							<NavLink key={to} to={to} end={end} onClick={close}>
								<span>{icon}</span>
								<span>{label}</span>
							</NavLink>
						))}
					</nav>

					<div className="admin-nav-footer">
						<a href="/" target="_blank" rel="noreferrer">↗ View site</a>
						{mode !== "open" && (
							<button className="admin-signout-btn" onClick={logout}>
								Sign out
							</button>
						)}
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
		</ToastProvider>
	);
};

export default AdminApp;
