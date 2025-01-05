import PropTypes from "prop-types";
import React from "react";

const typeEnum = {
	OPEN: "open",
	COLLAPSE: "collapse",
	FLUSH: "flush",
};

/**
 * AccordionWrapper Component
 * @param {string} type - Type of accordion (open, collapse, flush).
 * @param {string} activeClass - Class for active state.
 * @param {string} inactiveClass - Class for inactive state.
 * @param {React.ReactNode} children - Child components.
 */
export const AccordionWrapper = ({
	TYPE = typeEnum.COLLAPSE,
	ACTIVE_CLASS = "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
	INACTIVE_CLASS = "text-gray-500 dark:text-gray-400",
	children,
}) => {
	return (
		<div
			id={`accordion-${TYPE}`}
			// className="w-full"
			data-accordion={TYPE} // [open, collapse, flush]
			data-active-classes={ACTIVE_CLASS}
			data-inactive-classes={INACTIVE_CLASS}>
			{children}
		</div>
	);
};

// PropType validation for AccordionWrapper
AccordionWrapper.propTypes = {
	TYPE: PropTypes.oneOf(Object.values(typeEnum)),
	ACTIVE_CLASS: PropTypes.string,
	INACTIVE_CLASS: PropTypes.string,
	children: PropTypes.node.isRequired,
};

/**
 * AccordionComponent
 * @param {string} id - Unique identifier for the accordion.
 * @param {string} label - Label for the accordion header.
 * @param {boolean} isOpen - Accordion open state.
 * @param {function} toggleAccordion - Function to toggle accordion state.
 * @param {React.ReactNode} children - Content to display in the accordion.
 */
export const AccordionComponent = ({
	ID,
	LABEL = "What is Accordion?",
	IS_OPEN = false,
	TOGGLE_ACCORDION,
	children,
}) => {
	return (
		<>
			<h2
				onClick={TOGGLE_ACCORDION}
				id={`accordion-open-heading-${LABEL}-${ID}`}>
				<button
					type="button"
					className={`flex items-center justify-between w-full py-5 font-medium rtl:text-right border-b border-gray-200 dark:border-gray-700 gap-3`}
					aria-expanded={IS_OPEN}
					aria-controls={`accordion-open-body-${LABEL}-${ID}`}>
					<span>{LABEL}</span>
					<svg
						data-accordion-icon
						className={`w-3 h-3 transition-transform ${
							IS_OPEN ? "rotate-0" : "rotate-180"
						} shrink-0`}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5 5 1 1 5"
						/>
					</svg>
				</button>
			</h2>
			<div
				id={`accordion-open-body-${LABEL}-${ID}`}
				className={IS_OPEN ? "" : "hidden"}
				aria-labelledby={`accordion-open-heading-${LABEL}-${ID}`}>
				<div className="py-5 border-b border-gray-200 dark:border-gray-700">
					{children}
				</div>
			</div>
		</>
	);
};

// PropType validation for AccordionComponent
AccordionComponent.propTypes = {
	ID: PropTypes.string.isRequired,
	LABEL: PropTypes.string.isRequired,
	IS_OPEN: PropTypes.bool.isRequired,
	TOGGLE_ACCORDION: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
