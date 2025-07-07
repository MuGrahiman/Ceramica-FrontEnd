import React from "react";
import ListOptions from "../../components/ListOptions";
import PropTypes from "prop-types";
import { GUIDES } from "../../constants/app";

/**
 * SiteGuideSection - Displays website feature guides in a visually appealing grid layout.
 */
const SiteGuideSection = () => {
	return (
		<section
			aria-labelledby="site-guide-heading"
			className="bg-blue-950 text-white rounded-xl p-8 my-12">
			<h2
				id="site-guide-heading"
				className="text-3xl font-bold mb-6 text-center">
				Exploring Our Collection
			</h2>

			<div className="grid md:grid-cols-3 gap-6">
				<ListOptions
					OPTIONS={GUIDES}
					RENDER_ITEM={(item, index) => <GuideCard key={index} {...item} />}
				/>
			</div>
		</section>
	);
};

/**
 * Individual guide card component
 */
const GuideCard = ({ title, desc }) => (
	<div
		className={`bg-white bg-opacity-10 p-6 rounded-lg transition-all duration-300 hover:bg-opacity-20 hover:translate-y-1 motion-reduce:transform-none`}
		aria-label={title}>
		<h3 className="text-xl font-semibold mb-3">{title}</h3>
		<p className="opacity-90">{desc}</p>
	</div>
);

GuideCard.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
};
export default SiteGuideSection;
