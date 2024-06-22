import React, { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
	const [responsive, setResponsive] = useState(false);

	const toggleResponsive = () => {
		setResponsive(!responsive);
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

				<a className="active" href="#about-section">
					About Me
				</a>
				<a href="#skill-section">Skills</a>
				<a href="#experience-section">Experience</a>
				<a href="#contact-section">Contact</a>

				{/* Responsive icon */}
				<a className="icon" onClick={toggleResponsive}>
					&#9776;
				</a>
			</div>
		</>
	);
};

export default Navbar;
