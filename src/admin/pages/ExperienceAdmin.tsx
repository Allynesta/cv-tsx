import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultExperience } from "../../data/defaults";
import { useToast } from "../toast";
import ConfirmModal from "../ConfirmModal";
import type { ExperienceItem } from "../../types/content";

const emptyItem = (): ExperienceItem => ({
	id: "",
	company: "",
	role: "",
	period: "",
	items: [""],
	order_index: 0,
});

const ExperienceAdmin = () => {
	const { toast } = useToast();
	const [list, setList] = useState<ExperienceItem[]>(defaultExperience);
	const [loading, setLoading] = useState(isConfigured);
	const [editing, setEditing] = useState<string | null>(null);
	const [form, setForm] = useState<ExperienceItem>(emptyItem());
	const [saving, setSaving] = useState(false);
	const [isNew, setIsNew] = useState(false);
	const [confirm, setConfirm] = useState<{ id: string; company: string } | null>(null);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("experience")
			.select("*")
			.order("order_index")
			.then(({ data, error }) => {
				if (data?.length) setList(data);
				else if (error) toast("Failed to load experience", "error");
				setLoading(false);
			});
	}, []);

	const startEdit = (item: ExperienceItem) => {
		setForm({ ...item });
		setEditing(item.id);
		setIsNew(false);
	};

	const startNew = () => {
		setForm({ ...emptyItem(), order_index: list.length });
		setEditing("__new__");
		setIsNew(true);
	};

	const cancel = () => setEditing(null);

	const setField = (key: keyof ExperienceItem, val: string | string[] | number) => {
		setForm((f) => ({ ...f, [key]: val }));
	};

	const save = async () => {
		setSaving(true);
		try {
			if (isConfigured && supabase) {
				if (isNew) {
					const { data, error } = await supabase
						.from("experience")
						.insert({ ...form, id: undefined })
						.select()
						.single();
					if (error) throw error;
					if (data) setList((l) => [...l, data]);
				} else {
					const { error } = await supabase.from("experience").update(form).eq("id", form.id);
					if (error) throw error;
					setList((l) => l.map((x) => (x.id === form.id ? form : x)));
				}
			} else {
				if (isNew) {
					setList((l) => [...l, { ...form, id: Date.now().toString() }]);
				} else {
					setList((l) => l.map((x) => (x.id === form.id ? form : x)));
				}
			}
			toast(isNew ? "Entry added" : "Changes saved");
			setEditing(null);
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to save", "error");
		} finally {
			setSaving(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (isConfigured && supabase) {
				const { error } = await supabase.from("experience").delete().eq("id", id);
				if (error) throw error;
			}
			setList((l) => l.filter((x) => x.id !== id));
			if (editing === id) setEditing(null);
			toast("Entry deleted");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to delete", "error");
		} finally {
			setConfirm(null);
		}
	};

	const EntryForm = () => (
		<div className="admin-form">
			<div className="admin-field-row-3">
				<div className="admin-field">
					<label>Company</label>
					<input value={form.company} onChange={(e) => setField("company", e.target.value)} />
				</div>
				<div className="admin-field">
					<label>Role</label>
					<input value={form.role} onChange={(e) => setField("role", e.target.value)} />
				</div>
				<div className="admin-field">
					<label>Period</label>
					<input value={form.period} onChange={(e) => setField("period", e.target.value)} placeholder="e.g. 2022 – Present" />
				</div>
			</div>
			<div className="admin-field">
				<label>Bullet points</label>
				<div className="array-editor">
					{form.items.map((item, i) => (
						<div className="array-item" key={i}>
							<input
								value={item}
								onChange={(e) => {
									const items = [...form.items];
									items[i] = e.target.value;
									setField("items", items);
								}}
								placeholder="Add a responsibility or achievement"
							/>
							<button className="btn-icon" onClick={() => setField("items", form.items.filter((_, idx) => idx !== i))} title="Remove">✕</button>
						</div>
					))}
					<button className="btn btn-secondary btn-sm" onClick={() => setField("items", [...form.items, ""])} style={{ alignSelf: "flex-start" }}>
						+ Add bullet
					</button>
				</div>
			</div>
			<div className="admin-save-bar">
				<button className="btn btn-secondary" onClick={cancel}>Cancel</button>
				<button className="btn btn-primary" onClick={save} disabled={saving}>
					{saving ? "Saving…" : isNew ? "Add entry" : "Save"}
				</button>
			</div>
		</div>
	);

	if (loading) {
		return (
			<div>
				<h1 className="admin-page-title">Experience</h1>
				<div className="admin-page-loading"><span className="admin-loading-dot" /></div>
			</div>
		);
	}

	return (
		<div>
			<h1 className="admin-page-title">Experience</h1>
			<p className="admin-page-subtitle">Manage your work history</p>

			<div className="admin-list">
				{list.map((exp) => (
					<div className="admin-list-item" key={exp.id}>
						<div className="admin-list-item-header">
							<div className="admin-list-item-info">
								<div className="admin-list-item-title">{exp.company}</div>
								<div className="admin-list-item-sub">{exp.role} · {exp.period}</div>
							</div>
							<div className="admin-list-item-actions">
								<button className="btn btn-secondary btn-sm" onClick={() => startEdit(exp)}>Edit</button>
								<button className="btn btn-danger btn-sm" onClick={() => setConfirm({ id: exp.id, company: exp.company })}>Delete</button>
							</div>
						</div>
						{editing === exp.id && (
							<div className="admin-list-item-body"><EntryForm /></div>
						)}
					</div>
				))}

				{editing === "__new__" && (
					<div className="admin-list-item">
						<div className="admin-list-item-title" style={{ marginBottom: "var(--space-4)" }}>New experience entry</div>
						<EntryForm />
					</div>
				)}
			</div>

			{editing !== "__new__" && (
				<button className="btn btn-secondary" style={{ marginTop: "var(--space-4)" }} onClick={startNew}>
					+ Add experience
				</button>
			)}

			{confirm && (
				<ConfirmModal
					message={`Delete "${confirm.company}"? This cannot be undone.`}
					onConfirm={() => remove(confirm.id)}
					onCancel={() => setConfirm(null)}
				/>
			)}
		</div>
	);
};

export default ExperienceAdmin;
