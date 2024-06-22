import { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
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
		<>
			<div
				className={`topnav-section ${responsive ? "responsive" : ""}`}
				id="topnav-section"
			>
				<a className="disabledlogo" href="#default">
					Ally Nesta
				</a>

				<a
					className="active"
					href="#about-section"
					onClick={handleNavLinkClick}
				>
					About Me
				</a>
				<a href="#skill-section" onClick={handleNavLinkClick}>
					Skills
				</a>
				<a href="#experience-section" onClick={handleNavLinkClick}>
					Experience
				</a>
				<a href="#contact-section" onClick={handleNavLinkClick}>
					Contact
				</a>

				{/* Responsive icon */}
				<a className="icon" onClick={toggleResponsive}>
					&#9776;
				</a>
			</div>
		</>
	);
};

export default Navbar;
