import "../styles/cardskill.css";
import SkillList from "./SkillList";

const SkillCard = () => {
	// Defining the main App component
	const items = ["HTML", "CSS", "JS", "Python", "React"]; // Defining an array of items to be used in the ListGroup component

	return (
		<>
			<div className="card-row">
				<div className="card-column">
					<div className="card">
						<div className="card-info">
							<h2>Frontend developer</h2>

							<SkillList
								items={items} // Passing the items array as a prop to ListGroup
								heading="Frontend developer" // Passing a heading prop to ListGroup
							/>
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<h2>Backend developer</h2>
							<SkillList
								items={items} // Passing the items array as a prop to ListGroup
								heading="Backend developer" // Passing a heading prop to ListGroup
							/>
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<h2>Fullstack developer</h2>
							<SkillList
								items={items} // Passing the items array as a prop to ListGroup
								heading="Fullstack developer" // Passing a heading prop to ListGroup
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SkillCard;
