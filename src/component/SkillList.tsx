import "../styles/listskills.css";

interface Props {
	// Defining the Props interface for the ListGroup component
	items: string[]; // items is an array of strings
	heading: string; // heading is a string
}

const SkillList = ({ items, heading }: Props) => {
	return (
		<>
			<ul className="list-group">
				<h2>{heading}</h2>
				{items.length === 0 && <p>No item found in list</p>}{" "}
				{/* Defining a list with a class name for styling */}
				{items.map((item) => (
					<li
						key={item} // Using item as a unique key for each list element
					>
						{item} {/* Displaying the item text */}
						<div>
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
							<span className="fa fa-star checked" />
							<span className="fa fa-star" />
							<span className="fa fa-star" />
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default SkillList;
