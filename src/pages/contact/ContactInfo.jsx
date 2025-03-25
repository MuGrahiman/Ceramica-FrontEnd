import React from "react";

/**
 * ContactInfo Component
 * - Displays contact information and support details
 * - Includes business hours and quick links
 */
const ContactInfo = () => {
	// Business information (could be moved to config file)
	const businessInfo = {
		email: "support@ceramictablewares.com",
		phone: "+1 (555) 123-4567",
		address: "123 Pottery Lane, Artisan City, AC 12345",
		hours: [
			{ day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
			{ day: "Saturday", time: "10:00 AM - 4:00 PM" },
			{ day: "Sunday", time: "Closed" },
		],
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Contact Information
			</h2>

			<div className="space-y-4">
				{/* Email */}
				<div>
					<h3 className="text-sm font-medium text-gray-700">Email</h3>
					<a
						href={`mailto:${businessInfo.email}`}
						className="text-blue-900 hover:underline">
						{businessInfo.email}
					</a>
				</div>

				{/* Phone */}
				<div>
					<h3 className="text-sm font-medium text-gray-700">Phone</h3>
					<a
						href={`tel:${businessInfo.phone.replace(/\D/g, "")}`}
						className="text-blue-900 hover:underline">
						{businessInfo.phone}
					</a>
				</div>

				{/* Address */}
				<div>
					<h3 className="text-sm font-medium text-gray-700">Address</h3>
					<p className="text-gray-900">{businessInfo.address}</p>
				</div>

				{/* Business Hours */}
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-1">
						Business Hours
					</h3>
					<ul className="space-y-1">
						{businessInfo.hours.map((item, index) => (
							<li key={index} className="flex">
								<span className="text-gray-900 w-32">{item.day}</span>
								<span className="text-gray-900">{item.time}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			
		</div>
	);
};

export default ContactInfo;
