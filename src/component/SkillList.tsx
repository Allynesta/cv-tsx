import "../styles/listskills.css";

const SkillList = () => {
	return (
		<>
			<ul className="list-group">
				<li>
					HTML{" "}
					<div>
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star" />
						<span className="fa fa-star" />
					</div>
				</li>
				<li>
					CSS{" "}
					<div>
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star checked" />
						<span className="fa fa-star" />
						<span className="fa fa-star" />
					</div>
				</li>
				<li>JS</li>
				<li>JQuery</li>
				<li>Python</li>
				<li>PHP</li>
				<li>React</li>
			</ul>
		</>
	);
};

export default SkillList;
