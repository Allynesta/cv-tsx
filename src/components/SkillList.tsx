import "../styles/listskills.css";

interface Skill {
	name: string;
	rating: number;
}

interface Props {
	skillsList: Skill[]; // Update the type to reflect the new structure
	skillDescription: string;
}

const SkillList = ({ skillsList, skillDescription }: Props) => {
	const renderStars = (rating: number) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<span
					key={i}
					className={`fa fa-star ${i <= rating ? "checked" : ""}`}
				/>
			);
		}
		return stars;
	};

	return (
		<>
			<ul className="list-group">
				<h2>{skillDescription}</h2>
				{skillsList.length === 0 && <p>No item found in list</p>}
				{skillsList.map((item) => (
					<li key={item.name}>
						{item.name}
						<div>{renderStars(item.rating)}</div>{" "}
						{/* Render stars based on rating */}
					</li>
				))}
			</ul>
		</>
	);
};

export default SkillList;
