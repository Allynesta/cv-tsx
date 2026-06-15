import type { ScanResult } from "./siteScanner";

export type FieldType = "text" | "textarea" | "image_url" | "url";

export interface ContentField {
	key: string;
	label: string;
	type: FieldType;
	value: string;
	placeholder?: string;
}

export interface ContentSection {
	id: string;
	label: string;
	icon: string;
	tag: string;
	fields: ContentField[];
}

export interface SiteSchema {
	siteId: string;
	sections: ContentSection[];
}

const TAG_ICONS: Record<string, string> = {
	header: "▤",
	nav: "≡",
	main: "◧",
	section: "▣",
	article: "✦",
	aside: "◫",
	footer: "▥",
};

function labelFor(tag: string, id?: string, role?: string, index?: number): string {
	if (id) return id.charAt(0).toUpperCase() + id.slice(1).replace(/-_/g, " ");
	if (role) return role.charAt(0).toUpperCase() + role.slice(1);
	const base = tag.charAt(0).toUpperCase() + tag.slice(1);
	return index !== undefined && index > 0 ? `${base} ${index + 1}` : base;
}

export function buildSchema(scan: ScanResult, siteId: string): SiteSchema {
	// Count occurrences of each tag so we can number duplicates
	const tagCount: Record<string, number> = {};

	const sections: ContentSection[] = scan.sections
		.filter(
			(s) =>
				s.headings.length > 0 ||
				s.paragraphs.length > 0 ||
				s.images.length > 0
		)
		.map((s) => {
			tagCount[s.tag] = (tagCount[s.tag] ?? 0) + 1;
			const tagIdx = tagCount[s.tag] - 1;

			const fields: ContentField[] = [];

			// Headings → text inputs
			s.headings.slice(0, 3).forEach((h, j) => {
				fields.push({
					key: `heading_${j}`,
					label: j === 0 ? "Heading" : `Sub-heading ${j}`,
					type: "text",
					value: h.text,
					placeholder: `H${h.level} text`,
				});
			});

			// Paragraphs → textareas
			s.paragraphs.slice(0, 3).forEach((p, j) => {
				fields.push({
					key: `paragraph_${j}`,
					label: j === 0 ? "Content" : `Paragraph ${j + 1}`,
					type: "textarea",
					value: p,
					placeholder: "Body text",
				});
			});

			// Images → image URL inputs
			s.images.slice(0, 2).forEach((img, j) => {
				fields.push({
					key: `image_${j}`,
					label: img.alt || `Image ${j + 1}`,
					type: "image_url",
					value: img.src,
					placeholder: "https://...",
				});
			});

			const id = `${s.tag}_${s.id || tagIdx}`;
			const label = labelFor(s.tag, s.id, s.role, s.id ? undefined : tagIdx);

			return {
				id,
				label,
				icon: TAG_ICONS[s.tag] ?? "▣",
				tag: s.tag,
				fields,
			};
		});

	return { siteId, sections };
}
