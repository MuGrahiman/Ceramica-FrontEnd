import React from "react";

/**
 * SiteGuideSection - Guides users on how to use the website features
 */
const SiteGuideSection = () => {
	const guides = [
		{
			title: "Browse Collections",
			desc: "Discover our seasonal and thematic collections curated for different dining aesthetics.",
		},
		{
			title: "Custom Orders",
			desc: "Request bespoke pieces tailored to your specific needs and preferences.",
		},
		{
			title: "Care Guides",
			desc: "Learn how to maintain your ceramics to preserve their beauty for years.",
		},
	];

	return (
		<section className="bg-blue-950 text-white rounded-xl p-8 my-12">
			<h2 className="text-3xl font-bold mb-6 text-center">
				Exploring Our Collection
			</h2>

			<div className="grid md:grid-cols-3 gap-6">
				{guides.map((item, index) => (
					<div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg">
						<h3 className="text-xl font-semibold mb-3">{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default SiteGuideSection;
