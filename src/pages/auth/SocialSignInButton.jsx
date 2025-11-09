import React from "react";
import PropTypes from "prop-types";

/**
 * SocialSignInButton Component
 *
 * A reusable, modular button component for social media authentication.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSocialSignIn - Parent callback function for orchestrating the sign-in process
 * @param {Function} props.socialSignInMethod - Specific authentication method (e.g., signInWithGoogle)
 * @param {string} props.socialPlatform - Social media platform identifier (e.g., "google", "facebook")
 * @param {React.Element} props.socialIcon - Icon component to display alongside button text
 * @param {string} props.socialButtonLabel - Text label displayed on the button
 * @param {boolean} props.isSigningIn - Loading state that disables the button during authentication
 * @returns {React.ReactElement} A styled social sign-in button with socialIcon
 */
const SocialSignInButton = ({
	onSocialSignIn,
	socialSignInMethod,
	socialPlatform,
	socialIcon: Icon,
	socialButtonLabel,
	isSigningIn = false,
}) => {
	/**
	 * Handles the button click event
	 * Invokes the parent's sign-in handler with the specific authentication method and platform
	 */
	const onButtonClick = () =>
		onSocialSignIn(socialSignInMethod, socialPlatform);

	return (
		<div className="mt-4">
			<button
				onClick={onButtonClick}
				disabled={isSigningIn}
				className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
				aria-label={`Sign in with ${socialPlatform}`}>
				<Icon className="mr-2" />
				{socialButtonLabel}
			</button>
		</div>
	);
};

SocialSignInButton.propTypes = {
	onSocialSignIn: PropTypes.func.isRequired,
	socialSignInMethod: PropTypes.func.isRequired,
	socialPlatform: PropTypes.string.isRequired,
	socialIcon: PropTypes.elementType.isRequired,
	socialButtonLabel: PropTypes.string.isRequired,
	isSigningIn: PropTypes.bool,
};

export default SocialSignInButton;
