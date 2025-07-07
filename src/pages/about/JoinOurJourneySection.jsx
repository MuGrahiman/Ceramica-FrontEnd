import React from "react";
import { Link } from "react-router-dom";

/**
 * JoinOurJourneySection - Final section encouraging users to visit the shop
 */
const JoinOurJourneySection = () => (
	<section aria-labelledby="journey-heading" className="text-center">
		<h2         id="journey-heading"
className="text-3xl font-bold text-blue-950  font-serif  text-center mb-12">
			Join Our Ceramic Journey
		</h2>
		<p className="text-blue-950 mb-8 max-w-3xl mx-auto">
			We invite you to explore our collections and discover pieces that resonate
			with your personal style. Each purchase supports traditional craftsmanship
			and brings art into daily life.
		</p>
		<Link
			to="/shop"
			className="bg-blue-950 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
			aria-labelledby="Navigate to Shop Our Collections"
			>
			Shop Our Collections
		</Link>
	</section>
);

export default JoinOurJourneySection;
