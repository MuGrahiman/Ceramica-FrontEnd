import React from "react";
import PropTypes from "prop-types";
import { FaExclamationCircle } from "react-icons/fa";
import {
	STATS_COLOR_CONFIG,
	STATS_POSITION_CLASSES,
} from "../../constants/dashboard";

/**
 * Tooltip - Accessible tooltip component with keyboard navigation support
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Trigger element
 * @param {string} props.content - Tooltip content
 * @param {string} [props.position] - Tooltip position ('top'|'bottom')
 */
const Tooltip = ({ children, content = "", position = "bottom" }) => {
	const [visible, setVisible] = React.useState(false);

	return (
		<div
			className="relative inline-flex group"
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			onFocus={() => setVisible(true)}
			onBlur={() => setVisible(false)}
			tabIndex={0}
			aria-describedby="tooltip-content">
			{children}
			<FaExclamationCircle
				className="h-4 w-4 text-gray-400 ml-1"
				aria-hidden="true"
			/>
			{visible && (
				<div
					id="tooltip-content"
					role="tooltip"
					className={`absolute z-10 w-48 p-2 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg transition-opacity duration-200 ${STATS_POSITION_CLASSES[position]} left-1/2  transform -translate-x-1/2`}>
					{content}
				</div>
			)}
		</div>
	);
};

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	content: PropTypes.string.isRequired,
	position: PropTypes.oneOf(["top", "bottom"]),
};

/**
 * TrendIndicator - Displays trend data with directional styling
 * @param {Object} props - Component props
 * @param {string} props.value - Trend value (e.g., "+12%")
 * @param {boolean} props.positive - Whether the trend is positive
 */
const TrendIndicator = ({ value = "", positive = false }) => (
	<span
		className={`ml-2 text-sm ${positive ? "text-green-500" : "text-red-500"}`}>
		{value}
	</span>
);

TrendIndicator.propTypes = {
	value: PropTypes.string.isRequired,
	positive: PropTypes.bool,
};

/**
 * StatCard - Individual dashboard statistic card with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Display value
 * @param {Object} [props.trend] - Trend data { value: string, positive: boolean }
 * @param {string} [props.description] - Tooltip content
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.color - Color variant from STATS_COLOR_CONFIG
 */
const StatCard = ({
	title = "",
	value,
	trend = null,
	description = "",
	icon = null,
	color = "blue",
}) => {
	const colors = STATS_COLOR_CONFIG[color] || STATS_COLOR_CONFIG.blue;

	return (
		<article
			className={` bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all border-t-4 ${colors.border}`}
			aria-labelledby={`stat-${title
				.toLowerCase()
				.replace(/\s+/g, "-")}-title`}>
			<div className="flex flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-1 mb-1">
						<h3
							id={`stat-${title.toLowerCase().replace(/\s+/g, "-")}-title`}
							className="text-xs font-medium text-gray-500 uppercase tracking-wider">
							{title}
						</h3>
						{description && (
							<Tooltip content={description} position="bottom">
								<span className="sr-only">More information about {title}</span>
							</Tooltip>
						)}
					</div>
					<div className="flex items-baseline">
						<p className="text-2xl font-semibold text-gray-900">
							{typeof value === "number" && title.includes("Revenue")
								? `$${value.toLocaleString("en-US")}`
								: value}
						</p>
						{trend && (
							<TrendIndicator value={trend.value} positive={trend.positive} />
						)}
					</div>
				</div>
				<div
					className={`${colors.bg} ${colors.text} inline-flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full`}
					aria-hidden="true">
					{icon && React.cloneElement(icon, { className: "h-5 w-5" })}
				</div>
			</div>
		</article>
	);
};

StatCard.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	trend: PropTypes.shape({
		value: PropTypes.string,
		positive: PropTypes.bool,
	}),
	description: PropTypes.string,
	icon: PropTypes.element.isRequired,
	color: PropTypes.oneOf(Object.keys(STATS_COLOR_CONFIG)),
};

export default StatCard;
