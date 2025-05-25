import React from "react";
import PropTypes from "prop-types";

/**
 * A reusable heading component that displays a heading text with an optional icon.
 * @param {Object} props - Component props.
 * @param {string} props.headingText - The text to display as the heading.
 * @param {React.ReactNode} [props.icon] - The optional icon to display next to the heading.
 * @param {string} [props.className] - Additional CSS classes to apply to the heading.
 * @returns {JSX.Element} The rendered Heading component.
 */
const InfoSubHeading = ({ headingText ='', icon=null, className = "" }) => {
	return (
		<h4
			className={`flex items-center text-sm font-medium text-gray-900 mb-2 ${className}`}
			aria-label={icon ? `${headingText} with icon` : headingText}
			data-testid="info-subheading">
			{icon && (
				<span
					className="mr-2 text-gray-500 w-4 h-4 flex-shrink-0"
					data-testid="info-subheading-icon">
					{icon}
				</span>
			)}
			<span data-testid="info-subheading-text">{headingText}</span>
		</h4>
	);
};

InfoSubHeading.propTypes = {
	headingText: PropTypes.string.isRequired,
	icon: PropTypes.node,
	className: PropTypes.string,
};


export default React.memo(InfoSubHeading);
