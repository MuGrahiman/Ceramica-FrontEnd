import React from "react";

/**
 * UniqueSellingPoints - Displays the company's unique value propositions in a grid
 */
const UniqueSellingPoints = () => {
	const features = [
		{
			title: "Artisan Crafted",
			desc: "Each piece is individually handcrafted by skilled artisans",
			icon: "✋",
		},
		{
			title: "Sustainable",
			desc: "Eco-friendly materials and processes",
			icon: "🌱",
		},
		{
			title: "Unique Designs",
			desc: "Limited edition collections you won't find elsewhere",
			icon: "✨",
		},
		{
			title: "Durable Quality",
			desc: "Made to last with premium materials",
			icon: "💎",
		},
	];

	return (
		<section className="mb-20">
			<h2 className="text-3xl font-bold text-blue-950 mb-8 text-center">
				Why Choose Our Ceramics
			</h2>

			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{features.map((item, index) => (
					<div
						key={index}
						className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
						<div className="text-4xl mb-4">{item.icon}</div>
						<h3 className="text-xl font-semibold text-blue-950 mb-2">
							{item.title}
						</h3>
						<p className="text-blue-950">{item.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default UniqueSellingPoints;
