import "../styles/skill.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const Skill = () => {
	return (
		<>
			<div className="skill-section" id="skill-section">
				<FontAwesomeIcon icon={faCodeCompare} />
				<b>Skills</b>
				<p>Programming Knowledge Expertise</p>
				<Card />
			</div>
		</>
	);
};

export default Skill;
