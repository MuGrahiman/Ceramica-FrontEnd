import React from "react";
import PropTypes from "prop-types";
import BackToButton from "./BackToButton";

/**
 * AuthRedirectMessage Component
 * A reusable message component for redirection in authentication pages.
 *
 * @param {string} message - The message to display before the link.
 * @param {string} linkText - The text to display on the link.
 * @param {string} linkTo - The route to navigate to on link click.
 */
const AuthRedirectMessage = ({
	message ,
	linkText = "Login",
	linkTo = "/login",
	color = "blue",
}) => {
	return (
		<p className="align-baseline font-medium mt-4 text-center text-sm">
			{message} <BackToButton buttonText={linkText} to={linkTo} color={color} />
		</p>
	);
};

AuthRedirectMessage.propTypes = {
	message: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired,
	linkTo: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};

export default AuthRedirectMessage;
