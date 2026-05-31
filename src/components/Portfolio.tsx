import "../styles/portfolio.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import cvImage from "../assets/cv.png";
import plannerImage from "../assets/myplanner.png";
import rnaImage from "../assets/rna.png";
import offlineImage from "../assets/offline.png";
import captionImage from "../assets/caption.png";

interface Project {
	image: string;
	alt: string;
	title: string;
	description: string;
	tags: string[];
	link?: string;
}

const projects: Project[] = [
	{
		image: plannerImage,
		alt: "Planner App Preview",
		title: "My Planner App",
		description:
			"A smart productivity app to organize tasks efficiently with calendar integration.",
		tags: ["TypeScript", "Node.js", "MongoDB"],
		link: "https://myplanner-green.vercel.app/",
	},
	{
		image: cvImage,
		alt: "CV Website Preview",
		title: "Personal CV Website",
		description:
			"A modern CV website showcasing skills and experience. Fully responsive and SEO optimized.",
		tags: ["React", "TypeScript", "Vite"],
	},
	{
		image: rnaImage,
		alt: "RNA-SEQ Preview",
		title: "RNA-SEQ Analysis",
		description:
			"A web-based platform for RNA-seq research with data visualization and user insights.",
		tags: ["R", "Shiny", "Bioinformatics"],
		link: "https://rnaseqanalysis.shinyapps.io/apps/",
	},
	{
		image: offlineImage,
		alt: "Offline Hike Preview",
		title: "Offline Hike",
		description:
			"A website for a tour guide featuring data presentation and booking functionality.",
		tags: ["HTML", "CSS", "JavaScript"],
		link: "https://offlinehike.com/",
	},
	{
		image: captionImage,
		alt: "Caption App Preview",
		title: "Random Quote Generator",
		description:
			"An interactive random quote generator leveraging a public quotes API.",
		tags: ["React", "JavaScript", "API"],
		link: "https://captions-woad.vercel.app/",
	},
];

const Portfolio = () => {
	const sectionRef = useIntersectionObserver<HTMLElement>();

	return (
		<section
			className="portfolio-section"
			id="portfolio-section"
			ref={sectionRef}
		>
			<div className="section-container portfolio-container">
				<h2 className="section-title reveal">My Work</h2>
				<p className="section-subtitle reveal">
					Explore some of the projects I have built.
				</p>
				<div className="projects">
					{projects.map((project, index) => (
						<div
							key={index}
							className="project-card reveal"
							style={{ animationDelay: `${index * 80}ms` }}
						>
							<div className="img-wrap">
								<img
									src={project.image}
									alt={project.alt}
									className="portfolio-image"
								/>
								<div className="project-overlay">
									<p className="overlay-desc">{project.description}</p>
									{project.link && (
										<a
											href={project.link}
											className="overlay-link"
											target="_blank"
											rel="noopener noreferrer"
										>
											View Project →
										</a>
									)}
								</div>
							</div>
							<div className="project-card-body">
								<h3 className="project-title">{project.title}</h3>
								<div className="project-tags">
									{project.tags.map((tag) => (
										<span key={tag} className="tag">
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
