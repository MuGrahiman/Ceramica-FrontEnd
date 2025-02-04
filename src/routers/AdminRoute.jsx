import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useToast from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
	const showToast = useToast();
	const { isAuthorized } = useAuth("admin");

	if (!isAuthorized) {
		showToast("Please login", "error");
		return <Navigate to="/admin" />;
	}
	return children ? children : <Outlet />;
};

export default AdminRoute;
