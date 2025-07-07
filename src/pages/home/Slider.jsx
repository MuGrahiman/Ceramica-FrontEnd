import React, { useEffect, useState, useRef } from "react";
import useIntervalSlider from "../../hooks/useIntervalSlider";
import clsx from "clsx";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";

/**
 * Slider - Interactive image slider with auto-rotation and directional animations
 *
 * @param {Object} props - Component props
 * @param {Array} [props.slides=[]] - Array of slide objects containing:
 *   @param {string} slide.title - Main heading text
 *   @param {string} slide.subtitle - Supporting text
 *   @param {string} slide.cta - Call-to-action button text
 *   @param {string} slide.image - Image URL for the slide
 * @returns {JSX.Element} A full-screen slider with navigation controls
 */
const Slider = ({ slides = [] }) => {
	const [currentSlide, setCurrentSlide] = useIntervalSlider(
		slides.length,
		5000
	);

	// Animation direction tracking
	const DIRECTIONS = { LEFT: "left", RIGHT: "right" };
	const [direction, setDirection] = useState(DIRECTIONS.LEFT);
	const prevSlideRef = useRef(currentSlide);

	// Toggle animation direction on slide change
	useEffect(() => {
		if (prevSlideRef.current !== currentSlide) {
			setDirection((prev) =>
				prev === DIRECTIONS.LEFT ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT
			);
			prevSlideRef.current = currentSlide;
		}
	}, [currentSlide, DIRECTIONS.LEFT, DIRECTIONS.RIGHT]);

	return (
		<section className="relative h-dvh lg:h-[30rem] overflow-hidden">
			{/* Slide container */}
			<ListOptions
				OPTIONS={slides}
				RENDER_ITEM={(slide, index) => (
					<div
						key={`slide-${index}`}
						className={clsx(
							"absolute inset-0 transition-opacity duration-1000 flex flex-col-reverse lg:flex-row items-center justify-evenly lg:justify-between",
							{
								// Current slide
								"opacity-100 pointer-events-auto": index === currentSlide,
								// Animations based on direction
								"animate-slide-in-left":
									index === currentSlide && direction === DIRECTIONS.RIGHT,
								"animate-slide-in-right":
									index === currentSlide && direction === DIRECTIONS.LEFT,
								// Hidden slides
								"opacity-0 pointer-events-none": index !== currentSlide,
							}
						)}>
						{/* Text content */}
						<div className="mx-auto mb-10 md:mb-0 text-center lg:text-left">
							<h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
								{slide.title}
							</h1>
							<p className="text-xl md:text-2xl mb-8 text-stone-600">
								{slide.subtitle}
							</p>
							<button
								className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
								aria-label={`Action for ${slide.title}`}>
								{slide.cta}
							</button>
						</div>

						{/* Slide image */}
						<img
							src={slide.image}
							alt={slide.title}
							className="max-h-[70vh] mx-auto my-12 object-contain rounded-lg shadow-xl"
							loading={index === 0 ? "eager" : "lazy"}
						/>
					</div>
				)}
			/>

			{/* Navigation indicators */}
			<div
				className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
				aria-label="Slider navigation">
				{slides.map((_, index) => (
					<button
						key={`indicator-${index}`}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-all ${
							index === currentSlide ? "bg-amber-700 w-6" : "bg-white"
						}`}
						aria-current={index === currentSlide}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
};

Slider.propTypes = {
	slides: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string.isRequired,
			cta: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default Slider;
