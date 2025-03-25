import React, { useState } from "react";
import ContactSuccess from "./ContactSuccess";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import HeroSection from "../../components/Hero";
import heroImage from "../../assets/ceramics/image.png";

/**
 * ContactPage Component
 * - Organizes the contact page layout
 * - Manages form submission state
 */
const ContactPage = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleFormSubmit = (success) => {
		setIsSubmitted(success);
	};

	return (
		<div>
			<HeroSection
				title="Get in Touch with Us!"
				subtitle="Have questions or special requests? We're here to help!"
				backgroundImage={heroImage}
				buttonText={"Contact Us Now"}
				buttonLink={"#contact-form"}
				ctaText="Contact Us Now"
				ctaLink="#contact-form"
			/>

			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-12">
					<ContactInfo />
					<div id="contact-form">
						{isSubmitted ? (
							<ContactSuccess />
						) : (
							<ContactForm onFormSubmit={handleFormSubmit} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
