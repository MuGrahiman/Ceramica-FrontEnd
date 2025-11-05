// components/Dashboard.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import InfoLayout from "../../components/InfoLayout";
import OrderList from "../order/OrderList";
import StatsOverview from "./StatsOverview";
import RevenueChart from "./RevenueChart";
import RecentInquiries from "./RecentInquiries";
import LowStockProducts from "./LowStockProducts";
import CouponList from "./CouponList";
import ListOptions from "../../components/ListOptions";
import { useAuth } from "../../hooks/useAuth";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { USER_ROLES } from "../../constants/app";
import useDashboard from "../../hooks/useDashboard";
import { Link } from "react-router-dom";
import { toPascalCase } from "../../utils/generals";
import { IoIosArrowForward } from "react-icons/io";

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
	<InfoLayout
		title={title}
		rightComponent={
			<Link
				to={`/dashboard${linkTo}`}
				className="flex items-center justify-between gap-1 text-sm text-blue-600 hover:text-blue-800 hover:font-semibold">
				{toPascalCase(propName)}
				<IoIosArrowForward />
			</Link>
		}>
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
	const { isAuthorized } = useAuth(USER_ROLES.ADMIN);
	const { data: dashboardData, isLoading, error, refetch } = useDashboard();

	useEffect(() => {
		if (isAuthorized) {
			refetch();
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
			isError={!!error}
			errorMessage={error}>
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
