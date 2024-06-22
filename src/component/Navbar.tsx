const Navbar = () => {
	return (
		<>
			<ul className="topnav">
				<li>
					<a className="active topnav-centered" href="#home">
						Home
					</a>
				</li>
				<li>
					<a href="#about-section">About</a>
				</li>
				<li>
					<a href="#skill-section">Skills</a>
				</li>
				<li>
					<a href="#contact-section">Contact</a>
				</li>
			</ul>{" "}
		</>
	);
};

export default Navbar;
