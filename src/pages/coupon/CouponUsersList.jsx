import React from "react";
import PropTypes from "prop-types";
import CouponUser from "./CouponUser";
import ListOptions from "../../components/ListOptions";

const CouponUsersList = ({ users = [], onSelect }) => {
	return (
		<div className="my-6  w-full bg-white px-6 py-4 ">
			<div className="sm:flex justify-between mb-2 ">
				<p className="font-semibold">Redeemed Users:</p>
				<span className="text-gray-600">{users.length}</span>
			</div>
			<div
				className="grid gap-3 overflow-y-auto overflow-x-hidden "
				style={{ maxHeight: "20rem" }}>
				<ListOptions
					EMPTY_MESSAGE="No one used yet"
					OPTIONS={users}
					RENDER_ITEM={(user) => (
						<CouponUser key={user.id} user={user} onSelect={onSelect} />
					)}
				/>
			</div>
		</div>
	);
};

CouponUsersList.propTypes = {
	users: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default CouponUsersList;
