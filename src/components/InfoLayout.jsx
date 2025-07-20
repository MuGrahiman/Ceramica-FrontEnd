import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

/**
 * InfoLayout - Reusable container component for consistent information display
 * @param {Object} props - Component props
 * @param {string} [props.title="Untitled"] - Section title
 * @param {ReactNode} props.children - Content to display
 * @param {ReactElementType} [props.icon] - Optional header icon component
 * @param {string} [props.linkText="View all"] - Text for the link button
 * @param {string|Object} [props.linkedTo="/"] - Route path or location object
 * @param {boolean} [props.showLink=false] - Whether to show navigation link
 */
const InfoLayout = ({
	icon: Icon,
	title = "Untitled",
	linkText = "View all",
	linkedTo = "/",
	showLink = false,
	children,
}) => {
	return (
		<div className="w-full h-full bg-white rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
			<div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
				<div className="flex items-center gap-2">
					{Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
					<h3 id="info-layout-title" className="font-semibold text-gray-900">
						{title}
					</h3>
				</div>

				{showLink && (
					<Link
						to={linkedTo}
						className="inline-flex items-center justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-blue-600 hover:text-blue-950"
						aria-label={linkText ? undefined : `Navigate to ${title}`}>
						{linkText}
						<IoIosArrowForward className="h-4 w-4" />
					</Link>
				)}
			</div>
			<div className="p-4 " aria-labelledby="info-layout-title">
				{children}
			</div>
		</div>
	);
};

InfoLayout.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
	icon: PropTypes.elementType,
	linkText: PropTypes.string,
	linkedTo: PropTypes.string,
	showLink: PropTypes.bool,
};

export default React.memo(InfoLayout);
