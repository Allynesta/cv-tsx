import SkillList from "./SkillList";

const Card = () => {
	return (
		<>
			<div className="skill-section" id="skill-section">
				<h4>
					<b>Skills and Expertise</b>
				</h4>
				<p>Programming Knowledge Expertise</p>
				<SkillList />
			</div>
		</>
	);
};

export default Card;
