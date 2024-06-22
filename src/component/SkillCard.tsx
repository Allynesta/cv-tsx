import "../styles/card.css";
import SkillList from "./SkillList";

const SkillCard = () => {
	return (
		<>
			<div className="card-row">
				<div className="card-column">
					<div className="card">
						<div className="card-info">
							<h2>Frontend developer</h2>

							<SkillList />
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<h2>Backend developer</h2>
							<SkillList />
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<h2>Fullstack developer</h2>
							<SkillList />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SkillCard;
