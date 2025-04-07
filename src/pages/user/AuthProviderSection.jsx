import React from "react";
import PropTypes from "prop-types";
import AuthMethodCard from "./AuthMethodCard";

/**
 * AuthProviderSection - Displays all authentication methods
 * @param {Object} authProviders - authProviders data
 */
const AuthProviderSection = ({ authProvider = {} }) => {
	const authMethods = [
		{
			name: "Email/Password",
			isConnected:
				!!authProvider?.local?.email && !!authProvider?.local?.password,
			icon: EmailIcon,
			color: "green",
		},
		{
			name: "Google",
			isConnected: !!authProvider?.google?.id,
			icon: GoogleIcon,
			color: "red",
		},
		{
			name: "Facebook",
			isConnected: !!authProvider?.facebook?.id,
			icon: FacebookIcon,
			color: "blue",
		},
	];

	return (
		<div className="space-y-4">
			{authMethods.map((method) => (
				<AuthMethodCard key={method.name} {...method} />
			))}
		</div>
	);
};

AuthProviderSection.propTypes = {
	authProvider: PropTypes.shape({
		local: PropTypes.shape({
			email: PropTypes.string,
			password: PropTypes.string,
		}),
		google: PropTypes.shape({ email: PropTypes.string, id: PropTypes.string }),
		facebook: PropTypes.shape({
			email: PropTypes.string,
			id: PropTypes.string,
		}),
	}).isRequired,
};
export default AuthProviderSection;

// ==================== ICONS ====================

const EmailIcon = () => (
	<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
		<path
			fillRule="evenodd"
			d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
			clipRule="evenodd"
		/>
	</svg>
);

const GoogleIcon = () => (
	<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
		<path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.699-6.735-2.699-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
	</svg>
);

const FacebookIcon = () => (
	<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
		<path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
	</svg>
);
