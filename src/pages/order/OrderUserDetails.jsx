import React from "react";
import PropTypes from "prop-types";

/**
 * User Detail Component: Displays detailed information about a user.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.user - The user object containing details like name, email, role, and status.
 */
const OrderUserDetails = ({ user }) => {
    // Fallback image URL
    const fallbackImageUrl =
        "https://fastly.picsum.photos/id/1052/4000/2667.jpg?hmac=VG0SPn0166Vw0hWeiJL4uVFbjGRcHnddwL4u0wpqL8Y";

    return (
        // <div className="w-full bg-white shadow-md rounded-lg p-4 mt-4">
        //     <h2 className="text-2xl font-bold mb-4">User Details</h2>
            user ? (
                <div className="flex items-center">
                    <img
                        src={user?.avatar?.url || fallbackImageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <p className="text-gray-600 font-bold">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">Role: {user.role}</p>
                        <p className="text-gray-600">Status: {user.status}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 text-center py-4">User details not available.</p>
            )
        // </div>
    );
};

OrderUserDetails.propTypes = {
	user: PropTypes.object.isRequired,
};

export default OrderUserDetails;