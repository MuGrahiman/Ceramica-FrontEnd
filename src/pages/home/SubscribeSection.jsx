import React from "react";

/**
 * SubscribeSection - Email subscription form section with responsive layout.
 */
const SubscribeSection = () => {
	return (
		<section aria-labelledby="subscribe-heading" className="py-16 ">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="text-center mb-10">
					<h2
						id="subscribe-heading"
						className="text-3xl font-serif font-bold mb-4">
						Join Our Community
					</h2>
					<p className="text-stone-600">
						Subscribe to receive updates on new collections, exclusive offers,
						and pottery workshops.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<input
						type="email"
						placeholder="Your email address"
						className="flex-grow px-6 py-4 rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
					/>
					<button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-md">
						Subscribe
					</button>
				</div>
			</div>
		</section>
	);
};

export default SubscribeSection;
