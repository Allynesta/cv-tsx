const STORAGE_PREFIX = "cms_content_";

function key(siteId: string, sectionId: string) {
	return `${STORAGE_PREFIX}${siteId}_${sectionId}`;
}

export function loadSectionContent(siteId: string, sectionId: string): Record<string, string> {
	try {
		const raw = localStorage.getItem(key(siteId, sectionId));
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

export function saveSectionContent(siteId: string, sectionId: string, values: Record<string, string>) {
	try {
		localStorage.setItem(key(siteId, sectionId), JSON.stringify(values));
	} catch {
		// localStorage unavailable
	}
}

export function loadAllSiteContent(siteId: string): Record<string, Record<string, string>> {
	try {
		const prefix = `${STORAGE_PREFIX}${siteId}_`;
		const result: Record<string, Record<string, string>> = {};
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (k?.startsWith(prefix)) {
				const sectionId = k.slice(prefix.length);
				const raw = localStorage.getItem(k);
				if (raw) result[sectionId] = JSON.parse(raw);
			}
		}
		return result;
	} catch {
		return {};
	}
}
