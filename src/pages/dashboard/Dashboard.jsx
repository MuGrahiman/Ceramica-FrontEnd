// components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import LoadingTemplate from "../../components/LoadingTemplate";
import InfoLayout from "../../components/InfoLayout";
import OrderList from "../order/OrderList";
import StatsOverview from "./StatsOverview";
import RevenueChart from "./RevenueChart";
import RecentInquiries from "./RecentInquiries";
import LowStockProducts from "./LowStockProducts";
import CouponList from "./CouponList";
import ListOptions from "../../components/ListOptions";
import { useAuth } from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";
import getBaseUrl from "../../utils/baseUrl";

/**
 * DashboardSection - Reusable dashboard section component
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.data - Data for the section
 * @param {string} props.linkTo - Route for "View All" link
 * @param {React.ComponentType} props.component - Component to render
 */
const DashboardSection = ({
	title = "",
	data = [],
	linkTo = "/",
	component: Component,
}) => (
	<InfoLayout title={title} showLink linkedTo={linkTo}>
		<Component data={data} />
	</InfoLayout>
);

DashboardSection.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	linkTo: PropTypes.string.isRequired,
	component: PropTypes.elementType.isRequired,
};

/**
 * Dashboard - Admin dashboard displaying key metrics and lists
 * @returns {JSX.Element} Admin dashboard layout
 */
const Dashboard = () => {
	const { isAuthorized } = useAuth("admin");

	const [isLoading, setIsLoading] = useState(true);

	const showToast = useToast();

	const [dashboardData, setDashboardData] = useState(() => ({
		stats: {
			totalUsers: 0,
			totalOrders: 0,
			totalRevenue: 0,
			lowStockCount: 0,
			pendingEnquiryCount: 0,
			pendingOrderCount: 0,
		},
		lists: {
			pendingOrders: [],
			pendingEnquiries: [],
			expiredCoupons: [],
			lowStockItems: [],
		},
	}));

	/**
	 * Fetches dashboard data from API
	 * @async
	 * @returns {Promise<void>}
	 */
	const fetchDashboardData = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(`${getBaseUrl()}/api/admin/`);
			setDashboardData((prev) => ({
				...prev,
				stats: data.stats,
				lists: data.lists,
			}));
			showToast("Dashboard data loaded", "success");
		} catch (error) {
			const errorMsg =
				error.response?.data?.message || "Failed to load dashboard data";
			showToast(errorMsg, "error");
			console.error("Dashboard fetch error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Data fetching effect
	useEffect(() => {
		if (isAuthorized) {
			fetchDashboardData();
		}
	}, [isAuthorized]);

	if (isLoading) return <LoadingTemplate />;

	const dashboardSections = [
		{
			title: "Recent Inquiries",
			data: dashboardData.lists.pendingEnquiries,
			linkTo: "/inquiries",
			component: RecentInquiries,
		},
		{
			title: "Pending Orders",
			data: dashboardData.lists.pendingOrders,
			linkTo: "/orders",
			component: OrderList,
		},
		{
			title: "Low Stock Items",
			data: dashboardData.lists.lowStockItems,
			linkTo: "/inventory",
			component: LowStockProducts,
		},
		{
			title: "Expired Coupons",
			data: dashboardData.lists.expiredCoupons,
			linkTo: "/coupons",
			component: CouponList,
		},
	];

	return (
		<div className="dashboard-container space-y-6">
			{/* Stats Overview Section */}
			<StatsOverview {...dashboardData.stats} />

			{/* Revenue Chart - Full Width */}
			<InfoLayout title="Revenue Analytics">
				<RevenueChart data={dashboardData.stats.revenueData} />
			</InfoLayout>

			{/* Data Visualization and Lists Section */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ListOptions
					OPTIONS={dashboardSections}
					RENDER_ITEM={(section, index) => (
						<DashboardSection
							key={index}
							title={section.title}
							data={section.data}
							linkTo={section.linkTo}
							component={section.component}
						/>
					)}
				/>
			</section>
		</div>
	);
};

export default Dashboard;
