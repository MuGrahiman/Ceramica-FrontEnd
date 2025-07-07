import React from "react";
import PropTypes from "prop-types";
import CountUpNumber from "../../components/CountUpNumber";
import ListOptions from "../../components/ListOptions";

/**
 * StatsBar - Displays a bar of animated statistics in a responsive grid.
 *
 * @param {Object} props - Component props
 * @param {Array<{value: string, label: string}>} props.stats - Statistics to display
 * @returns {JSX.Element} Statistics bar component
 */
const StatsBar = ({ stats }) => {
	return (
		<div
			role="region"
			aria-label="Statistics"
			className="bg-amber-900 text-white py-8">
			<div className="container mx-auto px-4">
				<div
					role="list"
					className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
					<ListOptions
						OPTIONS={stats}
						RENDER_ITEM={(stat) => <StatItem key={stat.label} {...stat} />}
						EMPTY_MESSAGE={"No statistics available"}
					/>
				</div>
			</div>
		</div>
	);
};

const StatItem = ({ value, label }) => (
	<div role="listitem" aria-label={`${value} ${label}`} className="p-4">
		<p className="text-3xl font-bold mb-1">
			<CountUpNumber value={value} />
		</p>
		<p className="text-sm uppercase tracking-wider">{label}</p>
	</div>
);

StatItem.propTypes = {
	value: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
};

StatsBar.propTypes = {
	stats: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default StatsBar;
