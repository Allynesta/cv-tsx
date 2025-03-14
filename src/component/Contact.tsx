import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/global.css";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
	return (
		<>
			<div className="contact-section" id="contact-section">
				<h4>
					<FontAwesomeIcon icon={faAddressCard} />
					<b> Contact Me..</b>
				</h4>
				<p>Let's get in touch </p>
				<form action="#">
					<label htmlFor="fname">First Name</label>
					<input
						id="fname"
						name="firstname"
						placeholder="Your name.."
						type="text"
					/>
					<label htmlFor="lname">Last Name</label>
					<input
						id="lname"
						name="lastname"
						placeholder="Your last name.."
						type="text"
					/>
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						name="description"
						placeholder="Write something.."
						style={{
							height: "200px",
						}}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</>
	);
};

export default Contact;
