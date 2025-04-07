import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatToLocaleDateString } from "../../utils/date";
import InfoCard from "./InfoCard";
import ListOptions from "../../components/ListOptions";

const INITIAL_LOG_LENGTH = 3;

const ActivityLogItem = (activity = {}, index) => (
	<li key={index} className="mb-8">
		<div className="relative pb-8">
			{index !== activity.length - 1 && (
				<span
					className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
					aria-hidden="true"></span>
			)}
			<div className="relative flex space-x-3">
				<div className="bg-blue-500 rounded-full flex items-center justify-center h-8 w-8 ring-8 ring-white">
					<svg
						className="h-5 w-5 text-white"
						fill="currentColor"
						viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="min-w-0 flex-1 pt-1.5 md:flex items-center justify-between space-x-4">
					<div className="lg:flex">
						{activity.action && (
							<p className="text-sm text-gray-800">{activity.action}:</p>
						)}
						{activity.details && (
							<span className="text-gray-500">{activity.details}</span>
						)}
					</div>
					<div className="text-right text-sm whitespace-nowrap text-gray-500">
						<time dateTime={activity.timestamp}>
							{formatToLocaleDateString(activity.timestamp)}
						</time>
					</div>
				</div>
			</div>
		</div>
	</li>
);

const ActivityLogToggler = ({ onToggle, showLess = false }) => (
	<div className="mt-4 text-center">
		<button
			onClick={onToggle}
			className="text-sm text-blue-600 hover:text-blue-800">
			{showLess ? "Show less activities" : "View all activities"}
		</button>
	</div>
);

ActivityLogToggler.propTypes = {
	onToggle: PropTypes.func.isRequired,
	showLess: PropTypes.bool.isRequired,
};
const RecentActivity = ({ activities = [] }) => {
	const [logLength, setLogLength] = useState(INITIAL_LOG_LENGTH);

	const toggleLogLength = () => {
		setLogLength(
			logLength > INITIAL_LOG_LENGTH ? INITIAL_LOG_LENGTH : activities.length
		);
	};

	return (
		<div className="mb-8">
			<InfoCard title="Recent Activity">
				<div className="w-full px-4 py-5 sm:p-6">
					<div className="">
						<ul className="-mb-8">
							<ListOptions
								OPTIONS={
									activities.length ? activities.slice(0, logLength) : []
								}
								RENDER_ITEM={ActivityLogItem}
								EMPTY_MESSAGE="No activity logs found"
							/>
						</ul>
					</div>
					{activities.length > INITIAL_LOG_LENGTH && (
						<ActivityLogToggler
							onToggle={toggleLogLength}
							showLess={logLength > INITIAL_LOG_LENGTH}
						/>
					)}
				</div>
			</InfoCard>
		</div>
	);
};

RecentActivity.propTypes = {
	activities: PropTypes.arrayOf(
		PropTypes.shape({
			action: PropTypes.string,
			details: PropTypes.string,
			timestamp: PropTypes.string,
		})
	),
};

export default RecentActivity;
