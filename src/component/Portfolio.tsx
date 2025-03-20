import "../styles/global.css";
import cvImage from "../assets/cv.png";
import plannerImage from "../assets/myplanner.png";
import rnaImage from "../assets/rna.png";
import offlineImage from "../assets/offline.png";
import captionImage from "../assets/caption.png";

const Portfolio = () => {
	return (
		<section className="portfolio-section" id="portfolio-section">
			<h1>My Work</h1>
			<p>Explore some of the projects I have built.</p>

			<div className="projects">
				{/* Planner App */}
				<div className="project-card">
					<img
						src={plannerImage}
						alt="Planner Preview"
						className="portfolio-image"
					/>
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
					<img src={cvImage} alt="CV Preview" className="portfolio-image" />
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
					<img src={rnaImage} alt="RNA Preview" className="portfolio-image" />
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

				{/* Offline Hike */}
				<div className="project-card">
					<img
						src={offlineImage}
						alt="Offline hike"
						className="portfolio-image"
					/>
					<h2>Offline</h2>
					<p>A web-site for a tour guide</p>
					<ul>
						<li>🛠️ HTML, CSS, JavaScript</li>
						<li>📊 Data Presentation & Booking</li>
					</ul>
					<a href="https://offlinehike.com/" className="project-button">
						View Project
					</a>
				</div>

				{/* Caption Web App */}
				<div className="project-card">
					<img
						src={captionImage}
						alt="Caption Preview"
						className="portfolio-image"
					/>
					<h2>Random Quote Generator</h2>
					<p>An interactive random quote generator.</p>
					<ul>
						<li>🛠️ JavaScript, React js</li>
						<li>🔖 API Usage</li>
					</ul>
					<a
						href="https://captions-woad.vercel.app/"
						className="project-button"
					>
						View Project
					</a>
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
