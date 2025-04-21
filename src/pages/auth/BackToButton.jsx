import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Corrected import

/**
 * BackToButton Component
 * A reusable button component that navigates back to a specified link.
 *
 * @param {string} buttonText - The text to display on the button.
 * @param {string} to - The URL to navigate to when the button is clicked.
 */
const BackToButton = ({
	buttonText = "Login",
	to = "/login",
	color = "blue",
}) => (
	<Link
		to={to}
		className={`text-sm text-${color}-500 hover:text-${color}-700 focus:outline-none`}>
		{buttonText}
	</Link>
);

BackToButton.propTypes = {
	buttonText: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};

export default BackToButton;
