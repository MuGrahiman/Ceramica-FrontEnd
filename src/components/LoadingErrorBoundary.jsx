import PropTypes from "prop-types";
import ErrorTemplate from "./ErrorTemplate";
import LoadingTemplate from "./LoadingTemplate";

/**
 * Handles loading and error states consistently across pages.
 * Supports custom loaders/errors while providing sensible defaults.
 *
 * @param {Object} props
 * @param {boolean} props.isLoading - Loading state flag
 * @param {boolean} props.isError - Error state flag
 * @param {string} [props.loadingMessage] - Loading message text
 * @param {string} [props.errorMessage] - Error message text
 * @param {Component} [props.CustomLoaderTemplate] - Custom loading component
 * @param {Component} [props.CustomErrorTemplate] - Custom error component
 * @param {ReactNode} props.children - Content to render when no loading/error
 */
const LoadingErrorBoundary = ({
	isLoading = false,
	isError = false,
	loadingMessage = "Loading...",
	errorMessage = "Error fetching data",
	CustomLoaderTemplate,
	CustomErrorTemplate,
	children,
	...rest
}) => {
	if (isLoading) {
		return CustomLoaderTemplate ? (
			<CustomLoaderTemplate message={loadingMessage} {...rest} />
		) : (
			<div
				role="alert"
				aria-live="polite"
				className="flex items-center justify-center h-dvh ">
				<LoadingTemplate message={loadingMessage} />
			</div>
		);
	}

	if (isError) {
		return CustomErrorTemplate ? (
			<CustomErrorTemplate message={errorMessage} {...rest}/>
		) : (
			<div className="flex items-center justify-center h-dvh">
				<ErrorTemplate
					message={errorMessage}
					showHomeLink
					showReloadLink
					subMessage="Please try again later"
					title="Oops! Something went wrong"
				/>
			</div>
		);
	}

	return children;
};

LoadingErrorBoundary.propTypes = {
	isLoading: PropTypes.bool,
	isError: PropTypes.bool,
	loadingMessage: PropTypes.string,
	errorMessage: PropTypes.string,
	CustomLoaderTemplate: PropTypes.elementType,
	CustomErrorTemplate: PropTypes.elementType,
	children: PropTypes.node.isRequired,
};

export default LoadingErrorBoundary;
