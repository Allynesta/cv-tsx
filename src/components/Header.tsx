import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSun,
	faMoon,
	faBars,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

interface NavbarProps {
	onToggleDark: () => void;
	isDark: boolean;
}

const Header = ({ onToggleDark, isDark }: NavbarProps) => {
	const [responsive, setResponsive] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.body.scrollHeight - window.innerHeight;
			setScrolled(scrollTop > 50);
			setScrollProgress(
				docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
			);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNavLinkClick = () => {
		if (responsive) setResponsive(false);
	};

	return (
		<header>
			<div
				className="scroll-progress"
				style={{ width: `${scrollProgress}%` }}
			/>
			<nav
				className={`topnav-section${scrolled ? " scrolled" : ""}${responsive ? " responsive" : ""}`}
			>
				<span className="nav-logo">Ally Nesta</span>

				<div className="nav-links">
					<a href="#about-section" onClick={handleNavLinkClick}>
						About
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
					<button
						className="dark-toggle"
						onClick={onToggleDark}
						aria-label="Toggle dark mode"
					>
						<FontAwesomeIcon icon={isDark ? faSun : faMoon} />
					</button>
				</div>

				<button
					className="nav-toggle"
					onClick={() => setResponsive(!responsive)}
					aria-label="Toggle menu"
				>
					<FontAwesomeIcon icon={responsive ? faXmark : faBars} />
				</button>
			</nav>
		</header>
	);
};

export default Header;
