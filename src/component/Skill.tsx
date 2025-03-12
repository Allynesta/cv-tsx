import "../styles/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import SkillCard from "./SkillCard";
import Breadcrumb from "./Breadcrumb";
import { useState } from "react";

const Skill = () => {
	const [activeBreadcrumb, setActiveBreadcrumb] = useState<string>("All");

	const setBreadcrumbStatus = (status: string) => {
		setActiveBreadcrumb(status);
	};
	return (
		<>
			<div className="skill-section" id="skill-section">
				<h4>
					<FontAwesomeIcon icon={faCodeCompare} />
					<b> Skills</b>
				</h4>
				<p>Programming Knowledge Expertise</p>
				<Breadcrumb setBreadcrumbStatus={setBreadcrumbStatus} />
				<SkillCard activeBreadcrumb={activeBreadcrumb} />
			</div>
		</>
	);
};

export default Skill;
