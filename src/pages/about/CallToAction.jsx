import React from "react";
import { Link } from "react-router-dom";

/**
 * CallToAction - Final section encouraging users to visit the shop
 */
const CallToAction = () => (
	<section className="text-center">
		<h2 className="text-3xl font-bold text-blue-950 mb-6">
			Join Our Ceramic Journey
		</h2>
		<p className="text-blue-950 mb-8 max-w-3xl mx-auto">
			We invite you to explore our collections and discover pieces that resonate
			with your personal style. Each purchase supports traditional craftsmanship
			and brings art into daily life.
		</p>
		<Link
			to="/shop"
			className="bg-blue-950 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95
			transition-transform duration-300 hover:scale-105">
			Shop Our Collections
		</Link>
	</section>
);

export default CallToAction;
