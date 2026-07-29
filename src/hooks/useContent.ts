import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../lib/supabase";
import {
	defaultHero,
	defaultExperience,
	defaultSkills,
	defaultProjects,
} from "../data/defaults";
import type { HeroContent, ExperienceItem, Skill, Project } from "../types/content";

// The database seed stores an empty `image_url` for every project (images
// were never uploaded there — only bundled locally). Whenever a row comes
// back without one, fall back to the bundled default image for that slot so
// the UI never renders a broken <img>.
export function withImageFallback(projects: Project[]): Project[] {
	return projects.map((p, i) => {
		if (p.image_url) return p;
		const fallback =
			defaultProjects.find((d) => d.order_index === p.order_index) ??
			defaultProjects[i];
		return fallback ? { ...p, image_url: fallback.image_url } : p;
	});
}

export function useHero() {
	const [hero, setHero] = useState<HeroContent>(defaultHero);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		const client = supabase;

		const load = () => {
			client
				.from("hero")
				.select("*")
				.single()
				.then(({ data }) => {
					if (data) setHero(data);
				});
		};
		load();

		const channel = client
			.channel("public:hero")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "hero" },
				load,
			)
			.subscribe();

		return () => {
			client.removeChannel(channel);
		};
	}, []);

	return hero;
}

export function useExperience() {
	const [items, setItems] = useState<ExperienceItem[]>(defaultExperience);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		const client = supabase;

		const load = () => {
			client
				.from("experience")
				.select("*")
				.order("order_index")
				.then(({ data }) => {
					if (data?.length) setItems(data);
				});
		};
		load();

		const channel = client
			.channel("public:experience")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "experience" },
				load,
			)
			.subscribe();

		return () => {
			client.removeChannel(channel);
		};
	}, []);

	return items;
}

export function useSkills() {
	const [skills, setSkills] = useState<Skill[]>(defaultSkills);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		const client = supabase;

		const load = () => {
			client
				.from("skills")
				.select("*")
				.order("order_index")
				.then(({ data }) => {
					if (data?.length) setSkills(data);
				});
		};
		load();

		const channel = client
			.channel("public:skills")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "skills" },
				load,
			)
			.subscribe();

		return () => {
			client.removeChannel(channel);
		};
	}, []);

	return skills;
}

export function useProjects() {
	const [projects, setProjects] = useState<Project[]>(defaultProjects);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		const client = supabase;

		const load = () => {
			client
				.from("projects")
				.select("*")
				.order("order_index")
				.then(({ data }) => {
					if (data?.length) setProjects(withImageFallback(data));
				});
		};
		load();

		const channel = client
			.channel("public:projects")
			.on(
				"postgres_changes",
				{ event: "*", schema: "public", table: "projects" },
				load,
			)
			.subscribe();

		return () => {
			client.removeChannel(channel);
		};
	}, []);

	return projects;
}
