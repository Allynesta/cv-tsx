import { useState } from "react";
import "../styles/global.css";

const Header = () => {
	const [responsive, setResponsive] = useState(false);

	const toggleResponsive = () => {
		setResponsive(!responsive);
	};

	const handleNavLinkClick = () => {
		// Close the responsive menu after clicking a nav link on mobile
		if (responsive) {
			setResponsive(false);
		}
	};

	return (
		<header>
			<nav
				className={`topnav-section ${responsive ? "responsive" : ""}`}
				id="topnav-section"
			>
				<a className="disabledlogo" href="#default">
					Ally Nesta
				</a>

				<a href="#about-section" onClick={handleNavLinkClick}>
					About Me
				</a>
				<a href="#experience-section" onClick={handleNavLinkClick}>
					Experience
				</a>
				<a href="#skill-section" onClick={handleNavLinkClick}>
					Skills
				</a>
				<a href="#portfolio-section" onClick={handleNavLinkClick}>
					Portfolio
				</a>
				<a href="#contact-section" onClick={handleNavLinkClick}>
					Contact
				</a>

				{/* Responsive icon */}
				<a className="icon" onClick={toggleResponsive}>
					&#9776;
				</a>
			</nav>
		</header>
	);
};

export default Header;
