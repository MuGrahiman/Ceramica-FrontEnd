import React from "react";

const PhilosophyStatement = () => {
	return (
		<section className="py-24  relative">
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
			<div className="container mx-auto px-6 max-w-4xl">
				<blockquote className="text-2xl md:text-4xl font-serif italic text-center text-stone-700 leading-relaxed">
					“We don’t just shape clay – we collaborate with elemental forces,
					guiding earth through fire to reveal its hidden song.”
				</blockquote>
				<p className="text-center mt-8 text-stone-500">
					— Founder, Elena Marquez
				</p>
			</div>
		</section>
	);
};

export default PhilosophyStatement;
