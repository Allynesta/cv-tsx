import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultHero } from "../../data/defaults";
import type { HeroContent } from "../../types/content";

const HeroAdmin = () => {
	const [form, setForm] = useState<HeroContent>(defaultHero);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase.from("hero").select("*").single().then(({ data }) => {
			if (data) setForm(data);
		});
	}, []);

	const set = (key: keyof HeroContent, value: string | string[]) => {
		setForm((f) => ({ ...f, [key]: value }));
		setSaved(false);
	};

	const setRole = (i: number, val: string) => {
		const roles = [...form.roles];
		roles[i] = val;
		set("roles", roles);
	};

	const addRole = () => set("roles", [...form.roles, ""]);

	const removeRole = (i: number) =>
		set("roles", form.roles.filter((_, idx) => idx !== i));

	const save = async () => {
		setSaving(true);
		if (isConfigured && supabase) {
			await supabase.from("hero").upsert({ ...form, id: form.id === "default" ? undefined : form.id });
		}
		setSaving(false);
		setSaved(true);
	};

	return (
		<div>
			<h1 className="admin-page-title">Hero / About</h1>
			<p className="admin-page-subtitle">Edit the top section of your site</p>

			<div className="admin-card">
				<div className="admin-form">
					<div className="admin-field-row">
						<div className="admin-field">
							<label>Your name</label>
							<input value={form.name} onChange={(e) => set("name", e.target.value)} />
						</div>
						<div className="admin-field">
							<label>Label (shown above name)</label>
							<input value={form.label} onChange={(e) => set("label", e.target.value)} />
						</div>
					</div>

					<div className="admin-field">
						<label>Bio / Description</label>
						<textarea value={form.description} onChange={(e) => set("description", e.target.value)} />
					</div>

					<div className="admin-field">
						<label>Typewriter roles</label>
						<div className="array-editor">
							{form.roles.map((role, i) => (
								<div className="array-item" key={i}>
									<input
										value={role}
										onChange={(e) => setRole(i, e.target.value)}
										placeholder="e.g. Full Stack Developer"
									/>
									<button
										className="btn-icon"
										onClick={() => removeRole(i)}
										disabled={form.roles.length <= 1}
										title="Remove"
									>
										✕
									</button>
								</div>
							))}
							<button className="btn btn-secondary btn-sm" onClick={addRole} style={{ alignSelf: "flex-start" }}>
								+ Add role
							</button>
						</div>
					</div>

					<div className="admin-save-bar">
						{saved && <span className="admin-save-msg">✓ Saved</span>}
						<button className="btn btn-primary" onClick={save} disabled={saving}>
							{saving ? "Saving…" : "Save changes"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroAdmin;
