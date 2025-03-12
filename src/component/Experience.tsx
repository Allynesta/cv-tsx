import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/global.css";
import { useState } from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
	const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

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
			<button
				className={`accordion ${expandedPanel === 0 ? "active" : ""}`}
				onClick={() => togglePanel(0)}
				aria-expanded={expandedPanel === 0}
			>
				Lead Technical Scriptor @ Bilendi Services Ltd
			</button>
			<div className={`panel ${expandedPanel === 0 ? "show" : "hide"}`}>
				<ul className="experience-list">
					<li>Implement new survey project</li>
					<li>Participate in project launching meeting</li>
					<li>
						Survey programming complexity level 3, 4, and 5 including maxdiff,
						segmentation, conjoint, multicountry, etc.
					</li>
					<li>
						Working experience with HTML, CSS, JavaScript, jQuery, and Python
					</li>
				</ul>
			</div>
			<button
				className={`accordion ${expandedPanel === 1 ? "active" : ""}`}
				onClick={() => togglePanel(1)}
				aria-expanded={expandedPanel === 1}
			>
				Software QA Tester Level 1 @ SGS & CO Ltd
			</button>
			<div className={`panel ${expandedPanel === 1 ? "show" : "hide"}`}>
				<ul className="experience-list">
					<li>
						Ensuring quality of evolutionary and corrective versions of
						application
					</li>
					<li>Create user manuals for new features</li>
					<li>Create and execute test suites/cases</li>
				</ul>
			</div>
			<button
				className={`accordion ${expandedPanel === 2 ? "active" : ""}`}
				onClick={() => togglePanel(2)}
				aria-expanded={expandedPanel === 2}
			>
				Web Developer @ Enabling Environments Ltd
			</button>
			<div className={`panel ${expandedPanel === 2 ? "show" : "hide"}`}>
				<ul className="experience-list">
					<li>Maintenance of company website using WordPress</li>
				</ul>
			</div>
			<button
				className={`accordion ${expandedPanel === 3 ? "active" : ""}`}
				onClick={() => togglePanel(3)}
				aria-expanded={expandedPanel === 3}
			>
				Trainee @ ABC Motor LTD
			</button>
			<div className={`panel ${expandedPanel === 3 ? "show" : "hide"}`}>
				<ul className="experience-list">
					<li>
						Helpdesk support – collecting requests of staff using ticketing
						system
					</li>
					<li>Infrastructure support – assisting staff on site</li>
					<li>Networking – working on Windows Server and firewall</li>
					<li>Web development – maintaining the company website</li>
				</ul>
			</div>
		</div>
	);
};

export default Experience;
