import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import CheckComponent from "./CheckComponent";
import RadioComponent from "./RadioComponent";
import { AccordionComponent, AccordionWrapper } from "./Accordion";
import useToggle from "../hooks/useToggle";
import { FILTER_FORMS_COMPONENTS } from "../constants/filter-form";
import ListOptions from "./ListOptions";

/**
 * Controlled Input Component: A  input component with a label.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the input field.
 * @param {Object} props.control - The control object from react-hook-form.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.type - The type of the input field.
 */
const ControlledInput = ({ name, type, control, label, defaultValue = "" }) => (
	<div className="flex flex-col mb-2">
		<label className="text-sm font-medium mb-1">{label.toUpperCase()}</label>
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => (
				<input
					type={type}
					className="border rounded p-1"
					placeholder={"Enter The " + label}
					{...field}
				/>
			)}
		/>
	</div>
);
ControlledInput.propTypes = {
	defaultValue: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
};
// Group check box component
const InputGroup = ({ options, control }) => (
	<ListOptions
		OPTIONS={options}
		RENDER_ITEM={(option, index) => (
			<ControlledInput key={index} {...option} control={control} />
		)}
	/>
);

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	control: PropTypes.object.isRequired,
};

/**
 * Checkbox Group Component: A  component for rendering a group of checkboxes.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the checkbox group.
 * @param {Array} props.options - The options for the checkbox group.
 * @param {Object} props.control - The control object from react-hook-form.
 */
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

/**
 * Radio Group Component: A  component for rendering a group of radio buttons.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the radio group.
 * @param {Array} props.options - The options for the radio group.
 * @param {Object} props.control - The control object from react-hook-form.
 */
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
/**
 * Filter Form Component: A reusable component for filtering products.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 * @param {Function} props.onClear - The function to call when the form is cleared.
 * @param {Array} props.FIELD_CONTENT - Configuration for the form fields.
 * @param {Object} props.DEFAULT_VALUES - Default values for the form fields.
 */
const FilterForm = ({
	ON_SUBMIT,
	ON_CLEAR,
	FIELD_CONTENT = [],
	DEFAULT_VALUES = {},
}) => {
	const [toggleAccordion, isToggled] = useToggle({ multiple: true });
	const { control, handleSubmit, reset } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	// Accordion content configuration

	// Form submission handler
	const onSubmit = (data) => {
		ON_SUBMIT(data);
	};

	// Reset form fields
	const clearAll = () => {
		reset();
		ON_CLEAR();
	};

	// Get component by type
	const getComponentByType = (type) => {
		switch (type) {
			case FILTER_FORMS_COMPONENTS.CHECKBOX:
				return CheckboxGroup;
			case FILTER_FORMS_COMPONENTS.RADIO:
				return RadioGroup;
			case FILTER_FORMS_COMPONENTS.INPUT:
				return InputGroup;
			default:
				return null;
		}
	};

	// Render accordion items
	const renderItems = ({ type, props, title }, index) => {
		const keyId = `${title}-accordion-${index}`;
		const Component = getComponentByType(type);
		return (
			<AccordionComponent
				key={keyId}
				ID={keyId}
				LABEL={title}
				IS_OPEN={isToggled(keyId)}
				TOGGLE_ACCORDION={() => toggleAccordion(keyId)}>
				<Component {...props} control={control} />
			</AccordionComponent>
		);
	};

	return (
		<form className="p-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<AccordionWrapper type={"open"}>
				<ListOptions OPTIONS={FIELD_CONTENT} RENDER_ITEM={renderItems} />
				{/* <AccordionComponent
					key={" price-accordion"}
					LABEL={"Price"}
					ID={"price-accordion"}
					IS_OPEN={isToggled("price-accordion")}
					TOGGLE_ACCORDION={() => toggleAccordion("price-accordion")}>
					<div className=" gap-4">
						<ControlledInput
							name="minPrice"
							control={control}
							label="Min Price"
						/>
						<ControlledInput
							name="maxPrice"
							control={control}
							label="Max Price"
						/>
					</div>
				</AccordionComponent> */}
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
	ON_CLEAR: PropTypes.func.isRequired,
	FIELD_CONTENT: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.oneOf(Object.values(FILTER_FORMS_COMPONENTS)).isRequired,
			title: PropTypes.string.isRequired,
			props: PropTypes.object.isRequired,
		})
	).isRequired,
	DEFAULT_VALUES: PropTypes.object,
};

export default FilterForm;
