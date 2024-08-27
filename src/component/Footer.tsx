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
				<a href="https://www.facebook.com/ally.nesta/">
					<li>
						<FontAwesomeIcon icon={faFacebook} />
					</li>
				</a>
				<a href="https://www.instagram.com/iamnestally/">
					<li>
						<FontAwesomeIcon icon={faInstagram} />
					</li>
				</a>
				<a href="https://www.linkedin.com/in/nesta-ally-9101231b7/">
					<li>
						<FontAwesomeIcon icon={faLinkedin} />
					</li>
				</a>
			</ul>
			<i className="fa-solid fa-copyright">
				Ally Nesta - Website Underconstruction
			</i>
		</footer>
	);
};

export default Footer;
