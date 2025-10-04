import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import PropTypes from "prop-types";
import AnimatedH1 from "./AnimatedH1";

/**
 * Reusable page header component with optional action button
 *
 * @param {Object} props
 * @param {string} [props.title="Header"] - Header text (required)
 * @param {boolean} [props.showActionLink=false] - Toggles action link visibility
 * @param {string} [props.actionLink="#"] - Link destination
 * @param {string} [props.actionText="Action"] - Link text
 * @param {React.Component} [props.ActionIcon=MdOutlineAdd] - Icon component
 * @param {Object} [props.iconProps] - Props passed to the icon
 */
const PageHeader = ({
	title = "Header",
	showActionLink = false,
	actionLink = "#",
	actionText = "Action",
	ActionIcon = MdOutlineAdd,
	iconProps = { className: "h-6 w-6" },
}) => (
	<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-2 sm:mb-6">
		<AnimatedH1 title={title}/>
		{showActionLink && (
			<Link
				to={actionLink}
				className="inline-flex items-center gap-2 px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				aria-label={actionText}>
				<ActionIcon {...iconProps} aria-hidden="true" />
				{actionText}
			</Link>
		)}
	</div>
);

PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
	showActionLink: PropTypes.bool,
	actionLink: PropTypes.string,
	actionText: PropTypes.string,
	ActionIcon: PropTypes.elementType,
	iconProps: PropTypes.object,
};

export default React.memo(PageHeader);
