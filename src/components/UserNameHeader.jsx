import React from "react";
import PropTypes from "prop-types";

/**
 * Displays a personalized greeting with user name.
 * @param {string} userName - The name of the user.
 */
const UserNameHeader = ({ userName }) => {
	return (
		<h1
			className="text-3xl md:text-4xl text-center font-bold 
              text-gray-800 mb-8 animate-fade-in max-w-md mx-auto overflow-hidden">
			{`Hello, ${userName} ..`}
		</h1>
	);
};

UserNameHeader.propTypes = {
	userName: PropTypes.string.isRequired,
};

export default UserNameHeader;
