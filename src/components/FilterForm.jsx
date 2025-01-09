import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import CheckComponent from "./CheckComponent";
import RadioComponent from "./RadioComponent";
import { AccordionComponent, AccordionWrapper } from "./Accordion";
import useToggle from "../hooks/useToggle";
import {
	CATEGORIES_OPTIONS,
	DEFAULT_VALUES,
	SIZES_OPTIONS,
	SORT_OPTIONS,
} from "../constants/filter-form";
import ListOptions from "./ListOptions";

// Group check box component
const CheckboxGroup = ({ name, options, control }) => (
	<ListOptions
		OPTIONS={options}
		RENDER_ITEM={(option, index) => (
			<CheckComponent
				key={index}
				NAME={name}
				CONTROL={control}
				OPTION={option}
			/>
		)}
	/>
);
CheckboxGroup.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	control: PropTypes.object.isRequired,
};

// Group radio component
const RadioGroup = ({ name, options, control }) => (
	<ListOptions
		OPTIONS={options}
		RENDER_ITEM={(option, index) => (
			<RadioComponent
				key={index}
				NAME={name}
				CONTROL={control}
				OPTION={option}
			/>
		)}
	/>
);
RadioGroup.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	control: PropTypes.object.isRequired,
};

// Input component for price
const PriceInput = ({ name, control, label }) => (
	<div className="flex flex-col">
		<label className="text-sm font-medium">{label}</label>
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<input
					type="number"
					className="border rounded p-2 "
					placeholder={label}
					{...field}
				/>
			)}
		/>
	</div>
);
PriceInput.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
};

// Main Filter Form Component
const FilterForm = ({ ON_SUBMIT, ON_CLEAR }) => {
	const [toggleA, isToggled] = useToggle({ multiple: true });
	const { control, handleSubmit, reset } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	// Accordion content configuration
	const FieldContent = [
		{
			title: "Filter by Category",
			component: CheckboxGroup,
			props: { name: "categories", options: CATEGORIES_OPTIONS, control },
		},
		{
			title: "Filter by Size",
			component: CheckboxGroup,
			props: { name: "sizes", options: SIZES_OPTIONS, control },
		},
		{
			title: "Sort By",
			component: RadioGroup,
			props: { name: "sort", options: SORT_OPTIONS, control },
		},
	];

	// Form submission handler
	const onSubmit = (data) => {
		ON_SUBMIT(data);
	};

	// Reset form fields
	const clearAll = () => {
		ON_CLEAR();
		reset();
	};

	const renderItems = ({ component: Component, props, title }, index) => {
		const keyId = `${title}-accordion-${index}`;
		return (
			<AccordionComponent
				key={keyId}
				ID={keyId}
				LABEL={title}
				IS_OPEN={isToggled(keyId)}
				TOGGLE_ACCORDION={() => toggleA(keyId)}>
				<Component {...props} />
			</AccordionComponent>
		);
	};

	return (
		<form className="p-4 space-y-6" onSubmit={handleSubmit(ON_SUBMIT)}>
			<AccordionWrapper type={"open"}>
				<ListOptions OPTIONS={FieldContent} RENDER_ITEM={renderItems} />
				<AccordionComponent
					key={" price-accordion"}
					LABEL={"Price"}
					ID={"price-accordion"}
					IS_OPEN={isToggled("price-accordion")}
					TOGGLE_ACCORDION={() => toggleA("price-accordion")}>
					<div className=" gap-4">
						<PriceInput name="minPrice" control={control} label="Min Price" />
						<PriceInput name="maxPrice" control={control} label="Max Price" />
					</div>
				</AccordionComponent>
			</AccordionWrapper>

			<div className="flex gap-4">
				<button
					type="button"
					onClick={clearAll}
					className="w-full py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500">
					Clear All
				</button>
				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
					Submit
				</button>
			</div>
		</form>
	);
};
FilterForm.propTypes = {
	ON_SUBMIT: PropTypes.func.isRequired,
};
export default FilterForm;
