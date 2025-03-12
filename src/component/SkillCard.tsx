import "../styles/global.css";
import SkillList from "./SkillList";

interface SkillCardProps {
	activeBreadcrumb: string;
}

const SkillCard = ({ activeBreadcrumb }: SkillCardProps) => {
	// Defining the main App component
	const itemsFrontend = [
		{ name: "HTML", rating: 4 },
		{ name: "CSS", rating: 3 },
		{ name: "JS", rating: 3 },
		{ name: "React", rating: 2 },
	];
	const itemsBackend = [
		{ name: "Python", rating: 4 },
		{ name: "PHP", rating: 3 },
		{ name: "JS", rating: 3 },
	];
	const itemsDevelopmentTools = [
		{ name: "GitHub", rating: 2 },
		{ name: "Visual Studio Code", rating: 3 },
	];

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
