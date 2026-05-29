import "../styles/listskills.css";

interface Skill {
	name: string;
	rating: number;
}

interface Props {
	skillsList: Skill[];
	skillDescription: string;
}

const SkillList = ({ skillsList, skillDescription }: Props) => {
	return (
		<div className="skill-group">
			<h3 className="skill-group-title">{skillDescription}</h3>
			{skillsList.length === 0 && (
				<p className="skill-empty">No skills found</p>
			)}
			<ul className="skill-list">
				{skillsList.map((item) => (
					<li key={item.name} className="skill-item reveal">
						<div className="skill-label">
							<span className="skill-name">{item.name}</span>
							<span className="skill-pct">
								{Math.round((item.rating / 5) * 100)}%
							</span>
						</div>
						<div className="skill-track">
							<div
								className="skill-fill"
								style={
									{
										"--fill-width": `${(item.rating / 5) * 100}%`,
									} as React.CSSProperties
								}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SkillList;
