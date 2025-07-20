import React from "react";
import PropTypes from "prop-types";
import {
	FaDollarSign,
	FaExclamationTriangle,
	FaInbox,
	FaRegClock,
	FaShoppingCart,
	FaUsers,
} from "react-icons/fa";

import ListOptions from "../../components/ListOptions";
import StatCard from "./StatCard";

/**
 * StatsOverview - Dashboard statistics overview component
 * Displays key metrics in a responsive grid layout
 * @param {Object} props - Component props
 * @param {number} props.totalUsers - Total user count
 * @param {number} props.totalOrders - Total order count
 * @param {number} props.totalRevenue - Total revenue amount
 * @param {number} props.lowStockCount - Low stock items count
 * @param {number} props.pendingEnquiryCount - Pending inquiries count
 * @param {string} props.monthlyGrowth - Monthly growth percentage
 * @param {number} props.pendingOrderCount - Pending orders count
 */

const StatsOverview = ({
	totalUsers = 0,
	totalOrders = 0,
	totalRevenue = 0,
	lowStockCount = 0,
	pendingEnquiryCount = 0,
	monthlyGrowth = "+0%",
	pendingOrderCount = 0,
}) => {
	const statsData = [
		{
			title: "Total Users",
			value: totalUsers,
			description: "Registered active users in the system",
			color: "blue",
			icon: <FaUsers />,
			trend: { value: "+12%", positive: true },
		},
		{
			title: "Total Orders",
			value: totalOrders,
			description: "All orders placed in the system",
			color: "green",
			icon: <FaShoppingCart />,
		},
		{
			title: "Total Revenue",
			value: totalRevenue,
			color: "purple",
			icon: <FaDollarSign />,
			description: "Total revenue generated",
			trend: {
				value: monthlyGrowth,
				positive: !monthlyGrowth.startsWith("-"),
			},
		},
		{
			title: "Pending Inquiries",
			value: pendingEnquiryCount,
			description: "Customer inquiries awaiting response",
			color: "yellow",
			icon: <FaInbox />,
		},
		{
			title: "Low Stock Items",
			value: lowStockCount,
			description: "Products with stock below threshold",
			color: "red",
			icon: <FaExclamationTriangle />,
		},
		{
			title: "Pending Processing",
			value: pendingOrderCount,
			description: "Orders awaiting fulfillment",
			color: "amber",
			icon: <FaRegClock />,
		},
	];

	return (
		<section
			aria-label="Statistics overview"
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
			<ListOptions
				OPTIONS={statsData}
				RENDER_ITEM={(stat, index) => <StatCard key={index} {...stat} />}
			/>
		</section>
	);
};

StatsOverview.propTypes = {
	totalUsers: PropTypes.number,
	totalOrders: PropTypes.number,
	totalRevenue: PropTypes.number,
	lowStockCount: PropTypes.number,
	pendingEnquiryCount: PropTypes.number,
	monthlyGrowth: PropTypes.string,
	pendingOrderCount: PropTypes.number,
};

export default StatsOverview;
