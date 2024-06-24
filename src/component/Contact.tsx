import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/contact.css";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
	return (
		<>
			<div className="contact-section" id="contact-section">
				<FontAwesomeIcon icon={faAddressCard} />
				<b> Contact Me..</b>
				<p>Let's get in touch </p>
				<form action="/action_page.php">
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
					<label htmlFor="purpose">Purpose</label>
					<select id="purpose" name="purpose">
						<option value="back">back-end</option>
						<option value="front">front-end</option>
						<option value="full">full-stack</option>
					</select>
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
