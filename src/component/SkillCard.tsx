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
				<div className="card-column">
					<div className="card">
						<div className="card-info">
							<SkillList
								items={itemsFrontend} // Passing the items array as a prop to ListGroup
								heading="Frontend developer" // Passing a heading prop to ListGroup
							/>
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<SkillList
								items={itemsBackend} // Passing the items array as a prop to ListGroup
								heading="Backend developer" // Passing a heading prop to ListGroup
							/>
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<SkillList
								items={itemsDevelopmentTools} // Passing the items array as a prop to ListGroup
								heading="Development Tools" // Passing a heading prop to ListGroup
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SkillCard;
