import React from "react";
import PropTypes from "prop-types";

const AnimatedH1 = ({ title = "Heading" }) => {
	return (
		<h1 className="text-3xl md:text-5xl  font-bold  mb-6 animate-slide-down">
			{title}
		</h1>
	);
};
AnimatedH1.propTypes = {
	title: PropTypes.string,
};

export default AnimatedH1;
