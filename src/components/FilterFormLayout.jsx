// components/FilterForm/FilterFormLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import FilterForm from "./FilterForm";

/**
 * FilterFormLayout - A layout component that manages filter form visibility
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Main content
 * @param {boolean} props.isOpen - Controls filter visibility
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.onClear - Form clear handler
 * @param {Array} props.fieldContents - Filter field configurations
 * @param {Object} props.defaultValues - Default form values
 */
const FilterFormLayout = ({
	isOpen = false,
	onSubmit = () => {},
	onClear = () => {},
	fieldContents = [],
	defaultValues = {},
	children,
}) => {
	return (
		<div className="relative mb-12 min-h-screen">
			{/* Content Area */}
			<div
				className={`w-full shadow-lg transition-all duration-700 ease-in-out ${
					isOpen ? "opacity-0 -z-50" : "opacity-100 z-50"
				}`}>
				{children}
			</div>

			{/* Filter Form Area */}
			<aside
				aria-hidden={isOpen}
				aria-label="Product filters"
				className={`absolute top-0 left-0 w-full p-4 transition-all duration-700 ease-in-out ${
					isOpen
						? "translate-y-0 z-50 opacity-100"
						: "-translate-y-full opacity-0 -z-50"
				} bg-gray-800 text-gray-500 text-lg`}>
				<FilterForm
					ON_SUBMIT={onSubmit}
					ON_CLEAR={onClear}
					FIELD_CONTENT={fieldContents}
					DEFAULT_VALUES={defaultValues}
				/>
			</aside>
		</div>
	);
};

FilterFormLayout.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired,
	fieldContents: PropTypes.array.isRequired,
	defaultValues: PropTypes.object,
	children: PropTypes.node,
};

export default React.memo(FilterFormLayout);
