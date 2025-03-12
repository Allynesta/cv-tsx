import "../styles/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faLinkedin,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer>
			<p>Find me on social media.</p>
			<ul className="social-media-list">
				<li>
					<a
						href="https://www.facebook.com/ally.nesta/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
					>
						<FontAwesomeIcon icon={faFacebook} />
					</a>
				</li>
				<li>
					<a
						href="https://www.instagram.com/iamnestally/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
					>
						<FontAwesomeIcon icon={faInstagram} />
					</a>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/in/nesta-ally-9101231b7/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
				</li>
			</ul>
			<p className="footer-note">
				<i className="fa-solid fa-copyright"></i> Ally Nesta - Website Under
				Construction
			</p>
		</footer>
	);
};

export default Footer;
