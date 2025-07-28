import React, { useState } from "react";
import OrderList from "../order/OrderList";
import UserOrderPage from "../order/UserOrderPage";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import Dashboard from "../dashboard/Dashboard";

// Now you can use the coupons array

function DemoPage() {
	return (
		<div className="container mx-auto">
			<ErrorTemplate
  title="Studio Maintenance"
  message="We're reshaping the clay - back shortly!"
//   showReload={false}
/>
		</div>
	);
}

export default DemoPage;

// components/ErrorDisplay.jsx
import { Link } from 'react-router-dom';
import { GiBrokenPottery } from 'react-icons/gi';
import ErrorTemplate from "../../components/ErrorTemplate";

const ErrorDisplay = ({ 
  title = "Oh no! Something cracked...",
  message = "We encountered an issue while handling your request",
  showReload = true,
  showHomeLink = true 
}) => {
  
};

