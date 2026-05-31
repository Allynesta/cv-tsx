import { useState } from "react";
import "../styles/contact.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Contact = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		description: "",
	});
	const sectionRef = useIntersectionObserver<HTMLElement>();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const { firstname, lastname, description } = formData;
		if (!firstname.trim() || !lastname.trim() || !description.trim()) return;
		const phoneNumber = "+23059829963";
		const message = `Hello, my name is ${firstname} ${lastname}. Details: ${description}`;
		const encodedMessage = encodeURIComponent(message);
		const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
		window.location.href = whatsappURL;
	};

	return (
		<section
			className="contact-section"
			id="contact-section"
			ref={sectionRef}
		>
			<div className="section-container">
				<h2 className="section-title reveal">Contact Me</h2>
				<p className="section-subtitle reveal">
					Let&apos;s get in touch
				</p>
				<form className="contact-form reveal" onSubmit={handleSubmit}>
					<div
						className={`field-wrap${formData.firstname ? " has-value" : ""}`}
					>
						<input
							id="fname"
							name="firstname"
							type="text"
							value={formData.firstname}
							onChange={handleChange}
							required
						/>
						<label htmlFor="fname">First Name</label>
					</div>
					<div
						className={`field-wrap${formData.lastname ? " has-value" : ""}`}
					>
						<input
							id="lname"
							name="lastname"
							type="text"
							value={formData.lastname}
							onChange={handleChange}
							required
						/>
						<label htmlFor="lname">Last Name</label>
					</div>
					<div
						className={`field-wrap field-wrap--textarea${formData.description ? " has-value" : ""}`}
					>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
						/>
						<label htmlFor="description">Message</label>
					</div>
					<button type="submit" className="submit-btn">
						Send via WhatsApp
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
