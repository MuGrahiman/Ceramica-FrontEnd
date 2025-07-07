import React from "react";
import PropTypes from "prop-types";

/**
 * AnimatedH1 - Animated heading component with responsive font sizing.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Heading content
 * @returns {JSX.Element} Animated h1 element
 */
const AnimatedH1 = ({ title = "Heading" }) => {
	return (
		<h1
			aria-live="polite"
			className="text-3xl md:text-5xl  font-bold  mb-6 animate-slide-down">
			{title}
		</h1>
	);
};

AnimatedH1.propTypes = {
	title: PropTypes.string,
};

export default AnimatedH1;
