import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/about.css";
import { useHero } from "../hooks/useContent";

const TYPING_SPEED_MS = 80;
const DELETING_SPEED_MS = 45;
const PAUSE_AFTER_COMPLETE_MS = 1800;
const PAUSE_AFTER_DELETE_MS = 300;

const About = () => {
	const hero = useHero();
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const roles = hero.roles.length ? hero.roles : ["Developer"];
		const current = roles[roleIndex % roles.length];
		let delay: ReturnType<typeof setTimeout>;

		if (!isDeleting) {
			if (displayText.length < current.length) {
				delay = setTimeout(
					() => setDisplayText(current.slice(0, displayText.length + 1)),
					TYPING_SPEED_MS
				);
			} else {
				delay = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_COMPLETE_MS);
			}
		} else {
			if (displayText.length > 0) {
				delay = setTimeout(
					() => setDisplayText(displayText.slice(0, -1)),
					DELETING_SPEED_MS
				);
			} else {
				delay = setTimeout(() => {
					setIsDeleting(false);
					setRoleIndex((prev) => (prev + 1) % roles.length);
				}, PAUSE_AFTER_DELETE_MS);
			}
		}

		return () => clearTimeout(delay);
	}, [displayText, isDeleting, roleIndex, hero.roles]);

	return (
		<section className="about-section" id="about-section">
			<div className="hero-content">
				<p className="hero-label">{hero.label}</p>
				<h1 className="hero-name">{hero.name}</h1>
				<div className="hero-role">
					<span>{displayText}</span>
					<span className="cursor" aria-hidden="true" />
				</div>
				<p className="hero-desc">{hero.description}</p>
				<div className="hero-actions">
					<a href="#portfolio-section" className="cta-outline">
						View My Work
					</a>
					<a href="#contact-section" className="cta-ghost">
						Get In Touch
					</a>
				</div>
			</div>
			<a
				href="#experience-section"
				className="scroll-indicator"
				aria-label="Scroll down"
			>
				<FontAwesomeIcon icon={faChevronDown} />
			</a>
		</section>
	);
};

export default About;
