import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/experience.css";
import { useState } from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
	const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

	const experienceData = [
		{
			title: "Lead Technical Scriptor @ Bilendi Services Ltd",
			items: [
				"Implement new survey project",
				"Participate in project launching meeting",
				"Survey programming complexity level 3, 4, and 5 including maxdiff, segmentation, conjoint, multicountry, etc.",
				"Working experience with HTML, CSS, JavaScript, jQuery, and Python"
			]
		},
		{
			title: "Software QA Tester Level 1 @ SGS & CO Ltd",
			items: [
				"Ensuring quality of evolutionary and corrective versions of application",
				"Create user manuals for new features",
				"Create and execute test suites/cases"
			]
		},
		{
			title: "Web Developer @ Enabling Environments Ltd",
			items: [
				"Maintenance of company website using WordPress"
			]
		},
		{
			title: "Trainee @ ABC Motor LTD",
			items: [
				"Helpdesk support – collecting requests of staff using ticketing system",
				"Infrastructure support – assisting staff on site",
				"Networking – working on Windows Server and firewall",
				"Web development – maintaining the company website"
			]
		}
	];

	// Function to toggle the panel visibility
	const togglePanel = (index: number) => {
		if (expandedPanel === index) {
			// If the clicked panel is already expanded, collapse it
			setExpandedPanel(null);
		} else {
			// Expand the clicked panel
			setExpandedPanel(index);
		}
	};

	return (
		<div className="experience-section" id="experience-section">
			<h4>
				<FontAwesomeIcon icon={faBriefcase} />
				<b>Working Experience</b>
			</h4>
			{experienceData.map((exp, index) => (
				<div key={index}>
					<button
						className={`accordion ${expandedPanel === index ? "active" : ""}`}
						onClick={() => togglePanel(index)}
						aria-expanded={expandedPanel === index}
					>
						{exp.title}
					</button>
					<div className={`panel ${expandedPanel === index ? "show" : "hide"}`}>
						<ul className="experience-list">
							{exp.items.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};

export default Experience;
