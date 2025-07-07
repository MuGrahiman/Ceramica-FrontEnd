import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * A flexible wrapper component that provides consistent layout spacing and background options.
 * @param {Object} props - Component props
 * @param {boolean} [props.isWhite=false] - Determines if the background should be white
 * @param {React.ReactNode} props.children - Content to be wrapped
 * @returns {JSX.Element} A section wrapper with consistent padding and max-width
 */
const Wrapper = ({ isWhite = false, children }) => (
	<div className={clsx(isWhite ? "bg-white" : "bg-transparent")}>
		<div className="max-w-7xl container mx-auto py-12 px-4 sm:px-6 lg:px-8">
			{children}
		</div>
	</div>
);

// Prop type validation
Wrapper.propTypes = {
	isWhite: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Wrapper;
