import "../styles/global.css";

const About = () => {
	return (
		<section className="about-section" id="about-section">
			<h1>Frontend & Backend Developer</h1>
			<p>
				I'm <strong>Ally Nesta</strong>
				<br />A passionate web developer capable of doing both frontend and
				backend development.
				<br />
				My mission is simple—work smart and deliver exceptional digital
				experiences.
			</p>

			<h2>What I Offer</h2>
			<ul>
				<li>🚀 Business Websites</li>

				{/* <li>⚡ Custom Web Applications</li> */}
				{/* <li>🛒 E-commerce Solutions</li> */}
				{/* <li>📱 Progressive Web Apps</li> */}
			</ul>

			<div className="cta">
				<p>Ready to bring your idea to life?</p>
				<a href="#contact-section" className="cta-button">
					Get in touch with me
				</a>
			</div>
		</section>
	);
};

export default About;
