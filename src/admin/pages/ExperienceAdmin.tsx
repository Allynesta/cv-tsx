import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultExperience } from "../../data/defaults";
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
	const [list, setList] = useState<ExperienceItem[]>(defaultExperience);
	const [editing, setEditing] = useState<string | null>(null);
	const [form, setForm] = useState<ExperienceItem>(emptyItem());
	const [saving, setSaving] = useState(false);
	const [isNew, setIsNew] = useState(false);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase.from("experience").select("*").order("order_index").then(({ data }) => {
			if (data?.length) setList(data);
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

	const setItem = (i: number, val: string) => {
		const items = [...form.items];
		items[i] = val;
		setField("items", items);
	};

	const addItem = () => setField("items", [...form.items, ""]);

	const removeItem = (i: number) =>
		setField("items", form.items.filter((_, idx) => idx !== i));

	const save = async () => {
		setSaving(true);
		if (isConfigured && supabase) {
			if (isNew) {
				const { data } = await supabase
					.from("experience")
					.insert({ ...form, id: undefined })
					.select()
					.single();
				if (data) setList((l) => [...l, data]);
			} else {
				await supabase.from("experience").update(form).eq("id", form.id);
				setList((l) => l.map((x) => (x.id === form.id ? form : x)));
			}
		} else {
			if (isNew) {
				const newItem = { ...form, id: Date.now().toString() };
				setList((l) => [...l, newItem]);
			} else {
				setList((l) => l.map((x) => (x.id === form.id ? form : x)));
			}
		}
		setSaving(false);
		setEditing(null);
	};

	const remove = async (id: string) => {
		if (!confirm("Delete this experience entry?")) return;
		if (isConfigured && supabase) {
			await supabase.from("experience").delete().eq("id", id);
		}
		setList((l) => l.filter((x) => x.id !== id));
		if (editing === id) setEditing(null);
	};

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
								<button className="btn btn-secondary btn-sm" onClick={() => startEdit(exp)}>
									Edit
								</button>
								<button className="btn btn-danger btn-sm" onClick={() => remove(exp.id)}>
									Delete
								</button>
							</div>
						</div>

						{editing === exp.id && (
							<div className="admin-list-item-body">
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
														onChange={(e) => setItem(i, e.target.value)}
														placeholder="Add a responsibility or achievement"
													/>
													<button className="btn-icon" onClick={() => removeItem(i)} title="Remove">✕</button>
												</div>
											))}
											<button className="btn btn-secondary btn-sm" onClick={addItem} style={{ alignSelf: "flex-start" }}>
												+ Add bullet
											</button>
										</div>
									</div>
									<div className="admin-save-bar">
										<button className="btn btn-secondary" onClick={cancel}>Cancel</button>
										<button className="btn btn-primary" onClick={save} disabled={saving}>
											{saving ? "Saving…" : "Save"}
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				))}

				{editing === "__new__" && (
					<div className="admin-list-item">
						<div className="admin-list-item-title" style={{ marginBottom: "var(--space-4)" }}>
							New experience entry
						</div>
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
												onChange={(e) => setItem(i, e.target.value)}
												placeholder="Add a responsibility or achievement"
											/>
											<button className="btn-icon" onClick={() => removeItem(i)} title="Remove">✕</button>
										</div>
									))}
									<button className="btn btn-secondary btn-sm" onClick={addItem} style={{ alignSelf: "flex-start" }}>
										+ Add bullet
									</button>
								</div>
							</div>
							<div className="admin-save-bar">
								<button className="btn btn-secondary" onClick={cancel}>Cancel</button>
								<button className="btn btn-primary" onClick={save} disabled={saving}>
									{saving ? "Saving…" : "Add entry"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{editing !== "__new__" && (
				<button className="btn btn-secondary" style={{ marginTop: "var(--space-4)" }} onClick={startNew}>
					+ Add experience
				</button>
			)}
		</div>
	);
};

export default ExperienceAdmin;
