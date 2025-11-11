import React from "react";
import PropTypes from "prop-types";

/**
 * SocialSignInButton Component
 *
 * A reusable, modular button component for social media authentication.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSocialSignIn - Parent callback function for orchestrating the sign-in process
 * @param {React.Element} props.socialIcon - Icon component to display alongside button text
 * @param {string} props.socialButtonLabel - Text label displayed on the button
 * @param {boolean} props.isSigningIn - Loading state that disables the button during authentication
 * @returns {React.ReactElement} A styled social sign-in button with socialIcon
 */
const SocialSignInButton = ({
	onSocialSignIn,
	socialIcon: Icon,
	socialButtonLabel,
	isSigningIn = false,
}) => {

	return (
		<div className="mt-4">
			<button
				onClick={onSocialSignIn}
				disabled={isSigningIn}
				className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
				aria-label={socialButtonLabel}>
				<Icon className="mr-2" />
				{socialButtonLabel}
			</button>
		</div>
	);
};

SocialSignInButton.propTypes = {
	onSocialSignIn: PropTypes.func.isRequired,
	socialIcon: PropTypes.elementType.isRequired,
	socialButtonLabel: PropTypes.string.isRequired,
	isSigningIn: PropTypes.bool,
};

export default SocialSignInButton;
