import "../styles/cardskill.css";
import SkillList from "./SkillList";

const SkillCard = () => {
	// Defining the main App component
	const itemsFrontend = ["HTML", "CSS", "JS", "React"]; // Defining an array of items to be used in the ListGroup component
	const itemsBackend = ["Python", "PHP", "JS"]; // Defining an array of items to be used in the ListGroup component
	const itemsDevelopmentTools = ["GitHub", "Visual Studio Code"]; // Defining an array of items to be used in the ListGroup component

	return (
		<>
			<div className="card-row">
				{[
					{
						skillsList: itemsFrontend,
						skillDescription: "Frontend developer",
					},
					{
						skillsList: itemsBackend,
						skillDescription: "Backend developer",
					},
					{
						skillsList: itemsDevelopmentTools,
						skillDescription: "Development Tools",
					},
				].map((item, index) => (
					<div key={index} className="card-column">
						<div className="card">
							<div className="card-info">
								<SkillList
									skillsList={item.skillsList}
									skillDescription={item.skillDescription}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default SkillCard;
