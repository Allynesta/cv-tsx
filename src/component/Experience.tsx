import "../styles/experience.css";

const Experience = () => {
	return (
		<div className="experience-section">
			<h4>
				<b>Working Experience</b>
			</h4>
			<button className="accordion">Junior Scriptor @ Bilendi Services</button>
			<div className="panel">
				<p>Implement new product</p>
				<p>Participate in project launching meeting</p>
			</div>
			<button className="accordion">Software QA Tester 1 @ SGS & CO</button>
			<div className="panel">
				<p>
					Ensuring quality of evolutionary and corrective versions of
					application
				</p>
				<p>Create user manuals for new features</p>
				<p>Create and execute test suites/cases</p>
			</div>
			<button className="accordion">
				Web developer @ Enabling Environment
			</button>
			<div className="panel">
				<p>Maintenance of company website via WordPress</p>
			</div>
			<button className="accordion">Trainee @ ABC Motor LTD</button>
			<div className="panel">
				<p>Helpdesk support</p>
				<p>Infrastructure support</p>
				<p>Networking</p>
				<p>Web development</p>
			</div>
		</div>
	);
};

export default Experience;
