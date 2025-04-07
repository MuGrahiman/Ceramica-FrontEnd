import React from "react";
import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
	const { isAuthorized } = useAuth("admin");
	return isAuthorized ? (
		children ? (
			children
		) : (
			<Outlet />
		)
	) : (
		<Navigate to="/admin" />
	);
};

AdminRoute.propTypes = {
    children: PropTypes.node,
};

export default AdminRoute;
