import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultHero } from "../../data/defaults";
import { useToast } from "../toast";
import type { HeroContent } from "../../types/content";

const HeroAdmin = () => {
	const { toast } = useToast();
	const [form, setForm] = useState<HeroContent>(defaultHero);
	const [loading, setLoading] = useState(isConfigured);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("hero")
			.select("*")
			.single()
			.then(({ data, error }) => {
				if (data) setForm(data);
				else if (error && error.code !== "PGRST116") {
					toast("Failed to load hero content", "error");
				}
				setLoading(false);
			});
	}, []);

	const set = (key: keyof HeroContent, value: string | string[]) => {
		setForm((f) => ({ ...f, [key]: value }));
	};

	const setRole = (i: number, val: string) => {
		const roles = [...form.roles];
		roles[i] = val;
		set("roles", roles);
	};

	const save = async () => {
		setSaving(true);
		try {
			if (isConfigured && supabase) {
				const { error } = await supabase
					.from("hero")
					.upsert({ ...form, id: form.id === "default" ? undefined : form.id });
				if (error) throw error;
			}
			toast("Changes saved");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to save", "error");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div>
				<h1 className="admin-page-title">Hero / About</h1>
				<div className="admin-page-loading"><span className="admin-loading-dot" /></div>
			</div>
		);
	}

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
										onClick={() => set("roles", form.roles.filter((_, idx) => idx !== i))}
										disabled={form.roles.length <= 1}
										title="Remove"
									>
										✕
									</button>
								</div>
							))}
							<button
								className="btn btn-secondary btn-sm"
								onClick={() => set("roles", [...form.roles, ""])}
								style={{ alignSelf: "flex-start" }}
							>
								+ Add role
							</button>
						</div>
					</div>

					<div className="admin-save-bar">
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
