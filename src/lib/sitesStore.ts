import type { RegisteredSite } from "../types/content";

const KEY = "cms_sites";

const DEFAULT_CV_SITE: RegisteredSite = {
	id: "cv-tsx",
	name: "Personal CV",
	url: typeof window !== "undefined" ? window.location.origin : "https://devmycv-allynesta.vercel.app",
	type: "owned",
	created_at: new Date().toISOString(),
};

export function loadSites(): RegisteredSite[] {
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) return JSON.parse(raw);
	} catch {
		// ignore
	}
	return [DEFAULT_CV_SITE];
}

export function saveSites(sites: RegisteredSite[]): void {
	try {
		localStorage.setItem(KEY, JSON.stringify(sites));
	} catch {
		// ignore
	}
}

export function addSite(site: RegisteredSite): RegisteredSite[] {
	const sites = loadSites();
	const updated = [...sites, site];
	saveSites(updated);
	return updated;
}

export function updateSite(id: string, patch: Partial<RegisteredSite>): RegisteredSite[] {
	const sites = loadSites().map((s) => (s.id === id ? { ...s, ...patch } : s));
	saveSites(sites);
	return sites;
}

export function removeSite(id: string): RegisteredSite[] {
	const sites = loadSites().filter((s) => s.id !== id);
	saveSites(sites);
	return sites;
}
