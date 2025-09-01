import React from "react";
import PropTypes from "prop-types";
import { formatToLocaleDateString } from "../../utils/date";
import ListOptions from "../../components/ListOptions";

/**
 * UserInfoSection - Displays user details in a structured format
 * @param {Object} props - Component props
 * @param {Object} props.user - User data object
 */
const UserInfoSection = ({ user = {} }) => {
	// Base fields to display
	const baseFields = [
		{ label: "First Name:", value: user?.firstName },
		{ label: "Last Name:", value: user?.lastName },
		{ label: "Email:", value: user?.email },
		{ label: "User Status:", value: user?.status },
		{
			label: "OTP Status:",
			value: user?.otpVerified ? "Verified" : "Not Verified",
		},
		{
			label: "Account Created:",
			value: user?.createdAt && formatToLocaleDateString(user.createdAt),
		},
		{
			label: "Last Updated:",
			value: user?.updatedAt && formatToLocaleDateString(user.updatedAt),
		},
		{
			label: "Last Login:",
			value: user?.updatedAt && formatToLocaleDateString(user.lastLogin),
		},
	];

	return (
		<div className="space-y-4">
			<ListOptions
				OPTIONS={baseFields}
				RENDER_ITEM={(field, index) => (
					<div key={`${field.label}-${index}`} className="mb-4 last:mb-0">
						<p className="text-sm font-medium text-gray-500">{field.label}</p>
						<p className="mt-1 text-sm text-blue-950">{field.value}</p>
					</div>
				)}
			/>
		</div>
	);
};

UserInfoSection.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		email: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		otpVerified: PropTypes.bool.isRequired,
		lastLogin: PropTypes.string.isRequired,
		createdAt: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]).isRequired,
		updatedAt: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]).isRequired,
	}).isRequired,
};

export default UserInfoSection;
