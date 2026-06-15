import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadSites, removeSite } from "../../lib/sitesStore";
import type { RegisteredSite } from "../../types/content";

const SitesAdmin = () => {
	const [sites, setSites] = useState<RegisteredSite[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		setSites(loadSites());
	}, []);

	const handleDelete = (id: string, name: string) => {
		if (id === "cv-tsx") return; // protect default site
		if (!confirm(`Remove "${name}" from your CMS?`)) return;
		setSites(removeSite(id));
	};

	return (
		<div>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
				<div>
					<h1 className="admin-page-title">My Sites</h1>
					<p className="admin-page-subtitle">Manage and inspect all your registered websites</p>
				</div>
				<button className="btn btn-primary" onClick={() => navigate("/admin/sites/new")}>
					+ Add site
				</button>
			</div>

			<div className="sites-grid">
				{sites.map((site) => (
					<div
						key={site.id}
						className="site-card"
						onClick={() => navigate(`/admin/sites/${site.id}`)}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === "Enter" && navigate(`/admin/sites/${site.id}`)}
					>
						<div className="site-card-header">
							<img
								src={`${new URL(site.url).origin}/favicon.ico`}
								alt=""
								className="site-favicon"
								onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
							/>
							<div className="site-card-info">
								<div className="site-card-name">{site.name}</div>
								<div className="site-card-url">{site.url}</div>
							</div>
							<span className={`site-type-badge ${site.type}`}>{site.type}</span>
						</div>

						{site.scan_data && (
							<div className="site-card-stats">
								<span>{site.scan_data.allHeadings.length} headings</span>
								<span>{site.scan_data.allImages.length} images</span>
								<span>{site.scan_data.wordCount.toLocaleString()} words</span>
								<span>{site.scan_data.sections.length} sections</span>
							</div>
						)}

						<div className="site-card-footer">
							{site.last_scanned_at ? (
								<span className="site-scanned-at">
									Last scanned {new Date(site.last_scanned_at).toLocaleDateString()}
								</span>
							) : (
								<span className="site-not-scanned">Not scanned yet</span>
							)}
							<div className="site-card-actions" onClick={(e) => e.stopPropagation()}>
								<button
									className="btn btn-secondary btn-sm"
									onClick={() => navigate(`/admin/sites/${site.id}`)}
								>
									Open
								</button>
								{site.id !== "cv-tsx" && (
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleDelete(site.id, site.name)}
									>
										Remove
									</button>
								)}
							</div>
						</div>
					</div>
				))}

				{/* Add site CTA */}
				<div
					className="site-card site-card--add"
					onClick={() => navigate("/admin/sites/new")}
					role="button"
					tabIndex={0}
					onKeyDown={(e) => e.key === "Enter" && navigate("/admin/sites/new")}
				>
					<span className="site-card-add-icon">+</span>
					<span>Add a website</span>
				</div>
			</div>
		</div>
	);
};

export default SitesAdmin;
