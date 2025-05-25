import React from "react";
import PropTypes from "prop-types";

/**
 * Displays applied coupon information
 * @param {Object} props - Component props
 * @param {Object} props.couponDetails - Coupon details
 * @param {string} props.couponDetails.couponCode - Coupon code
 * @param {number} props.couponDetails.discount - Discount percentage
 */
const AppliedCoupon = ({ couponDetails }) => {
	if (!couponDetails) return null;

	return (
		<div className="flex items-center gap-1 text-sm text-gray-600">
			<span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-800">
				{couponDetails.couponCode}
			</span>
			<span>({couponDetails.discount}% off)</span>
		</div>
	);
};

AppliedCoupon.propTypes = {
	couponDetails: PropTypes.shape({
		couponCode: PropTypes.string.isRequired,
		discount: PropTypes.number.isRequired,
	}),
};

export default React.memo(AppliedCoupon);
