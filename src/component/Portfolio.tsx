import "../styles/global.css";

const Portfolio = () => {
	return (
		<section className="portfolio-section" id="portfolio-section">
			<h1>My Work</h1>
			<p>Explore some of the projects I have built.</p>

			<div className="projects">
				{/* Planner App */}
				<div className="project-card">
					<img src="/images/planner-app.png" alt="Planner App" />
					<h2>My Planner App</h2>
					<p>
						A smart productivity app to help you organize tasks efficiently.
					</p>
					<ul>
						<li>🛠️ TypeScript, Node.js, MongoDB</li>
						<li>📅 Recording & Calendar Integration</li>
					</ul>
					<a
						href="https://myplanner-green.vercel.app/"
						className="project-button"
					>
						View Project
					</a>
				</div>

				{/* CV Website */}
				<div className="project-card">
					<img src="/images/cv-website.png" alt="CV Website" />
					<h2>Personal CV Website</h2>
					<p>A modern CV website showcasing my skills and experience.</p>
					<ul>
						<li>🛠️ HTML, CSS, JavaScript, TypeScript</li>
						<li>🎨 Fully Responsive & SEO Optimized</li>
					</ul>
					{/*<a href="/projects/cv" className="project-button">
						View Project
					</a> */}
				</div>

				{/* RNA - SEQ University dissertation */}
				<div className="project-card">
					<img src="/images/cv-website.png" alt="CV Website" />
					<h2>RNA-SEQ ANALYSIS</h2>
					<p>A web-based platform for RNA-seq research</p>
					<ul>
						<li>🛠️ R language</li>
						<li>📊 Data Visualization & User Insights</li>
					</ul>
					<a
						href="https://rnaseqanalysis.shinyapps.io/apps/"
						className="project-button"
					>
						View Project
					</a>
				</div>

				{/* Demo Project 2 - SaaS Dashboard
				<div className="project-card">
					<img src="/images/saas-dashboard.png" alt="SaaS Dashboard" />
					<h2>SaaS Analytics Dashboard</h2>
					<p>An interactive dashboard for tracking business analytics.</p>
					<ul>
						<li>🛠️ Vue.js, Node.js, Chart.js</li>
						<li>📊 Data Visualization & User Insights</li>
					</ul>
					<a href="/projects/saas" className="project-button">
						View Project
					</a>
				</div> */}
			</div>
		</section>
	);
};

export default Portfolio;
