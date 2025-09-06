import React from "react";
import PropTypes from "prop-types";
import ListOptions from "./ListOptions";

/**
 * DropdownMenu - A reusable dropdown menu component with maximum positioning control
 * @param {Object} props - Component properties
 * @param {Array} props.options - Array of options to display in the dropdown
 * @param {Function} props.onSelect - Callback function when an option is selected
 * @param {boolean} props.isOpen - Controls the visibility of the dropdown
 * @param {Function} props.setIsOpen - Function to control dropdown visibility state
 * @param {Function} [props.renderKey] - Function to render option label
 * @param {Function} [props.renderValue] - Function to extract option value
 * @param {Function} [props.isOptionSelected] - Function to determine if option is selected
 * @param {Object} [props.position] - Custom positioning object
 * @param {string} [props.position.top] - Top position (e.g., "100%", "50px")
 * @param {string} [props.position.bottom] - Bottom position
 * @param {string} [props.position.left] - Left position
 * @param {string} [props.position.right] - Right position
 * @param {string} [props.position.transform] - Transform property
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.style] - Additional inline styles
 */
const DropdownMenu = ({
	options = [],
	onSelect = () => {},
	isOpen = false,
	setIsOpen = () => {},
	renderKey = (option) => option.label,
	renderValue = (option) => option.value,
	isOptionSelected = (option) => false,
	position = {},
	className = "w-full",
	style = {},
}) => {
	/**
	 * Handles option selection
	 * @param {Object} option - The selected option object
	 */
	const handleSelect = (option) => {
		onSelect(option);
		setIsOpen(false);
	};

	/**
	 * Gets the unique key for an option
	 * @param {Object} option - The option object
	 * @returns {string|number} Unique identifier for the option
	 */
	const getOptionKey = (option) => {
		const value = renderKey(option);
		return value !== undefined && value !== null
			? value
			: JSON.stringify(option);
	};

	const positionStyle = {
		top: position.top || "100%",
		bottom: position.bottom || "auto",
		left: position.left || "0",
		right: position.right || "auto",
		transform: position.transform || "none",
		marginTop: position.marginTop || "0.5rem",
		...position,
	};

	return (
		<div
			role="menu"
			aria-label="Dropdown menu"
			className={`
			absolute z-50 bg-blue-950 border border-gray-300
			rounded-lg shadow-2xl shadow-blue-900/50
			transform origin-top
			transition-all duration-300 ease-out
			${
				isOpen
					? "opacity-100 scale-100 translate-y-0"
					: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
			}
			${className}
		`}
			style={{
				...positionStyle,
				...style,
			}}>
			<ul className="relative rounded-lg list-none m-0 p-0">
				<ListOptions
					OPTIONS={options}
					RENDER_ITEM={(option, index) => {
						const optionKey = getOptionKey(option);
						const isSelected = isOptionSelected(option);

						return (
							<li
								key={optionKey}
								role="menuitem"
								tabIndex={isOpen ? 0 : -1}
								onClick={() => handleSelect(option)}
								className={`
					px-4 py-3 cursor-pointer transition-all duration-200
					transform origin-center outline-none
					hover:scale-[1.02] hover:bg-gray-300 hover:bg-opacity-20
					focus:bg-gray-300 focus:bg-opacity-20 focus:ring-2 focus:ring-gray-400
					${
						isSelected
							? "bg-gray-300 bg-opacity-20 text-gray-100 font-medium"
							: "text-gray-200 hover:text-gray-100"
					}
					${index === 0 ? "rounded-t-lg" : ""}
					${index === options.length - 1 ? "rounded-b-lg" : ""}
					border-b border-gray-300 border-opacity-20 last:border-b-0
				`}
								style={{
									transitionDelay: `${index * 20}ms`,
									transform: isOpen ? "scale(1)" : "scale(0.95)",
									opacity: isOpen ? 1 : 0,
								}}
								aria-selected={isSelected}>
									{renderValue(option)}
					
								{/* Subtle background texture */}
								<div
									className="absolute inset-0 opacity-10 bg-gradient-to-r from-gray-300 to-gray-400 pointer-events-none rounded-lg"
									aria-hidden="true"
								/>
							</li>
						);
					}}
				/>
			</ul>

			{/* Border effect */}
			<div
				className="absolute inset-0 border border-gray-300 border-opacity-30 rounded-lg pointer-events-none"
				aria-hidden="true"
			/>
		</div>
	);
};

DropdownMenu.propTypes = {
	options: PropTypes.arrayOf(PropTypes.any).isRequired,
	onSelect: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	renderKey: PropTypes.func,
	renderValue: PropTypes.func,
	isOptionSelected: PropTypes.func,
	position: PropTypes.shape({
		top: PropTypes.string,
		bottom: PropTypes.string,
		left: PropTypes.string,
		right: PropTypes.string,
		transform: PropTypes.string,
		marginTop: PropTypes.string,
		marginBottom: PropTypes.string,
		marginLeft: PropTypes.string,
		marginRight: PropTypes.string,
	}),
	className: PropTypes.string,
	style: PropTypes.object,
};

export default React.memo(DropdownMenu);
