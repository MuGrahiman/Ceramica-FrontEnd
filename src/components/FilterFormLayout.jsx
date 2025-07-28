// components/FilterForm/FilterFormLayout.jsx
import React from "react";
import FilterForm from "./FilterForm";

const FilterFormLayout = ({
	children,
	isOpen,
	onSubmit,
	onClear,
	fieldContents,
	defaultValues,
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

export default FilterFormLayout;
