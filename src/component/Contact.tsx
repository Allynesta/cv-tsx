import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import "../styles/global.css";

const Contact = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		description: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission

		const { firstname, lastname, description } = formData;
		const phoneNumber = "+23059829963"; // Replace with your WhatsApp number (include country code, e.g., 230 for Mauritius)
		const message = `Hello, my name is ${firstname} ${lastname}. Details: ${description}`;

		// Encode message for URL
		const encodedMessage = encodeURIComponent(message);
		const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

		// Redirect to WhatsApp
		window.location.href = whatsappURL;
	};

	return (
		<div className="contact-section" id="contact-section">
			<h4>
				<FontAwesomeIcon icon={faAddressCard} />
				<b> Contact Me..</b>
			</h4>
			<p>Let's get in touch </p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="fname">First Name</label>
				<input
					id="fname"
					name="firstname"
					placeholder="Your name.."
					type="text"
					value={formData.firstname}
					onChange={handleChange}
					required
				/>
				<label htmlFor="lname">Last Name</label>
				<input
					id="lname"
					name="lastname"
					placeholder="Your last name.."
					type="text"
					value={formData.lastname}
					onChange={handleChange}
					required
				/>
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					placeholder="Write something.."
					style={{ height: "200px" }}
					value={formData.description}
					onChange={handleChange}
					required
				/>
				<input type="submit" value="Send to WhatsApp" />
			</form>
		</div>
	);
};

export default Contact;
