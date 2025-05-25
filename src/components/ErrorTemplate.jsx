import PropTypes from "prop-types";
import React from "react";
import { MdCircleNotifications } from "react-icons/md";

const ErrorTemplate = ({ errorMessage }) => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
			<div className="bg-red-50 border-l-4 border-red-400 p-4">
				<div className="flex">
					<div className="flex-shrink-0">
						<MdCircleNotifications className="h-5 w-5 text-red-400" />
					</div>
					<div className="ml-3">
						<p className="text-sm text-red-700">
							Error fetching order details: {errorMessage}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-2 text-sm text-red-600 hover:text-red-500">
							Try again
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
ErrorTemplate.propTypes = {
	errorMessage: PropTypes.string.isRequired,
};
export default ErrorTemplate;
