import React from "react";
import PropTypes from "prop-types";
import { FALL_BACK_IMAGE } from "../../constants/app";
import JoinOurJourneySection from "../about/JoinOurJourneySection";
import useIntervalSlider from "../../hooks/useIntervalSlider";
import ListOptions from "../../components/ListOptions";

/**
 * JoinOurJourneyGallerySection - Combined gallery and content section with auto-rotating images.
 *
 * @param {Object} props - Component props
 * @param {Array<{src: string, title?: string}>} props.gallerySlides - Array of image URLs/objects
 * @returns {JSX.Element} Responsive gallery + content layout
 */
const JoinOurJourneyGallerySection = ({ gallerySlides = [] }) => {
	const [currentSlide] = useIntervalSlider(gallerySlides.length, 10000);
	return (
		<section className=" flex flex-col md:flex-row items-center justify-evenly">
			{/* Gallery Section */}
			<div
				className="my-9 relative h-96 overflow-hidden shadow-xl  rounded-3xl w-full md:w-1/3"
				aria-live="polite"
				aria-label="Image gallery">
				<ListOptions
					EMPTY_MESSAGE={"No Gallery Slides Found"}
					OPTIONS={gallerySlides}
					RENDER_ITEM={(slide, index) => (
						<div
							key={index}
							className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center   ${
								index === currentSlide
									? "opacity-100 animate-slide-down	"
									: "opacity-0 pointer-events-none"
							}`}>
							<img
								src={slide.src || FALL_BACK_IMAGE}
								alt={slide.alt || "Gallery image"}
								className="max-h-[70vh] object-contain "
								loading="lazy"
								onError={(e) => {
									e.target.src = FALL_BACK_IMAGE;
								}}
							/>
						</div>
					)}
				/>
			</div>
			{/* Content Section */}
			<div className="md:w-1/3  ">
				<JoinOurJourneySection />
			</div>
		</section>
	);
};

JoinOurJourneyGallerySection.propTypes = {
	gallerySlides: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			alt: PropTypes.string.isRequired,
		})
	).isRequired,
};
export default JoinOurJourneyGallerySection;
