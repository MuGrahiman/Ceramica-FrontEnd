import React, { useState } from "react";
import OrderList from "../order/OrderList";
import UserOrderPage from "../order/UserOrderPage";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import Dashboard from "../dashboard/Dashboard";
import DropdownMenu from "../../components/DropdownMenu";
import { FiChevronDown } from "react-icons/fi";

// Now you can use the coupons array

function DemoPage() {
	const [selectedCategory, setSelectedCategory] = useState("mugs");
	const [isOpen, setIsOpen] = useState(false);

	const categories = [
		{ value: "dinnerware", label: "Dinnerware Sets" },
		{ value: "mugs", label: "Coffee Mugs" },
		{ value: "bowls", label: "Serving Bowls" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "vases", label: "Ceramic Vases" },
	];

	return (
		<div className="container mx-auto w-1/4">
		</div>
	);
}

export default DemoPage;
