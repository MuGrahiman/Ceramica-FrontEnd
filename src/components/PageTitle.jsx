import React from "react";
import PropTypes from "prop-types";

/**
 * PageTitle - Displays page title
 */
const PageTitle = ({ title = "" }) => {
	return (
		<div className="mb-8 text-center animate-fade-in">
			<h1 className="text-3xl font-bold text-gray-900">{title}</h1>
		</div>
	);
};

PageTitle.propTypes = {
	title: PropTypes.string.isRequired,
};
export default PageTitle;
