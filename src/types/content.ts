export interface HeroContent {
	id: string;
	name: string;
	label: string;
	roles: string[];
	description: string;
}

export interface ExperienceItem {
	id: string;
	company: string;
	role: string;
	period: string;
	items: string[];
	order_index: number;
}

export type SkillCategory = "Frontend" | "Backend" | "Development Tools";

export interface Skill {
	id: string;
	name: string;
	rating: number;
	category: SkillCategory;
	order_index: number;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	image_url: string;
	alt: string;
	link?: string;
	order_index: number;
}

export interface RegisteredSite {
	id: string;
	name: string;
	url: string;
	type: "owned" | "external";
	webhook_url?: string;
	scan_data?: import("../lib/siteScanner").ScanResult;
	last_scanned_at?: string;
	created_at: string;
}
