import PropTypes from "prop-types";
import React from "react";
import { GiBrokenPottery } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { VscRefresh } from "react-icons/vsc";
import { Link } from "react-router-dom";

/**
 * ErrorTemplate - Reusable error display component with customizable messages and actions
 *
 * @param {Object} props
 * @param {string} [props.title="Oh no! Something cracked..."] - Main error title
 * @param {string} [props.message="We encountered an issue"] - Primary error message
 * @param {string} [props.subMessage="we're working to fix this"] - Secondary message
 * @param {boolean} [props.showReloadLink=false] - Show reload button
 * @param {boolean} [props.showHomeLink=false] - Show home navigation link
 * @returns {JSX.Element} Error template component
 */
const ErrorTemplate = ({
	title = "Oh no! Something cracked...",
	message = "We encountered an issue while handling your request",
	subMessage = "we're working to fix this",
	showReloadLink = false,
	showHomeLink = false,
}) => {
	const handleReload = () => window.location.reload();

	return (
		<div
			className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md overflow-hidden"
			role="alert"
			aria-live="assertive">
			<div className="text-center">
				{/* Broken Pottery Icon */}
				<div className="flex justify-center mb-6">
					<GiBrokenPottery
						className="h-16 w-16 text-amber-600 animate-bounce"
						aria-hidden="true"
					/>
				</div>

				{/* Title */}
				<h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>

				{/* Messages */}
				<div className="text-gray-600 mb-6">
					<p>{message}</p>
					<p className="text-sm text-gray-500">{subMessage}</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row justify-center gap-3">
					{showReloadLink && (
						<button
							onClick={handleReload}
							className="group px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
							aria-label="Reload page">
							<VscRefresh className="w-6 h-6 group-hover:animate-spin" />
							Reload
						</button>
					)}

					{showHomeLink && (
						<Link
							to="/"
							className="group px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
							aria-label="Return to home page">
							<IoHome className="w-6 h-6 group-hover:animate-pulse" /> Back to
							Home
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

ErrorTemplate.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	subMessage: PropTypes.string,
	showReloadLink: PropTypes.bool,
	showHomeLink: PropTypes.bool,
};

export default React.memo(ErrorTemplate);
