import PropTypes from "prop-types";
// PasswordResetNotification Component
const PasswordResetNotification = ({
	isReset = false,
	notification = `We've sent a password reset link to your email. Please check your inbox.`,
	color = "blue",
	buttonText = "← Back to Login",
	onBackClick,
	children,
}) => {
	return isReset ? (
		<div className={`col-span-full mb-6 p-4 bg-${color}-50 rounded-md`}>
			<p className={`text-${color}-800 mb-3`}>{notification}</p>
			<button
				type="button"
				onClick={onBackClick}
				className={`text-sm text-${color}-600 hover:text-${color}-800 focus:outline-none`}>
				{buttonText}
			</button>
		</div>
	) : (
		children
	);
};

PasswordResetNotification.propTypes = {
	isReset: PropTypes.bool.isRequired,
	notification: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	onBackClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
export default PasswordResetNotification;
