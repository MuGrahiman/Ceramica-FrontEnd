import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useToast from "../hooks/useToast";

const AdminRoute = ({ children }) => {
	const showToast = useToast();

	const currentUser = useSelector((state) => state.auth.currentUser);

	if (!currentUser || !currentUser.token || currentUser.role !== "admin") {
		showToast("Please login", "error");
		return <Navigate to="/admin" />;
	}
	return children ? children : <Outlet />;
};

export default AdminRoute;
