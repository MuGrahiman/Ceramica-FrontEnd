import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";

const PrivateRoute = ({ children }) => {
	const { currentUser, loading } = useAuth();
	const { token, role } = useSelector((state) => state.auth.currentUser);
	const showToast = useToast();

	if (loading) {
		return <div>Loading..</div>;
	}
	if (!token || role !== "client") {
		showToast("Please login", "error");
		return <Navigate to="/login" replace />;
	}
	return children ? children : <Outlet />;
	// if(currentUser) {
	//     return children;
	// }

	// return <Navigate to="/login" replace/>
};

export default PrivateRoute;
