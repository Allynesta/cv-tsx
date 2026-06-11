import "../styles/portfolio.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useProjects } from "../hooks/useContent";

const Portfolio = () => {
	const sectionRef = useIntersectionObserver<HTMLElement>();
	const projects = useProjects();

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
							key={project.id}
							className="project-card reveal"
							style={{ animationDelay: `${index * 80}ms` }}
						>
							<div className="img-wrap">
								<img
									src={project.image_url}
									alt={project.alt}
									className="portfolio-image"
									loading="lazy"
									decoding="async"
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
