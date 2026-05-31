import "../styles/cardskill.css";
import SkillList from "./SkillList";

interface SkillCardProps {
	activeBreadcrumb: string;
}

const itemsFrontend = [
	{ name: "HTML", rating: 4 },
	{ name: "CSS", rating: 3 },
	{ name: "JavaScript", rating: 3 },
	{ name: "React", rating: 2 },
];

const itemsBackend = [
	{ name: "Python", rating: 4 },
	{ name: "PHP", rating: 3 },
	{ name: "JavaScript", rating: 3 },
];

const itemsDevelopmentTools = [
	{ name: "GitHub", rating: 2 },
	{ name: "VS Code", rating: 3 },
];

const skillsData = [
	{
		skillsList: itemsFrontend,
		skillDescription: "Frontend",
		className: "itemsFrontend",
	},
	{
		skillsList: itemsBackend,
		skillDescription: "Backend",
		className: "itemsBackend",
	},
	{
		skillsList: itemsDevelopmentTools,
		skillDescription: "Development Tools",
		className: "itemsDevelopmentTools",
	},
];

const SkillCard = ({ activeBreadcrumb }: SkillCardProps) => {
	const filteredSkillsData = skillsData.filter((item) => {
		if (activeBreadcrumb === "All") return true;
		return item.skillDescription
			.toLowerCase()
			.includes(activeBreadcrumb.toLowerCase());
	});

	return (
		<div className="card-row">
			{filteredSkillsData.map((item, index) => (
				<div
					key={index}
					className={`skill-card reveal ${item.className}`}
					style={{ animationDelay: `${index * 100}ms` }}
				>
					<SkillList
						skillsList={item.skillsList}
						skillDescription={item.skillDescription}
					/>
				</div>
			))}
		</div>
	);
};

export default SkillCard;
