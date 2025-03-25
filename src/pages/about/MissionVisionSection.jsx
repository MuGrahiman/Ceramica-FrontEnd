import React from "react";

/**
 * MissionVisionSection - Displays the company's mission and vision in card format
 */
const MissionVisionSection = () => (
	<section className="mb-20 p-8">
		<h2 className="text-3xl font-bold text-blue-950 mb-8 text-center">
			Our Guiding Principles
		</h2>

		<div className="grid md:grid-cols-2 gap-8">
			<div className="bg-white p-6 rounded-lg hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
				<h3 className="text-xl font-semibold text-blue-950 mb-3">Mission</h3>
				<p className="text-blue-950">
					To create timeless ceramic tableware that blends artistry with
					functionality, bringing beauty to everyday moments while supporting
					sustainable craftsmanship.
				</p>
			</div>

			<div className="bg-white p-6 rounded-lg hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
				<h3 className="text-xl font-semibold text-blue-950 mb-3">Vision</h3>
				<p className="text-blue-950">
					To be recognized globally as a brand that preserves traditional
					ceramic arts while innovating designs that resonate with contemporary
					lifestyles.
				</p>
			</div>
		</div>
	</section>
);

export default MissionVisionSection;
