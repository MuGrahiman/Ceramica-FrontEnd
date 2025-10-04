import React from "react";
import PropTypes from "prop-types";
import AnimatedH1 from "./AnimatedH1";

/**
 * PageTitle - Displays page title
 */
const PageTitle = ({ title = "" }) => {
	return (
		<div className="mb-8 text-center animate-fade-in">
			<AnimatedH1 title={title} />
		</div>
	);
};

PageTitle.propTypes = {
	title: PropTypes.string.isRequired,
};
export default PageTitle;
