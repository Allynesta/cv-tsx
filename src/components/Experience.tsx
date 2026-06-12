import { useState } from "react";
import "../styles/experience.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useExperience } from "../hooks/useContent";

const Experience = () => {
	const experienceData = useExperience();
	const [expandedPanel, setExpandedPanel] = useState<number | null>(null);
	const sectionRef = useIntersectionObserver<HTMLElement>();

	const togglePanel = (index: number) => {
		setExpandedPanel((prev) => (prev === index ? null : index));
	};

	return (
		<section
			className="experience-section"
			id="experience-section"
			ref={sectionRef}
		>
			<div className="section-container">
				<h2 className="section-title reveal">Working Experience</h2>
				<div className="timeline">
					{experienceData.map((exp, index) => (
						<div
							key={exp.id}
							className={`timeline-item reveal${expandedPanel === index ? " expanded" : ""}`}
							style={{ animationDelay: `${index * 80}ms` }}
						>
							<div className="timeline-dot" />
							<div className="timeline-content">
								<button
									className="timeline-header"
									onClick={() => togglePanel(index)}
									aria-expanded={expandedPanel === index}
								>
									<div className="timeline-header-info">
										<span className="timeline-company">{exp.company}</span>
										<span className="timeline-role">{exp.role}</span>
										<span className="timeline-period">{exp.period}</span>
									</div>
									<span className="timeline-chevron" aria-hidden="true">
										{expandedPanel === index ? "−" : "+"}
									</span>
								</button>
								<div
									className={`timeline-body${expandedPanel === index ? " open" : ""}`}
								>
									<ul>
										{exp.items.map((item, i) => (
											<li key={i}>{item}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;
