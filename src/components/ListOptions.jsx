import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a list of options with a custom empty message.
 * @param {Array} OPTIONS - The list of options to render.
 * @param {string} [EMPTY_MESSAGE="No options available."] - The message to display if there are no options.
 * @param {function} RENDER_ITEM - The function to render each item in the list.
 */
const ListOptions = ({
	OPTIONS = [],
	EMPTY_MESSAGE = "No options available.",
	RENDER_ITEM = () => {},
}) => {
	if (!OPTIONS || !OPTIONS.length) {
		return (
			<div className="text-center text-base font-serif font-semibold text-gray-500 py-8">
				{EMPTY_MESSAGE}
			</div>
		);
	}

	return <>{OPTIONS.map(RENDER_ITEM)}</>;
};

ListOptions.propTypes = {
	OPTIONS: PropTypes.array.isRequired,
	EMPTY_MESSAGE: PropTypes.string,
	RENDER_ITEM: PropTypes.func.isRequired,
};

export default ListOptions;
