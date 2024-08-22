import "../styles/listskills.css";

interface Props {
	// Defining the Props interface for the ListGroup component
	skillsList: string[]; // items is an array of strings
	skillDescription: string; // heading is a string
}

const SkillList = ({ skillsList, skillDescription }: Props) => {
	return (
		<>
			<ul className="list-group">
				<h2>{skillDescription}</h2>
				{skillsList.length === 0 && <p>No item found in list</p>}{" "}
				{/* Defining a list with a class name for styling */}
				{skillsList.map((item) => (
					<li
						key={item} // Using item as a unique key for each list element
					>
						{item} {/* Displaying the item text */}
						<div>
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default SkillList;
