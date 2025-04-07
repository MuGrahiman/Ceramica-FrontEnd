import React from "react";
import BlockToggleButton from "./BlockToggleButton";
import PropTypes from "prop-types";
import StatusBadge from "./StatusBadge";
import { VscUnverified, VscVerified } from "react-icons/vsc";

/**
 * UserProfileHeader - Displays user avatar, name, email, and status
 * @param {Object} user - User data
 * @param {boolean} isUpdating - Loading state
 * @param {function} onStatusChange - Status change handler
 */
const UserProfileHeader = ({
	user = {},
	isUpdating = false,
	onStatusChange,
}) => {
	return !user ? (
		<div>No user </div>
	) : (
		<div className="animate-slide-in-left mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 mb-8 bg-white p-6 rounded-lg shadow">
			<div
				className="flex flex-col sm:flex-row md:flex-col lg:flex-row
       items-center text-center sm:text-start md:text-center lg:text-start sm:gap-6 md:gap-0 lg:gap-6 w-full md:w-auto">
				<div className="relative">
					<div
						className={`h-20 w-20 rounded-full p-[3px] transition-all duration-500 shadow hover:shadow-lg
			  ${
					user.otpVerified
						? "bg-gradient-to-br from-emerald-300 to-green-600 "
						: "bg-gradient-to-br from-orange-300 to-red-600"
				}`}>
						<img
							className="h-full w-full rounded-full object-cover "
							src={user.profilePhoto}
							alt={`${user.firstName || ""} ${user.lastName || ""}`}
						/>
					</div>

					<div
						className={`absolute -bottom-1 -right-1 flex items-center justify-center  text-white  `}>
						{user.otpVerified ? (
							<VscVerified className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-400 rounded-full border-2 border-white " />
						) : (
							<VscUnverified className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-600 animate-pulse rounded-full border-2 border-white " />
						)}
					</div>
				</div>
				<div className="flex-1 ">
					<div className="sm:hidden md:block lg:hidden">
						<StatusBadge status={user?.status} />
					</div>
					<h1 className="text-2xl font-bold text-gray-900">
						{user?.firstName || "New"} {user?.lastName || "User"}
					</h1>
					<p className="text-gray-600">{user?.email}</p>
					<div className="hidden sm:block md:hidden lg:block">
						<StatusBadge status={user?.status} />
					</div>
				</div>
			</div>

			<div className="flex items-center gap-3 w-full md:w-auto  ">
				<BlockToggleButton
					aria-label={
						user?.status === "blocked" ? "Unblock User" : "Block User"
					}
					isBlocked={user?.status === "blocked"}
					isUpdating={isUpdating}
					onClick={() =>
						onStatusChange(user?.status === "blocked" ? "unBlock" : "block")
					}
				/>
			</div>
		</div>
	);
};

UserProfileHeader.propTypes = {
	user: PropTypes.shape({
		avatar: PropTypes.shape({
			url: PropTypes.string,
		}),
		firstName: PropTypes.string,
		profilePhoto: PropTypes.string,
		lastName: PropTypes.string,
		email: PropTypes.string.isRequired,
		status: PropTypes.oneOf(["pending", "registered", "verified", "blocked"])
			.isRequired,
		otpVerified: PropTypes.bool,
		lastLogin: PropTypes.string.isRequired,
		activityLog: PropTypes.array.isRequired,
	}).isRequired,
	isUpdating: PropTypes.bool,
	onStatusChange: PropTypes.func,
};

export default UserProfileHeader;
