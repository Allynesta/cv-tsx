import "../styles/card.css";

const Card = () => {
	return (
		<>
			<div className="card-row">
				<div className="card-column">
					<div className="card">
						<div className="card-info">
							<h2>Frontend developer</h2>
							<p className="title">CEO & Founder</p>
							<p>Some text that describes me lorem ipsum ipsum lorem.</p>
							<p>jane@example.com</p>
							<p>
								<button className="button">Contact</button>
							</p>
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<h2>Backend developer</h2>
							<p className="title">Art Director</p>
							<p>Some text that describes me lorem ipsum ipsum lorem.</p>
							<p>mike@example.com</p>
							<p>
								<button className="button">Contact</button>
							</p>
						</div>
					</div>
				</div>
				<div className="card-column">
					<div className="card">
						<div className="container">
							<h2>Fullstack developer</h2>
							<p className="title">Designer</p>
							<p>Some text that describes me lorem ipsum ipsum lorem.</p>
							<p>john@example.com</p>
							<p>
								<button className="button">Contact</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
