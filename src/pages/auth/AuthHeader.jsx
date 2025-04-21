import React from "react";
import PropTypes from "prop-types";

/**
 * AuthHeader Component
 * A reusable header component for authentication pages.
 *
 * @param {string} title - The main title of the header.
 * @param {string} description - The description text below the title.
 */
const AuthHeader = ({
	title = "Enter your Credentials",
	description = "Enter your Credentials for manage your account.",
}) => (
	<header className="mt-8 mb-4 text-center">
		<h1 className="text-2xl font-bold mb-1">{title}</h1>
		<p className="text-[15px] text-slate-500">{description}</p>
	</header>
);

AuthHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
};
export default AuthHeader;
