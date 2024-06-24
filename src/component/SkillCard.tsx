import "../styles/cardskill.css";
import SkillList from "./SkillList";

interface SkillCardProps {
	activeBreadcrumb: string;
}

const SkillCard = ({ activeBreadcrumb }: SkillCardProps) => {
	// Defining the main App component
	const itemsFrontend = ["HTML", "CSS", "JS", "React"]; // Defining an array of items to be used in the ListGroup component
	const itemsBackend = ["Python", "PHP", "JS"]; // Defining an array of items to be used in the ListGroup component
	const itemsDevelopmentTools = ["GitHub", "Visual Studio Code"]; // Defining an array of items to be used in the ListGroup component

	const skillsData = [
		{
			skillsList: itemsFrontend,
			skillDescription: "Frontend developer",
			className: "itemsFrontend",
		},
		{
			skillsList: itemsBackend,
			skillDescription: "Backend developer",
			className: "itemsBackend",
		},
		{
			skillsList: itemsDevelopmentTools,
			skillDescription: "Development Tools",
			className: "itemsDevelopmentTools",
		},
	];

	const filteredSkillsData = skillsData.filter((item) => {
		if (activeBreadcrumb === "All") {
			return true;
		}
		return item.skillDescription
			.toLowerCase()
			.includes(activeBreadcrumb.toLowerCase());
	});

	return (
		<>
			<div className="card-row">
				{filteredSkillsData.map((item, index) => (
					<div key={index} className={`card-column ${item.className}`}>
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
