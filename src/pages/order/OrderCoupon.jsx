import React from "react";
import PropTypes from "prop-types";
import Toggler from "../../components/Toggler";
import useToggle from "../../hooks/useToggle";

const OrderCoupon = ({ coupon }) => {
	const [toggle, isToggled] = useToggle();

	return (
		// <div className="w-full bg-white shadow-md rounded-lg p-4 overflow-hidden break-words whitespace-normal">
		// 	<h2 className="text-2xl font-bold mb-4">Coupon Details</h2>
		coupon ? (
			<>
				<p className="text-gray-600">Coupon Code: {coupon.couponCode}</p>
				<p className="text-gray-600">Discount: {coupon.discount}%</p>
				<p className="text-gray-600">
					Valid From: {new Date(coupon.validFrom).toLocaleString()}
				</p>
				<p className="text-gray-600">
					Valid Until: {new Date(coupon.validUntil).toLocaleString()}
				</p>
				<p className="text-gray-600 break-words">
					Description:
					<Toggler
						IS_TOG={isToggled("orderCouponDescription")}
						TOG={() => toggle("orderCouponDescription")}
						TEXT={coupon.description}
					/>
				</p>
			</>
		) : (
			<p className="text-gray-600 text-center py-4">
				Coupon details not available.
			</p>
		)
		// </div>
	);
};

OrderCoupon.propTypes = {
	coupon: PropTypes.object.isRequired,
};

export default OrderCoupon;
