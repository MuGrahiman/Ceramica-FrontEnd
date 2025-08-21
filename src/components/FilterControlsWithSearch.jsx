import React from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

/**
 * Combined filter toggle and search bar controls
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Filter form visibility state
 * @param {function} props.onToggle - Toggle filter form handler
 * @param {function} props.onSearch - Search submission handler
 * @param {function} props.onClearSearch - Search clear handler
 * @param {boolean} [props.isSearching] - Search loading state
 */
const FilterControlsWithSearch = ({
	isOpen = false,
	onToggle = () => {},
	onSearch = () => {},
	onClearSearch = () => {},
	isSearching = false,
}) => (
	<div
		role="toolbar"
		aria-label="Filter and search controls"
		className="w-full flex justify-between items-center my-4 gap-10">
		<button
			type="button"
			onClick={onToggle}
			onKeyDown={(e) => e.key === "Enter" && onToggle()}
			aria-expanded={isOpen}
			aria-controls="filter-form"
			tabIndex="0"
			className="inline-flex items-center px-5 py-2.5 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
			{isOpen ? "Hide Filters" : "Show Filters"}
		</button>

		<SearchBar
			INPUT_STYLE={`focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:ring-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 rounded-e-lg rounded-s-lg dark:text-white border border-gray-300 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-500`}
			BUTTON_STYLE={`p-2.5 h-full text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-e-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800`}
			ON_SUBMIT={onSearch}
			CLEAR_SEARCH={onClearSearch}
			IS_LOADING={isSearching}
		/>
	</div>
);

FilterControlsWithSearch.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	onClearSearch: PropTypes.func.isRequired,
	isSearching: PropTypes.bool,
};

export default React.memo(FilterControlsWithSearch);
