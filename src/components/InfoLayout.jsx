import React from "react";
import PropTypes from "prop-types";

/**
 * InfoLayout - Reusable layout component for displaying grouped information
 * @param {string} title - Layout title
 * @param {ReactNode} children - Layout content
 * @param {ReactElement} icon - Icon component to display
 */
const InfoLayout = ({ icon: Icon, title = "Untitled", children }) => {
	return (
		<div
			className="h-full bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
			// className="animate-slide-up bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg "
		>
			<div
				className="px-6 py-5 border-b border-gray-200"
				//  className="px-4 py-5 sm:px-6 border-b border-gray-200"
			>
				<h3
					id="info-layout-title"
					className="text-xl font-semibold text-gray-900 ">
					{Icon && <Icon />}
					{title}
				</h3>
			</div>
			<div className="px-4 py-5 sm:p-6" aria-labelledby="info-layout-title">
				{children}
			</div>
		</div>
	);
};

InfoLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	icon: PropTypes.element,
};

export default InfoLayout;
