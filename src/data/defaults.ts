import cvImage from "../assets/cv.png";
import plannerImage from "../assets/myplanner.png";
import rnaImage from "../assets/rna.png";
import offlineImage from "../assets/offline.png";
import captionImage from "../assets/caption.png";
import type { HeroContent, ExperienceItem, Skill, Project } from "../types/content";

export const defaultHero: HeroContent = {
	id: "default",
	name: "Ally Nesta",
	label: "Full-Stack Web Developer",
	roles: ["Full Stack Developer", "React Specialist", "UI Enthusiast"],
	description:
		"Passionate about crafting exceptional digital experiences — from pixel-perfect frontends to robust backend systems. Work smart. Deliver quality.",
};

export const defaultExperience: ExperienceItem[] = [
	{
		id: "1",
		company: "Bilendi Services Ltd",
		role: "Lead Technical Scriptor",
		period: "2022 – Present",
		items: [
			"Implement new survey projects",
			"Participate in project launching meetings",
			"Survey programming at complexity levels 3–5: maxdiff, segmentation, conjoint, multicountry",
			"Hands-on with HTML, CSS, JavaScript, jQuery, and Python",
		],
		order_index: 0,
	},
	{
		id: "2",
		company: "SGS & CO Ltd",
		role: "Software QA Tester — Level 1",
		period: "2021",
		items: [
			"Ensured quality of evolutionary and corrective application versions",
			"Created user manuals for new features",
			"Created and executed test suites and test cases",
		],
		order_index: 1,
	},
	{
		id: "3",
		company: "Enabling Environments Ltd",
		role: "Web Developer",
		period: "2020",
		items: ["Maintenance of company website using WordPress"],
		order_index: 2,
	},
	{
		id: "4",
		company: "ABC Motor LTD",
		role: "IT Trainee",
		period: "2019",
		items: [
			"Helpdesk support — collecting staff requests via ticketing system",
			"Infrastructure support — on-site staff assistance",
			"Networking — Windows Server and firewall",
			"Web development — maintaining company website",
		],
		order_index: 3,
	},
];

export const defaultSkills: Skill[] = [
	{ id: "1", name: "HTML", rating: 4, category: "Frontend", order_index: 0 },
	{ id: "2", name: "CSS", rating: 3, category: "Frontend", order_index: 1 },
	{ id: "3", name: "JavaScript", rating: 3, category: "Frontend", order_index: 2 },
	{ id: "4", name: "React", rating: 2, category: "Frontend", order_index: 3 },
	{ id: "5", name: "Python", rating: 4, category: "Backend", order_index: 0 },
	{ id: "6", name: "PHP", rating: 3, category: "Backend", order_index: 1 },
	{ id: "7", name: "JavaScript", rating: 3, category: "Backend", order_index: 2 },
	{ id: "8", name: "GitHub", rating: 2, category: "Development Tools", order_index: 0 },
	{ id: "9", name: "VS Code", rating: 3, category: "Development Tools", order_index: 1 },
];

export const defaultProjects: Project[] = [
	{
		id: "1",
		image_url: plannerImage,
		alt: "Planner App Preview",
		title: "My Planner App",
		description: "A smart productivity app to organize tasks efficiently with calendar integration.",
		tags: ["TypeScript", "Node.js", "MongoDB"],
		link: "https://myplanner-green.vercel.app/",
		order_index: 0,
	},
	{
		id: "2",
		image_url: cvImage,
		alt: "CV Website Preview",
		title: "Personal CV Website",
		description: "A modern CV website showcasing skills and experience. Fully responsive and SEO optimized.",
		tags: ["React", "TypeScript", "Vite"],
		order_index: 1,
	},
	{
		id: "3",
		image_url: rnaImage,
		alt: "RNA-SEQ Preview",
		title: "RNA-SEQ Analysis",
		description: "A web-based platform for RNA-seq research with data visualization and user insights.",
		tags: ["R", "Shiny", "Bioinformatics"],
		link: "https://rnaseqanalysis.shinyapps.io/apps/",
		order_index: 2,
	},
	{
		id: "4",
		image_url: offlineImage,
		alt: "Offline Hike Preview",
		title: "Offline Hike",
		description: "A website for a tour guide featuring data presentation and booking functionality.",
		tags: ["HTML", "CSS", "JavaScript"],
		link: "https://offlinehike.com/",
		order_index: 3,
	},
	{
		id: "5",
		image_url: captionImage,
		alt: "Caption App Preview",
		title: "Random Quote Generator",
		description: "An interactive random quote generator leveraging a public quotes API.",
		tags: ["React", "JavaScript", "API"],
		link: "https://captions-woad.vercel.app/",
		order_index: 4,
	},
];
