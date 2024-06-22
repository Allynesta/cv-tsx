import "../styles/footer.css";
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
			<ul className="no-bullets">
				<li>
					<FontAwesomeIcon icon={faFacebook} />
				</li>
				<li>
					<FontAwesomeIcon icon={faInstagram} />
				</li>
				<li>
					<FontAwesomeIcon icon={faLinkedin} />
				</li>
			</ul>
			<i className="fa-solid fa-copyright">
				Ally Nesta - Website Underconstruction
			</i>
		</footer>
	);
};

export default Footer;
