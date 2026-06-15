export interface SiteSection {
	tag: string;
	id?: string;
	role?: string;
	label: string;
	headings: { level: number; text: string }[];
	paragraphs: string[];
	images: { src: string; alt: string }[];
}

export interface ScanResult {
	url: string;
	title: string;
	description?: string;
	favicon?: string;
	sections: SiteSection[];
	allHeadings: { level: number; text: string }[];
	allImages: { src: string; alt: string }[];
	internalLinks: { href: string; text: string }[];
	externalLinks: { href: string; text: string }[];
	wordCount: number;
	scannedAt: string;
}

export function scanHTML(html: string, baseUrl: string): ScanResult {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");

	let origin = "";
	try {
		origin = new URL(baseUrl).origin;
	} catch {
		// invalid URL - skip link filtering
	}

	const title = doc.title?.trim() || "Untitled";
	const description =
		doc.querySelector('meta[name="description"]')?.getAttribute("content") ??
		undefined;

	const rawFavicon =
		doc
			.querySelector('link[rel="icon"], link[rel="shortcut icon"]')
			?.getAttribute("href") ?? undefined;
	const favicon = rawFavicon
		? rawFavicon.startsWith("http")
			? rawFavicon
			: `${origin}${rawFavicon.startsWith("/") ? "" : "/"}${rawFavicon}`
		: `${origin}/favicon.ico`;

	// Semantic sections
	const sectionEls = doc.querySelectorAll(
		"header, nav, main, section, footer, article, aside"
	);
	const sections: SiteSection[] = [];

	sectionEls.forEach((el) => {
		const headings = [...el.querySelectorAll("h1,h2,h3,h4,h5,h6")]
			.map((h) => ({ level: parseInt(h.tagName[1]), text: h.textContent?.trim() || "" }))
			.filter((h) => h.text);

		const paragraphs = [...el.querySelectorAll("p")]
			.map((p) => p.textContent?.trim() || "")
			.filter(Boolean)
			.slice(0, 5);

		const images = [...el.querySelectorAll("img")]
			.map((img) => ({ src: img.getAttribute("src") || "", alt: img.getAttribute("alt") || "" }))
			.filter((i) => i.src);

		const tag = el.tagName.toLowerCase();
		const id = el.id || undefined;
		const role = el.getAttribute("role") || undefined;
		const label =
			id
				? `<${tag}#${id}>`
				: role
				? `<${tag} role="${role}">`
				: `<${tag}>`;

		sections.push({ tag, id, role, label, headings, paragraphs, images });
	});

	// All headings
	const allHeadings = [...doc.querySelectorAll("h1,h2,h3,h4")]
		.map((h) => ({ level: parseInt(h.tagName[1]), text: h.textContent?.trim() || "" }))
		.filter((h) => h.text);

	// All images (cap at 24)
	const allImages = [...doc.querySelectorAll("img")]
		.map((img) => ({
			src: img.getAttribute("src") || "",
			alt: img.getAttribute("alt") || "",
		}))
		.filter((i) => i.src && !i.src.startsWith("data:"))
		.slice(0, 24);

	// Links
	const allLinks = [...doc.querySelectorAll("a[href]")]
		.map((a) => ({ href: a.getAttribute("href") || "", text: a.textContent?.trim() || "" }))
		.filter((l) => l.href && l.text && l.text.length < 80);

	const internalLinks = allLinks
		.filter((l) => l.href.startsWith("/") || (origin && l.href.includes(origin)))
		.slice(0, 30);
	const externalLinks = allLinks
		.filter((l) => l.href.startsWith("http") && (!origin || !l.href.includes(origin)))
		.slice(0, 30);

	const wordCount = (doc.body?.textContent || "").trim().split(/\s+/).filter(Boolean).length;

	return {
		url: baseUrl,
		title,
		description,
		favicon,
		sections,
		allHeadings,
		allImages,
		internalLinks,
		externalLinks,
		wordCount,
		scannedAt: new Date().toISOString(),
	};
}

export async function fetchAndScan(url: string): Promise<ScanResult> {
	let html: string;

	if (import.meta.env.PROD) {
		const res = await fetch(`/api/fetch-site?url=${encodeURIComponent(url)}`);
		if (!res.ok) throw new Error(`Proxy error ${res.status}`);
		html = await res.text();
	} else {
		// Dev fallback: public CORS proxy
		const res = await fetch(
			`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
		);
		if (!res.ok) throw new Error("CORS proxy unavailable");
		const data = await res.json();
		html = data.contents;
	}

	return scanHTML(html, url);
}
