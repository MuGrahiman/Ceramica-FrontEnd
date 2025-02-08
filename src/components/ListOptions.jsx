import React from "react";
import PropTypes from "prop-types";

// OptionList component
const ListOptions = ({
	OPTIONS,
	EMPTY_MESSAGE = "No options available.",
	RENDER_ITEM,
}) => {
	if (!OPTIONS||!OPTIONS.length) {
		return <div>{EMPTY_MESSAGE}</div>;
	}

	return <>{OPTIONS.map(RENDER_ITEM)}</>;
};
ListOptions.propTypes = {
	OPTIONS: PropTypes.array.isRequired, // Options to iterate over
	EMPTY_MESSAGE: PropTypes.string, // Message to show when no options are available
	RENDER_ITEM: PropTypes.func.isRequired, // Function to render each option
};

export default ListOptions;
