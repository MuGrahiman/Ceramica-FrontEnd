// components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import useErrorManager from "../../hooks/useErrorManager";
import { useMiniToggler } from "../../hooks/useToggle";
import { BASE_URL } from "../../constants/app";

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
	propName = "data",
	component: Component,
}) => (
	<InfoLayout title={title} showLink linkedTo={linkTo}>
		{React.createElement(Component, { [propName]: data })}
	</InfoLayout>
);

DashboardSection.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	linkTo: PropTypes.string.isRequired,
	propName: PropTypes.string.isRequired,
	component: PropTypes.elementType.isRequired,
};

/**
 * Dashboard - Admin dashboard displaying key metrics and lists
 * @returns {JSX.Element} Admin dashboard layout
 */
const Dashboard = () => {
	//https://.../share/zeal27vpre6hdg3hx5
	const { isAuthorized } = useAuth("admin");
	const DASHBOARD_ERROR = "DashboardError";
	// const [isLoading, setIsLoading] = useState(true);
	const [isLoading, , startLoading, stopLoading] = useMiniToggler(true);

	const [isError, setIsError, resetIsError] = useErrorManager();

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
		revenueData: [],
	}));

	/**
	 * Fetches dashboard data from API
	 * @async
	 * @returns {Promise<void>}
	 */
	const fetchDashboardData = async () => {
		resetIsError();
		startLoading();
		try {
			const { data } = await axios.get(`${BASE_URL}/api/admin/`);
			setDashboardData((prev) => ({
				...prev,
				stats: data.stats,
				lists: data.lists,
				revenueData: data.revenueData,
			}));
			showToast("Dashboard data loaded", "success");
		} catch (error) {
			const errorMsg =
				error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Failed to load dashboard data";
			showToast(errorMsg, "error");
			setIsError(DASHBOARD_ERROR, errorMsg);
			console.error("Dashboard fetch error:", error);
		} finally {
			stopLoading();
		}
	};

	// Data fetching effect
	useEffect(() => {
		if (isAuthorized) {
			fetchDashboardData();
		}
	}, []);

	const dashboardSections = [
		{
			title: "Recent Inquiries",
			renderData: (data) => data.pendingEnquiries,
			linkTo: "/inquiries",
			propName: "inquiries",
			component: RecentInquiries,
		},
		{
			title: "Pending Orders",
			renderData: (data) => data.pendingOrders,
			linkTo: "/orders",
			propName: "orders",
			component: OrderList,
		},
		{
			title: "Low Stock Items",
			renderData: (data) => data.lowStockItems,
			linkTo: "/inventory",
			propName: "products",
			component: LowStockProducts,
		},
		{
			title: "Expired Coupons",
			renderData: (data) => data.expiredCoupons,
			linkTo: "/coupons",
			propName: "coupons",
			component: CouponList,
		},
	];

	return (
		<LoadingErrorBoundary
			isLoading={isLoading}
			isError={!!isError[DASHBOARD_ERROR]}
			errorMessage={isError[DASHBOARD_ERROR]}>
			<div className="dashboard-container space-y-6">
				{/* Stats Overview Section */}
				<StatsOverview {...dashboardData.stats} />

				{/* Revenue Chart - Full Width */}
				<InfoLayout title="Revenue Analytics">
					<RevenueChart revenueData={dashboardData.revenueData} />
				</InfoLayout>

				{/* Data Visualization and Lists Section */}
				<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ListOptions
						OPTIONS={dashboardSections}
						RENDER_ITEM={(section, index) => (
							<DashboardSection
								key={index}
								title={section.title}
								data={section.renderData(dashboardData.lists)}
								linkTo={section.linkTo}
								component={section.component}
								propName={section.propName}
							/>
						)}
					/>
				</section>
			</div>
		</LoadingErrorBoundary>
	);
};

export default Dashboard;
