import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadSites } from "../../lib/sitesStore";
import { buildSchema } from "../../lib/schemaBuilder";
import { loadSectionContent, saveSectionContent } from "../../lib/contentStore";
import type { ContentSection, ContentField } from "../../lib/schemaBuilder";
import type { RegisteredSite } from "../../types/content";

const SiteContentAdmin = () => {
	const { id, sectionId } = useParams<{ id: string; sectionId?: string }>();
	const navigate = useNavigate();

	const [site, setSite] = useState<RegisteredSite | null>(null);
	const [sections, setSections] = useState<ContentSection[]>([]);
	const [activeSection, setActiveSection] = useState<ContentSection | null>(null);
	const [values, setValues] = useState<Record<string, string>>({});
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		const found = loadSites().find((s) => s.id === id);
		if (!found) { navigate("/admin/sites"); return; }
		setSite(found);

		if (!found.scan_data) return;
		const schema = buildSchema(found.scan_data, found.id);
		setSections(schema.sections);

		const target = sectionId
			? schema.sections.find((s) => s.id === sectionId)
			: schema.sections[0];
		if (target) activateSection(target, found.id);
	}, [id, sectionId, navigate]);

	const activateSection = useCallback((section: ContentSection, siteId: string) => {
		setActiveSection(section);
		const stored = loadSectionContent(siteId, section.id);
		const merged: Record<string, string> = {};
		section.fields.forEach((f) => {
			merged[f.key] = stored[f.key] ?? f.value;
		});
		setValues(merged);
		setSaved(false);
	}, []);

	const handleSelectSection = (section: ContentSection) => {
		if (!site) return;
		navigate(`/admin/sites/${site.id}/content/${section.id}`, { replace: true });
		activateSection(section, site.id);
	};

	const handleChange = (field: ContentField, val: string) => {
		setValues((v) => ({ ...v, [field.key]: val }));
		setSaved(false);
	};

	const handleSave = () => {
		if (!site || !activeSection) return;
		saveSectionContent(site.id, activeSection.id, values);
		setSaved(true);
	};

	if (!site) return null;

	if (!site.scan_data) {
		return (
			<div>
				<button className="btn btn-secondary btn-sm" onClick={() => navigate(`/admin/sites/${id}`)} style={{ marginBottom: "var(--space-4)" }}>
					← Site overview
				</button>
				<div className="admin-card" style={{ textAlign: "center", padding: "var(--space-12)" }}>
					<p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
						Scan the site first to enable content editing.
					</p>
					<button className="btn btn-primary" onClick={() => navigate(`/admin/sites/${id}`)}>
						Go to site overview
					</button>
				</div>
			</div>
		);
	}

	return (
		<div style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
			{/* Section list */}
			<div className="content-sections-panel">
				<div className="content-panel-header">
					<button
						className="btn btn-secondary btn-sm"
						onClick={() => navigate(`/admin/sites/${id}`)}
						style={{ width: "100%", justifyContent: "flex-start" }}
					>
						← Overview
					</button>
					<h3 className="admin-card-title" style={{ margin: "var(--space-3) 0 var(--space-2)" }}>
						{site.name}
					</h3>
					<p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "var(--space-2)" }}>
						{sections.length} editable sections
					</p>
				</div>
				<nav className="content-sections-nav">
					{sections.map((s) => (
						<button
							key={s.id}
							className={`content-section-item${activeSection?.id === s.id ? " active" : ""}`}
							onClick={() => handleSelectSection(s)}
						>
							<span className="content-section-icon">{s.icon}</span>
							<span className="content-section-label">{s.label}</span>
						</button>
					))}
					{sections.length === 0 && (
						<p style={{ padding: "var(--space-3)", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
							No editable sections found.
						</p>
					)}
				</nav>
			</div>

			{/* Field editor */}
			<div style={{ flex: 1, minWidth: 0 }}>
				{!activeSection ? (
					<div className="admin-card" style={{ textAlign: "center", padding: "var(--space-12)" }}>
						<p style={{ color: "var(--color-text-muted)" }}>Select a section to edit its content.</p>
					</div>
				) : (
					<div className="admin-card">
						<div className="admin-card-header" style={{ marginBottom: "var(--space-4)" }}>
							<div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
								<span style={{ fontSize: "1.25rem" }}>{activeSection.icon}</span>
								<span className="admin-card-title">{activeSection.label}</span>
								<span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", background: "var(--color-bg-alt)", padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
									&lt;{activeSection.tag}&gt;
								</span>
							</div>
						</div>

						<div className="admin-form" style={{ gap: "var(--space-4)" }}>
							{activeSection.fields.map((field) => (
								<div key={field.key} className="admin-field">
									<label>{field.label}</label>
									{field.type === "textarea" ? (
										<textarea
											rows={4}
											value={values[field.key] ?? ""}
											placeholder={field.placeholder}
											onChange={(e) => handleChange(field, e.target.value)}
										/>
									) : field.type === "image_url" ? (
										<div>
											<input
												type="url"
												value={values[field.key] ?? ""}
												placeholder={field.placeholder ?? "https://..."}
												onChange={(e) => handleChange(field, e.target.value)}
											/>
											{values[field.key] && (
												<div style={{ marginTop: "var(--space-2)" }}>
													<img
														src={values[field.key]}
														alt=""
														style={{ maxWidth: "100%", maxHeight: 120, borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
														onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
													/>
												</div>
											)}
										</div>
									) : (
										<input
											type={field.type === "url" ? "url" : "text"}
											value={values[field.key] ?? ""}
											placeholder={field.placeholder}
											onChange={(e) => handleChange(field, e.target.value)}
										/>
									)}
								</div>
							))}
						</div>

						<div className="admin-save-bar">
							{saved && (
								<span style={{ fontSize: "0.875rem", color: "var(--color-success, #16a34a)" }}>
									✓ Saved
								</span>
							)}
							<button className="btn btn-primary" onClick={handleSave}>
								Save section
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SiteContentAdmin;
