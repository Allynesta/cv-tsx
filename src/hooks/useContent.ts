import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../lib/supabase";
import {
	defaultHero,
	defaultExperience,
	defaultSkills,
	defaultProjects,
} from "../data/defaults";
import type { HeroContent, ExperienceItem, Skill, Project } from "../types/content";

export function useHero() {
	const [hero, setHero] = useState<HeroContent>(defaultHero);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("hero")
			.select("*")
			.single()
			.then(({ data }) => {
				if (data) setHero(data);
			});
	}, []);

	return hero;
}

export function useExperience() {
	const [items, setItems] = useState<ExperienceItem[]>(defaultExperience);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("experience")
			.select("*")
			.order("order_index")
			.then(({ data }) => {
				if (data?.length) setItems(data);
			});
	}, []);

	return items;
}

export function useSkills() {
	const [skills, setSkills] = useState<Skill[]>(defaultSkills);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("skills")
			.select("*")
			.order("order_index")
			.then(({ data }) => {
				if (data?.length) setSkills(data);
			});
	}, []);

	return skills;
}

export function useProjects() {
	const [projects, setProjects] = useState<Project[]>(defaultProjects);

	useEffect(() => {
		if (!isConfigured || !supabase) return;
		supabase
			.from("projects")
			.select("*")
			.order("order_index")
			.then(({ data }) => {
				if (data?.length) setProjects(data);
			});
	}, []);

	return projects;
}
