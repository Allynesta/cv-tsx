import SkillList from "./SkillList";

const Card = () => {
	return (
		<>
			<div className="skill-section" id="skill-section">
				<h4>
					<b>John Doe</b>
				</h4>
				<p>Architect & Engineer</p>
				<SkillList />
			</div>
		</>
	);
};

export default Card;
