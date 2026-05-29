import { useState } from "react";
import "../styles/experience.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const experienceData = [
	{
		company: "Bilendi Services Ltd",
		role: "Lead Technical Scriptor",
		period: "2022 – Present",
		items: [
			"Implement new survey projects",
			"Participate in project launching meetings",
			"Survey programming at complexity levels 3–5: maxdiff, segmentation, conjoint, multicountry",
			"Hands-on with HTML, CSS, JavaScript, jQuery, and Python",
		],
	},
	{
		company: "SGS & CO Ltd",
		role: "Software QA Tester — Level 1",
		period: "2021",
		items: [
			"Ensured quality of evolutionary and corrective application versions",
			"Created user manuals for new features",
			"Created and executed test suites and test cases",
		],
	},
	{
		company: "Enabling Environments Ltd",
		role: "Web Developer",
		period: "2020",
		items: ["Maintenance of company website using WordPress"],
	},
	{
		company: "ABC Motor LTD",
		role: "IT Trainee",
		period: "2019",
		items: [
			"Helpdesk support — collecting staff requests via ticketing system",
			"Infrastructure support — on-site staff assistance",
			"Networking — Windows Server and firewall",
			"Web development — maintaining company website",
		],
	},
];

const Experience = () => {
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
							key={index}
							className={`timeline-item reveal${expandedPanel === index ? " expanded" : ""}`}
							style={{ transitionDelay: `${index * 80}ms` }}
						>
							<div className="timeline-dot" />
							<div className="timeline-content">
								<button
									className="timeline-header"
									onClick={() => togglePanel(index)}
									aria-expanded={expandedPanel === index}
								>
									<div className="timeline-header-info">
										<span className="timeline-company">
											{exp.company}
										</span>
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
