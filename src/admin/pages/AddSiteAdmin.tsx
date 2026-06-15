import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAndScan } from "../../lib/siteScanner";
import { addSite } from "../../lib/sitesStore";
import type { RegisteredSite } from "../../types/content";

type Step = "form" | "scanning" | "preview" | "error";

const AddSiteAdmin = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState<Step>("form");
	const [form, setForm] = useState({ name: "", url: "", type: "external" as "owned" | "external", webhook_url: "" });
	const [scanResult, setScanResult] = useState<RegisteredSite["scan_data"]>(undefined);
	const [error, setError] = useState("");

	const normaliseUrl = (raw: string) => {
		const s = raw.trim();
		return s.startsWith("http") ? s : `https://${s}`;
	};

	const handleScan = async () => {
		const url = normaliseUrl(form.url);
		setStep("scanning");
		try {
			const result = await fetchAndScan(url);
			setScanResult(result);
			setForm((f) => ({ ...f, url, name: f.name || result.title }));
			setStep("preview");
		} catch (e: any) {
			setError(e.message ?? "Could not reach that URL");
			setStep("error");
		}
	};

	const handleSave = () => {
		const site: RegisteredSite = {
			id: crypto.randomUUID(),
			name: form.name,
			url: normaliseUrl(form.url),
			type: form.type,
			webhook_url: form.webhook_url || undefined,
			scan_data: scanResult,
			last_scanned_at: scanResult?.scannedAt,
			created_at: new Date().toISOString(),
		};
		addSite(site);
		navigate(`/admin/sites/${site.id}`);
	};

	return (
		<div>
			<button className="btn btn-secondary btn-sm" onClick={() => navigate("/admin/sites")} style={{ marginBottom: "var(--space-4)" }}>
				← Back
			</button>
			<h1 className="admin-page-title">Add a website</h1>
			<p className="admin-page-subtitle">Enter a URL to scan the site structure and add it to your CMS</p>

			{/* Step: Form */}
			{step === "form" && (
				<div className="admin-card">
					<div className="admin-form">
						<div className="url-scan-box">
							<input
								type="url"
								className="url-scan-input"
								placeholder="https://yourwebsite.com"
								value={form.url}
								onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
								onKeyDown={(e) => e.key === "Enter" && form.url && handleScan()}
								autoFocus
							/>
							<button
								className="btn btn-primary"
								onClick={handleScan}
								disabled={!form.url.trim()}
							>
								Scan site →
							</button>
						</div>

						<div className="admin-field-row">
							<div className="admin-field">
								<label>Site name <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional — auto-detected from page title)</span></label>
								<input
									value={form.name}
									onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
									placeholder="e.g. My Portfolio"
								/>
							</div>
							<div className="admin-field">
								<label>Type</label>
								<select
									value={form.type}
									onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "owned" | "external" }))}
								>
									<option value="owned">Owned — I built this site</option>
									<option value="external">External — read-only inspection</option>
								</select>
							</div>
						</div>

						{form.type === "owned" && (
							<div className="admin-field">
								<label>Rebuild webhook URL <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional — triggers redeploy after saving)</span></label>
								<input
									value={form.webhook_url}
									onChange={(e) => setForm((f) => ({ ...f, webhook_url: e.target.value }))}
									placeholder="https://api.vercel.com/v1/integrations/deploy/..."
								/>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Step: Scanning */}
			{step === "scanning" && (
				<div className="admin-card" style={{ textAlign: "center", padding: "var(--space-12)" }}>
					<div className="scan-spinner" />
					<p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)" }}>
						Scanning <strong>{normaliseUrl(form.url)}</strong>…
					</p>
					<p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "var(--space-2)" }}>
						Fetching HTML and analysing structure
					</p>
				</div>
			)}

			{/* Step: Error */}
			{step === "error" && (
				<div className="admin-card">
					<p style={{ color: "#b91c1c", marginBottom: "var(--space-4)" }}>
						Could not scan that URL: <strong>{error}</strong>
					</p>
					<p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
						The site may block external requests, or the URL may be incorrect. You can still add it manually without a scan.
					</p>
					<div style={{ display: "flex", gap: "var(--space-3)" }}>
						<button className="btn btn-secondary" onClick={() => setStep("form")}>Try again</button>
						<button className="btn btn-primary" onClick={handleSave} disabled={!form.name || !form.url}>
							Add without scan
						</button>
					</div>
				</div>
			)}

			{/* Step: Preview */}
			{step === "preview" && scanResult && (
				<>
					<div className="admin-card" style={{ marginBottom: "var(--space-4)" }}>
						<div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
							<img
								src={scanResult.favicon}
								alt=""
								width={32}
								height={32}
								style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
								onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
							/>
							<div style={{ flex: 1 }}>
								<div className="admin-field" style={{ marginBottom: "var(--space-3)" }}>
									<label>Site name</label>
									<input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
								</div>
							</div>
						</div>

						{scanResult.description && (
							<p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "var(--space-4)", lineHeight: 1.6 }}>
								{scanResult.description}
							</p>
						)}

						<div className="site-scan-stats">
							<div className="scan-stat"><span>{scanResult.sections.length}</span>sections</div>
							<div className="scan-stat"><span>{scanResult.allHeadings.length}</span>headings</div>
							<div className="scan-stat"><span>{scanResult.allImages.length}</span>images</div>
							<div className="scan-stat"><span>{scanResult.wordCount.toLocaleString()}</span>words</div>
							<div className="scan-stat"><span>{scanResult.internalLinks.length}</span>internal links</div>
							<div className="scan-stat"><span>{scanResult.externalLinks.length}</span>external links</div>
						</div>
					</div>

					{/* Headings hierarchy */}
					{scanResult.allHeadings.length > 0 && (
						<div className="admin-card" style={{ marginBottom: "var(--space-4)" }}>
							<div className="admin-card-header"><span className="admin-card-title">Heading structure</span></div>
							<div className="heading-tree">
								{scanResult.allHeadings.map((h, i) => (
									<div key={i} className={`heading-item h${h.level}`}>
										<span className="heading-tag">H{h.level}</span>
										<span className="heading-text">{h.text}</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Sections */}
					{scanResult.sections.length > 0 && (
						<div className="admin-card" style={{ marginBottom: "var(--space-4)" }}>
							<div className="admin-card-header"><span className="admin-card-title">Detected sections</span></div>
							<div className="sections-list">
								{scanResult.sections.map((s, i) => (
									<div key={i} className="section-item">
										<span className="section-tag">{s.label}</span>
										<span className="section-meta">
											{s.headings.length > 0 && <>{s.headings[0].text}</>}
											{s.paragraphs.length > 0 && !s.headings.length && <>{s.paragraphs[0].slice(0, 60)}…</>}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					<div className="admin-save-bar" style={{ justifyContent: "space-between" }}>
						<button className="btn btn-secondary" onClick={() => setStep("form")}>← Rescan</button>
						<button className="btn btn-primary" onClick={handleSave} disabled={!form.name}>
							Save site →
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default AddSiteAdmin;
