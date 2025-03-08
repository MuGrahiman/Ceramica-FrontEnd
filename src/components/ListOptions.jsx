import React from "react";
import PropTypes from "prop-types";

// OptionList component
const ListOptions = ({
	OPTIONS,
	EMPTY_MESSAGE = "No options available.",
	RENDER_ITEM,
}) => {
	if (!OPTIONS || !OPTIONS.length) {
		return (
			<div className="text-center text-base font-serif font-semibold">
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
