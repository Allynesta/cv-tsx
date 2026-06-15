import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { loadSites, updateSite } from "../../lib/sitesStore";
import { fetchAndScan } from "../../lib/siteScanner";
import type { RegisteredSite } from "../../types/content";

type Tab = "overview" | "structure" | "images" | "links";

const SiteDetailAdmin = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [site, setSite] = useState<RegisteredSite | null>(null);
	const [tab, setTab] = useState<Tab>("overview");
	const [scanning, setScanning] = useState(false);
	const [scanError, setScanError] = useState("");

	useEffect(() => {
		const found = loadSites().find((s) => s.id === id);
		if (!found) navigate("/admin/sites");
		else setSite(found);
	}, [id, navigate]);

	const rescan = async () => {
		if (!site) return;
		setScanning(true);
		setScanError("");
		try {
			const result = await fetchAndScan(site.url);
			const patch = { scan_data: result, last_scanned_at: result.scannedAt };
			const updated = { ...site, ...patch };
			setSite(updated);
			updateSite(site.id, patch);
		} catch (e: any) {
			setScanError(e.message ?? "Scan failed");
		}
		setScanning(false);
	};

	const triggerWebhook = async () => {
		if (!site?.webhook_url) return;
		try {
			await fetch(site.webhook_url, { method: "POST" });
			alert("Rebuild triggered successfully.");
		} catch {
			alert("Webhook failed — check the URL.");
		}
	};

	if (!site) return null;
	const scan = site.scan_data;

	return (
		<div>
			{/* Header */}
			<button className="btn btn-secondary btn-sm" onClick={() => navigate("/admin/sites")} style={{ marginBottom: "var(--space-4)" }}>
				← All sites
			</button>

			<div className="site-detail-header">
				<div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
					<img
						src={scan?.favicon || `${new URL(site.url).origin}/favicon.ico`}
						alt=""
						width={28}
						height={28}
						style={{ borderRadius: "4px" }}
						onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
					/>
					<div>
						<h1 className="admin-page-title" style={{ marginBottom: 2 }}>{site.name}</h1>
						<a href={site.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
							{site.url} ↗
						</a>
					</div>
					<span className={`site-type-badge ${site.type}`} style={{ marginLeft: "var(--space-2)" }}>{site.type}</span>
				</div>

				<div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
					{site.type === "owned" && (
						<>
							{site.id === "cv-tsx" && (
								<Link to="/admin/hero" className="btn btn-secondary btn-sm">Edit content →</Link>
							)}
							{site.webhook_url && (
								<button className="btn btn-secondary btn-sm" onClick={triggerWebhook}>⟳ Rebuild</button>
							)}
						</>
					)}
					<button className="btn btn-primary btn-sm" onClick={rescan} disabled={scanning}>
						{scanning ? "Scanning…" : scan ? "Rescan" : "Scan now"}
					</button>
				</div>
			</div>

			{scanError && (
				<div className="admin-card" style={{ color: "#b91c1c", marginBottom: "var(--space-4)" }}>
					Scan failed: {scanError}
				</div>
			)}

			{!scan && !scanning && (
				<div className="admin-card" style={{ textAlign: "center", padding: "var(--space-12)" }}>
					<p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
						This site hasn't been scanned yet.
					</p>
					<button className="btn btn-primary" onClick={rescan}>Scan now</button>
				</div>
			)}

			{scanning && (
				<div className="admin-card" style={{ textAlign: "center", padding: "var(--space-8)" }}>
					<div className="scan-spinner" />
					<p style={{ marginTop: "var(--space-3)", color: "var(--color-text-muted)" }}>Scanning…</p>
				</div>
			)}

			{scan && !scanning && (
				<>
					{/* Stats bar */}
					<div className="site-scan-stats" style={{ marginBottom: "var(--space-4)" }}>
						<div className="scan-stat"><span>{scan.sections.length}</span>sections</div>
						<div className="scan-stat"><span>{scan.allHeadings.length}</span>headings</div>
						<div className="scan-stat"><span>{scan.allImages.length}</span>images</div>
						<div className="scan-stat"><span>{scan.wordCount.toLocaleString()}</span>words</div>
						<div className="scan-stat"><span>{scan.internalLinks.length}</span>internal links</div>
						<div className="scan-stat"><span>{scan.externalLinks.length}</span>ext links</div>
					</div>

					{/* Tabs */}
					<div className="admin-tabs">
						{(["overview", "structure", "images", "links"] as Tab[]).map((t) => (
							<button key={t} className={`admin-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
								{t.charAt(0).toUpperCase() + t.slice(1)}
							</button>
						))}
					</div>

					{/* Overview */}
					{tab === "overview" && (
						<div className="admin-card">
							<h3 className="admin-card-title" style={{ marginBottom: "var(--space-3)" }}>{scan.title}</h3>
							{scan.description && (
								<p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "var(--space-4)", lineHeight: 1.6 }}>
									{scan.description}
								</p>
							)}
							{site.last_scanned_at && (
								<p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
									Scanned {new Date(site.last_scanned_at).toLocaleString()}
								</p>
							)}
						</div>
					)}

					{/* Structure: headings + sections */}
					{tab === "structure" && (
						<>
							{scan.allHeadings.length > 0 && (
								<div className="admin-card" style={{ marginBottom: "var(--space-4)" }}>
									<div className="admin-card-header"><span className="admin-card-title">Heading hierarchy</span></div>
									<div className="heading-tree">
										{scan.allHeadings.map((h, i) => (
											<div key={i} className={`heading-item h${h.level}`}>
												<span className="heading-tag">H{h.level}</span>
												<span className="heading-text">{h.text}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{scan.sections.length > 0 && (
								<div className="admin-card">
									<div className="admin-card-header"><span className="admin-card-title">Semantic sections</span></div>
									<div className="sections-list">
										{scan.sections.map((s, i) => (
											<div key={i} className="section-item">
												<span className="section-tag">{s.label}</span>
												<div style={{ flex: 1, minWidth: 0 }}>
													{s.headings.length > 0 && (
														<div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text)" }}>
															{s.headings[0].text}
														</div>
													)}
													{s.paragraphs.length > 0 && (
														<div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 2 }}>
															{s.paragraphs[0].slice(0, 100)}{s.paragraphs[0].length > 100 ? "…" : ""}
														</div>
													)}
													{s.images.length > 0 && (
														<div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: 2 }}>
															{s.images.length} image{s.images.length > 1 ? "s" : ""}
														</div>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</>
					)}

					{/* Images */}
					{tab === "images" && (
						<div className="admin-card">
							<div className="admin-card-header">
								<span className="admin-card-title">Images ({scan.allImages.length})</span>
							</div>
							{scan.allImages.length === 0 ? (
								<div className="admin-empty">No images found</div>
							) : (
								<div className="images-grid">
									{scan.allImages.map((img, i) => (
										<div key={i} className="image-thumb-wrap">
											<img
												src={img.src.startsWith("http") ? img.src : `${new URL(site.url).origin}${img.src}`}
												alt={img.alt}
												className="image-thumb"
												onError={(e) => { (e.target as HTMLElement).style.opacity = "0.2"; }}
											/>
											{img.alt && <p className="image-thumb-alt">{img.alt}</p>}
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* Links */}
					{tab === "links" && (
						<>
							{scan.internalLinks.length > 0 && (
								<div className="admin-card" style={{ marginBottom: "var(--space-4)" }}>
									<div className="admin-card-header">
										<span className="admin-card-title">Internal links ({scan.internalLinks.length})</span>
									</div>
									<div className="links-list">
										{scan.internalLinks.map((l, i) => (
											<div key={i} className="link-item">
												<a href={l.href.startsWith("http") ? l.href : `${site.url}${l.href}`} target="_blank" rel="noreferrer" className="link-href">
													{l.href}
												</a>
												<span className="link-text">{l.text}</span>
											</div>
										))}
									</div>
								</div>
							)}
							{scan.externalLinks.length > 0 && (
								<div className="admin-card">
									<div className="admin-card-header">
										<span className="admin-card-title">External links ({scan.externalLinks.length})</span>
									</div>
									<div className="links-list">
										{scan.externalLinks.map((l, i) => (
											<div key={i} className="link-item">
												<a href={l.href} target="_blank" rel="noreferrer" className="link-href">{l.href}</a>
												<span className="link-text">{l.text}</span>
											</div>
										))}
									</div>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SiteDetailAdmin;
