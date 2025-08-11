import React from "react";
import PropTypes from "prop-types";

/**
 * InfoLayout - Reusable container component for consistent information display
 * @param {Object} props - Component props
 * @param {string} [props.title="Untitled"] - Section title
 * @param {ReactNode} props.children - Content to display
 * @param {ReactNode} [props.leftComponent] - Optional left component (icon, button, etc.)
 * @param {ReactNode} [props.rightComponent] - Optional right component (icon, button, etc.)
 */
const InfoLayout = ({
	title = "Untitled",
	rightComponent,
	leftComponent,
	children,
}) => {
	return (
		<div className="w-full h-full bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
			<div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
				<div className="flex items-center gap-2">
					{leftComponent} {/* Render directly if it's a React node */}
					<h3 id="info-layout-title" className="font-semibold text-gray-900">
						{title}
					</h3>
				</div>
				{rightComponent} {/* Render directly if it's a React node */}
			</div>
			<div className="p-4" aria-labelledby="info-layout-title">
				{children}
			</div>
		</div>
	);
};

InfoLayout.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
	leftComponent: PropTypes.node,
	rightComponent: PropTypes.node,
};

export default React.memo(InfoLayout);
