import "../styles/skill.css";
import SkillCard from "./SkillCard";
import Breadcrumb from "./Breadcrumb";
import { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Skill = () => {
	const [activeBreadcrumb, setActiveBreadcrumb] = useState<string>("All");
	const sectionRef = useIntersectionObserver<HTMLElement>();

	const setBreadcrumbStatus = (status: string) => {
		setActiveBreadcrumb(status);
	};

	return (
		<section
			className="skill-section"
			id="skill-section"
			ref={sectionRef}
		>
			<div className="section-container">
				<h2 className="section-title reveal">Skills</h2>
				<p className="section-subtitle reveal">
					Programming Knowledge Expertise
				</p>
				<Breadcrumb setBreadcrumbStatus={setBreadcrumbStatus} />
				<SkillCard activeBreadcrumb={activeBreadcrumb} />
			</div>
		</section>
	);
};

export default Skill;
