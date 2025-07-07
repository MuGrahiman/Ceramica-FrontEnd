import React from "react";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";
import { FALL_BACK_IMAGE } from "../../constants/app";

/**
 * Displays the brand's origin story with an accompanying image.
 *
 * @param {Object} props - Component props
 * @param {string} props.image - URL for the brand story image (required)
 * @param {string} props.title - Section heading text
 * @param {Array<string>} props.story - Array of paragraph strings
 * @param {string} [props.altText] - Descriptive text for the image
 * @returns {JSX.Element} Brand story section with image and text content
 */
const BrandStorySection = ({
	image,
	story = [],
	title = "The Art of Ceramics",
	altText = "Ceramic artisan at work",
}) => (
	<section
		className="my-20 flex flex-col lg:flex-row items-center gap-12"
		aria-labelledby="brand-story-heading">
		{/* Image Container */}
		<div
			className="lg:w-1/2 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
			role="group"
			aria-label="Brand story visual">
			<img
				src={image}
				alt={altText}
				className="w-full h-auto object-cover"
				loading="lazy"
				onError={(e) => {
					e.target.src = FALL_BACK_IMAGE;
					e.target.alt = "Ceramic artwork placeholder";
				}}
			/>
		</div>

		{/* Text Content */}
		<div className="lg:w-1/2">
			<h2
				id="brand-story-heading"
				className="text-center text-3xl font-bold text-blue-950 mb-6">
				{title}
			</h2>

			<ListOptions
				OPTIONS={story}
				EMPTY_MESSAGE={"Our story is still being written..."}
				RENDER_ITEM={(paragraph, index) => (
					<p
						key={`story-para-${index}`}
						className="text-blue-950 leading-relaxed mb-4">
						{paragraph}
					</p>
				)}
			/>
		</div>
	</section>
);

BrandStorySection.propTypes = {
	image: PropTypes.string.isRequired,
	story: PropTypes.arrayOf(PropTypes.string).isRequired,
	title: PropTypes.string,
	altText: PropTypes.string,
};

export default BrandStorySection;
