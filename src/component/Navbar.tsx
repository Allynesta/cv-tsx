import "../styles/navbar.css";

const Navbar = () => {
	return (
		<>
			<div className="topnav-section" id="topnav-section">
				<a className="disabledlogo" href="#default">
					Ally Nesta
				</a>
				<a className="active" href="#home">
					Home
				</a>
				<a href="#skill-section">Skills</a>
				<a href="#experience-section">Experience</a>
				<a href="#about-section">About Me</a>
				<a href="#contact-section">About Me</a>
			</div>
		</>
	);
};

export default Navbar;
