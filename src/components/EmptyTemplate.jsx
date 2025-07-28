import React from "react";
import PropTypes from "prop-types";

const EmptyTemplate = ({ emptyMessage }) => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<div className="text-center py-12">
				<p className="text-gray-500">{emptyMessage}</p>
			</div>
		</div>
	);
};
EmptyTemplate.propTypes = {
	emptyMessage: PropTypes.string.isRequired,
};
export default EmptyTemplate;
