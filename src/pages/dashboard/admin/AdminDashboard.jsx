// AdminDashboard.jsx
import React from "react";
import StatsOverview from "./StatsOverview";
import InventoryStatus from "./InventoryStatus";
import RecentOrders from "./RecentOrders";
import RecentInquiries from "./RecentInquiries";
import SalesChart from "./SalesChart";
import DashboardHeader from "./DashboardHeader";

// mockData.js
export const mockUsers = [
	{
		_id: "usr1",
		firstName: "John",
		lastName: "Doe",
		email: "john@example.com",
		profilePhoto: {
			url: "https://randomuser.me/api/portraits/men/1.jpg",
		},
		status: "verified",
		roles: "client",
		lastLogin: new Date("2023-05-15"),
	},
	// Add more users...
];

export const mockInventory = [
	{
		_id: "inv1",
		title: "Premium Wooden Chair",
		category: "Furniture",
		stock: 45,
		price: 129.99,
		status: "active",
		coverImage: {
			url: "https://example.com/chair.jpg",
		},
		createdAt: new Date("2023-01-10"),
	},
	// Add more inventory items...
];

		export const mockOrders = [
			{
				_id: "ord1",
				userId: "usr1",
				items: [{ productId: "inv1", quantity: 2 }],
				totalAmount: 259.98,
				status: "delivered",
				createdAt: new Date("2023-05-10"),
			},
			// Add more orders...
		];

export const mockInquiries = [
	{
		_id: "inq1",
		name: "Alice Johnson",
		email: "alice@example.com",
		subject: "Delivery Issue",
		message: "My order hasn't arrived yet",
		status: "pending",
		createdAt: new Date("2023-05-14"),
	},
	// Add more inquiries...
];
const AdminDashboard = () => {
	// In a real app, you would fetch this data from an API
	const statsData = {
		totalUsers: 1245,
		totalOrders: 342,
		totalRevenue: 45892.5,
		pendingInquiries: 12,
		lowStockItems: 7,
		pendingProcessing: 7,
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardHeader />

			<main className="p-6">
				{/* Quick Stats */}
				<StatsOverview data={statsData} />

				<div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column */}
					<div className="lg:col-span-2 space-y-6">
						<SalesChart />
						<InventoryStatus inventory={mockInventory} />
					</div>

					{/* Right Column */}
					<div className="space-y-6">
						<RecentOrders orders={mockOrders} />
						<RecentInquiries inquiries={mockInquiries} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default AdminDashboard;
