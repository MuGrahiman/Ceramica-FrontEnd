import React from "react";
import PropTypes from "prop-types";

const AuthLayout = ({ children }) => {
	return (
		<div className="min-h-[calc(100vh-120px)]  flex justify-center items-center ">
			<div className="w-full max-w-md mx-auto bg-white  shadow-2xl shadow-black rounded-lg px-8 pt-6 pb-8 mb-4">
				{children}
				<p className="mt-5 text-center text-gray-500 text-xs">
					©2025 Book Store. All rights reserved.
				</p>
			</div>
		</div>
	);
};
AuthLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default AuthLayout;
