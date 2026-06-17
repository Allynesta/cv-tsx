import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../../lib/supabase";
import { defaultSkills } from "../../data/defaults";
import { useToast } from "../toast";
import ConfirmModal from "../ConfirmModal";
import type { Skill, SkillCategory } from "../../types/content";

const CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Development Tools"];

const RatingInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
	<div className="rating-input">
		{[1, 2, 3, 4, 5].map((n) => (
			<button key={n} className="rating-star" onClick={() => onChange(n)} type="button" title={`${n}/5`}>
				{n <= value ? "★" : "☆"}
			</button>
		))}
	</div>
);

const SkillsAdmin = () => {
	const { toast } = useToast();
	const [skills, setSkills] = useState<Skill[]>(defaultSkills);
	const [loading, setLoading] = useState(isConfigured);
	const [newSkill, setNewSkill] = useState<{ category: SkillCategory; name: string; rating: number }>({
		category: "Frontend",
		name: "",
		rating: 3,
	});
	const [saving, setSaving] = useState<string | null>(null);
	const [confirm, setConfirm] = useState<{ id: string; name: string } | null>(null);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("skills")
			.select("*")
			.order("order_index")
			.then(({ data, error }) => {
				if (data?.length) setSkills(data);
				else if (error) toast("Failed to load skills", "error");
				setLoading(false);
			});
	}, []);

	const updateSkill = async (skill: Skill) => {
		setSaving(skill.id);
		try {
			if (isConfigured && supabase) {
				const { error } = await supabase.from("skills").update(skill).eq("id", skill.id);
				if (error) throw error;
			}
			setSkills((s) => s.map((x) => (x.id === skill.id ? skill : x)));
			toast("Skill updated");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to update", "error");
		} finally {
			setSaving(null);
		}
	};

	const deleteSkill = async (id: string) => {
		try {
			if (isConfigured && supabase) {
				const { error } = await supabase.from("skills").delete().eq("id", id);
				if (error) throw error;
			}
			setSkills((s) => s.filter((x) => x.id !== id));
			toast("Skill deleted");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to delete", "error");
		} finally {
			setConfirm(null);
		}
	};

	const addSkill = async () => {
		if (!newSkill.name.trim()) return;
		const order = skills.filter((s) => s.category === newSkill.category).length;
		const skill: Skill = {
			id: Date.now().toString(),
			name: newSkill.name,
			rating: newSkill.rating,
			category: newSkill.category,
			order_index: order,
		};
		try {
			if (isConfigured && supabase) {
				const { data, error } = await supabase
					.from("skills")
					.insert({ ...skill, id: undefined })
					.select()
					.single();
				if (error) throw error;
				if (data) skill.id = data.id;
			}
			setSkills((s) => [...s, skill]);
			setNewSkill((s) => ({ ...s, name: "" }));
			toast("Skill added");
		} catch (err) {
			toast(err instanceof Error ? err.message : "Failed to add skill", "error");
		}
	};

	if (loading) {
		return (
			<div>
				<h1 className="admin-page-title">Skills</h1>
				<div className="admin-page-loading"><span className="admin-loading-dot" /></div>
			</div>
		);
	}

	return (
		<div>
			<h1 className="admin-page-title">Skills</h1>
			<p className="admin-page-subtitle">Manage your skill set and ratings</p>

			{CATEGORIES.map((cat) => {
				const catSkills = skills.filter((s) => s.category === cat);
				return (
					<div className="admin-card" key={cat} style={{ marginBottom: "var(--space-5)" }}>
						<div className="admin-card-header">
							<span className="admin-card-title">{cat}</span>
							<span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
								{catSkills.length} skill{catSkills.length !== 1 ? "s" : ""}
							</span>
						</div>
						<table className="skill-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Rating</th>
									<th style={{ width: 100 }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{catSkills.map((skill) => (
									<SkillRow
										key={skill.id}
										skill={skill}
										saving={saving === skill.id}
										onSave={updateSkill}
										onDelete={(id, name) => setConfirm({ id, name })}
									/>
								))}
								{catSkills.length === 0 && (
									<tr>
										<td colSpan={3} style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}>
											No skills yet
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				);
			})}

			<div className="admin-card">
				<div className="admin-card-header">
					<span className="admin-card-title">Add a skill</span>
				</div>
				<div className="admin-field-row" style={{ alignItems: "flex-end" }}>
					<div className="admin-field">
						<label>Category</label>
						<select
							value={newSkill.category}
							onChange={(e) => setNewSkill((s) => ({ ...s, category: e.target.value as SkillCategory }))}
						>
							{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
						</select>
					</div>
					<div className="admin-field">
						<label>Skill name</label>
						<input
							value={newSkill.name}
							onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
							placeholder="e.g. TypeScript"
							onKeyDown={(e) => e.key === "Enter" && addSkill()}
						/>
					</div>
					<div className="admin-field">
						<label>Rating</label>
						<RatingInput value={newSkill.rating} onChange={(v) => setNewSkill((s) => ({ ...s, rating: v }))} />
					</div>
					<button className="btn btn-primary" onClick={addSkill} style={{ alignSelf: "flex-end" }}>
						Add
					</button>
				</div>
			</div>

			{confirm && (
				<ConfirmModal
					message={`Delete "${confirm.name}"? This cannot be undone.`}
					onConfirm={() => deleteSkill(confirm.id)}
					onCancel={() => setConfirm(null)}
				/>
			)}
		</div>
	);
};

const SkillRow = ({
	skill,
	saving,
	onSave,
	onDelete,
}: {
	skill: Skill;
	saving: boolean;
	onSave: (s: Skill) => void;
	onDelete: (id: string, name: string) => void;
}) => {
	const [local, setLocal] = useState(skill);
	const dirty = local.name !== skill.name || local.rating !== skill.rating;

	return (
		<tr>
			<td>
				<input
					type="text"
					value={local.name}
					onChange={(e) => setLocal((s) => ({ ...s, name: e.target.value }))}
				/>
			</td>
			<td>
				<div className="rating-input">
					{[1, 2, 3, 4, 5].map((n) => (
						<button
							key={n}
							className="rating-star"
							onClick={() => setLocal((s) => ({ ...s, rating: n }))}
							type="button"
							title={`${n}/5`}
							style={{ fontSize: "1rem" }}
						>
							{n <= local.rating ? "★" : "☆"}
						</button>
					))}
				</div>
			</td>
			<td>
				<div style={{ display: "flex", gap: "var(--space-2)" }}>
					{dirty && (
						<button className="btn btn-primary btn-sm" onClick={() => onSave(local)} disabled={saving}>
							{saving ? "…" : "Save"}
						</button>
					)}
					<button className="btn btn-danger btn-sm" onClick={() => onDelete(skill.id, skill.name)}>✕</button>
				</div>
			</td>
		</tr>
	);
};

export default SkillsAdmin;
