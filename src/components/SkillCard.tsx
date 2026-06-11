import "../styles/cardskill.css";
import SkillList from "./SkillList";
import { useSkills } from "../hooks/useContent";
import type { SkillCategory } from "../types/content";

interface SkillCardProps {
	activeBreadcrumb: string;
}

const CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Development Tools"];

const CLASS_MAP: Record<SkillCategory, string> = {
	Frontend: "itemsFrontend",
	Backend: "itemsBackend",
	"Development Tools": "itemsDevelopmentTools",
};

const SkillCard = ({ activeBreadcrumb }: SkillCardProps) => {
	const skills = useSkills();

	const grouped = CATEGORIES.map((cat) => ({
		skillDescription: cat,
		className: CLASS_MAP[cat],
		skillsList: skills.filter((s) => s.category === cat),
	})).filter(
		(g) =>
			g.skillsList.length > 0 &&
			(activeBreadcrumb === "All" ||
				g.skillDescription.toLowerCase().includes(activeBreadcrumb.toLowerCase()))
	);

	return (
		<div className="card-row">
			{grouped.map((item, index) => (
				<div
					key={item.skillDescription}
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
