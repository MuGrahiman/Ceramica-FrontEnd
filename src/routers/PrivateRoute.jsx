import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useToast from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
	const { isAuthorized } = useAuth("client");
	const showToast = useToast();

	if (!isAuthorized) {
		showToast("Please login", "error");
		return <Navigate to="/login" replace />;
	}
	return children ? children : <Outlet />;
};

export default PrivateRoute;
