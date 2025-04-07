import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
	const { isAuthorized } = useAuth("client");
	return isAuthorized ? (
		children ? (
			children
		) : (
			<Outlet />
		)
	) : (
		<Navigate to="/login" replace />
	);
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
