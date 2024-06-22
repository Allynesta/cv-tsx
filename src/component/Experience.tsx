import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/experience.css";
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
				className="accordion"
				onClick={() => togglePanel(0)}
				aria-expanded={expandedPanel === 0}
			>
				Lead Technical Scriptor @ Bilendi Services
			</button>
			<div className={`panel ${expandedPanel === 0 ? "show" : "hide"}`}>
				<p>Implement new survey project</p>
				<p>Participate in project launching meeting</p>
			</div>
			<button
				className="accordion"
				onClick={() => togglePanel(1)}
				aria-expanded={expandedPanel === 1}
			>
				Software QA Tester Level 1 @ SGS & CO
			</button>
			<div className={`panel ${expandedPanel === 1 ? "show" : "hide"}`}>
				<p>
					Ensuring quality of evolutionary and corrective versions of
					application
				</p>
				<p>Create user manuals for new features</p>
				<p>Create and execute test suites/cases</p>
			</div>
			<button
				className="accordion"
				onClick={() => togglePanel(2)}
				aria-expanded={expandedPanel === 2}
			>
				Web developer @ Enabling Environment
			</button>
			<div className={`panel ${expandedPanel === 2 ? "show" : "hide"}`}>
				<p>Maintenance of company website via WordPress</p>
			</div>
			<button
				className="accordion"
				onClick={() => togglePanel(3)}
				aria-expanded={expandedPanel === 3}
			>
				Trainee @ ABC Motor LTD
			</button>
			<div className={`panel ${expandedPanel === 3 ? "show" : "hide"}`}>
				<p>Helpdesk support</p>
				<p>Infrastructure support</p>
				<p>Networking</p>
				<p>Web development</p>
			</div>
		</div>
	);
};

export default Experience;
