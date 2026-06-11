import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultProjects } from "../../data/defaults";
import type { Project } from "../../types/content";

const emptyProject = (order: number): Project => ({
	id: "",
	title: "",
	description: "",
	tags: [],
	image_url: "",
	alt: "",
	link: "",
	order_index: order,
});

const TagsEditor = ({
	tags,
	onChange,
}: {
	tags: string[];
	onChange: (tags: string[]) => void;
}) => {
	const [input, setInput] = useState("");

	const addTag = () => {
		const t = input.trim();
		if (!t || tags.includes(t)) return;
		onChange([...tags, t]);
		setInput("");
	};

	return (
		<div className="tags-editor">
			{tags.map((tag) => (
				<span key={tag} className="tag-chip">
					{tag}
					<button onClick={() => onChange(tags.filter((t) => t !== tag))} title="Remove tag">×</button>
				</span>
			))}
			<input
				className="tag-input"
				placeholder="Add tag…"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
				}}
				onBlur={addTag}
			/>
		</div>
	);
};

const ProjectsAdmin = () => {
	const [list, setList] = useState<Project[]>(defaultProjects);
	const [editing, setEditing] = useState<string | null>(null);
	const [form, setForm] = useState<Project>(emptyProject(0));
	const [saving, setSaving] = useState(false);
	const [isNew, setIsNew] = useState(false);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase.from("projects").select("*").order("order_index").then(({ data }) => {
			if (data?.length) setList(data);
		});
	}, []);

	const startEdit = (p: Project) => { setForm({ ...p }); setEditing(p.id); setIsNew(false); };
	const startNew = () => { setForm(emptyProject(list.length)); setEditing("__new__"); setIsNew(true); };
	const cancel = () => setEditing(null);

	const set = <K extends keyof Project>(key: K, val: Project[K]) => {
		setForm((f) => ({ ...f, [key]: val }));
	};

	const save = async () => {
		setSaving(true);
		if (isConfigured && supabase) {
			if (isNew) {
				const { data } = await supabase
					.from("projects")
					.insert({ ...form, id: undefined })
					.select()
					.single();
				if (data) setList((l) => [...l, data]);
			} else {
				await supabase.from("projects").update(form).eq("id", form.id);
				setList((l) => l.map((x) => (x.id === form.id ? form : x)));
			}
		} else {
			if (isNew) {
				setList((l) => [...l, { ...form, id: Date.now().toString() }]);
			} else {
				setList((l) => l.map((x) => (x.id === form.id ? form : x)));
			}
		}
		setSaving(false);
		setEditing(null);
	};

	const remove = async (id: string) => {
		if (!confirm("Delete this project?")) return;
		if (isConfigured && supabase) await supabase.from("projects").delete().eq("id", id);
		setList((l) => l.filter((x) => x.id !== id));
		if (editing === id) setEditing(null);
	};

	const ProjectForm = () => (
		<div className="admin-form">
			<div className="admin-field-row">
				<div className="admin-field">
					<label>Title</label>
					<input value={form.title} onChange={(e) => set("title", e.target.value)} />
				</div>
				<div className="admin-field">
					<label>Alt text</label>
					<input value={form.alt} onChange={(e) => set("alt", e.target.value)} placeholder="Image description" />
				</div>
			</div>
			<div className="admin-field">
				<label>Description</label>
				<textarea value={form.description} onChange={(e) => set("description", e.target.value)} />
			</div>
			<div className="admin-field">
				<label>Image URL</label>
				<input
					value={form.image_url}
					onChange={(e) => set("image_url", e.target.value)}
					placeholder="https://... or leave blank"
				/>
				{form.image_url ? (
					<img src={form.image_url} alt="" className="img-preview" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
				) : (
					<div className="img-preview-placeholder">No image</div>
				)}
			</div>
			<div className="admin-field">
				<label>Live URL (optional)</label>
				<input value={form.link ?? ""} onChange={(e) => set("link", e.target.value)} placeholder="https://..." />
			</div>
			<div className="admin-field">
				<label>Tags (press Enter or comma to add)</label>
				<TagsEditor tags={form.tags} onChange={(tags) => set("tags", tags)} />
			</div>
			<div className="admin-save-bar">
				<button className="btn btn-secondary" onClick={cancel}>Cancel</button>
				<button className="btn btn-primary" onClick={save} disabled={saving}>
					{saving ? "Saving…" : isNew ? "Add project" : "Save changes"}
				</button>
			</div>
		</div>
	);

	return (
		<div>
			<h1 className="admin-page-title">Projects</h1>
			<p className="admin-page-subtitle">Manage your portfolio projects</p>

			<div className="admin-list">
				{list.map((p) => (
					<div className="admin-list-item" key={p.id}>
						<div className="admin-list-item-header">
							<div className="admin-list-item-info">
								<div className="admin-list-item-title">{p.title || <em style={{ opacity: 0.5 }}>Untitled</em>}</div>
								<div className="admin-list-item-sub">
									{p.tags.join(", ")} {p.link && <>· <a href={p.link} target="_blank" rel="noreferrer">↗ live</a></>}
								</div>
							</div>
							<div className="admin-list-item-actions">
								<button className="btn btn-secondary btn-sm" onClick={() => startEdit(p)}>Edit</button>
								<button className="btn btn-danger btn-sm" onClick={() => remove(p.id)}>Delete</button>
							</div>
						</div>
						{editing === p.id && (
							<div className="admin-list-item-body">
								<ProjectForm />
							</div>
						)}
					</div>
				))}

				{editing === "__new__" && (
					<div className="admin-list-item">
						<div className="admin-list-item-title" style={{ marginBottom: "var(--space-4)" }}>New project</div>
						<ProjectForm />
					</div>
				)}
			</div>

			{editing !== "__new__" && (
				<button className="btn btn-secondary" style={{ marginTop: "var(--space-4)" }} onClick={startNew}>
					+ Add project
				</button>
			)}
		</div>
	);
};

export default ProjectsAdmin;
