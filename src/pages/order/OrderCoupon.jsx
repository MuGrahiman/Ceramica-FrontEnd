import React from "react";
import PropTypes from "prop-types";
import Toggler from "../../components/Toggler";
import useToggle from "../../hooks/useToggle";
import { formatToLocaleDateString } from "../../utils/date";

/**
 * OrderCoupon - Displays coupon details with expandable description
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.coupon - Coupon information
 * @param {string} props.coupon.couponCode - The coupon code
 * @param {number} props.coupon.discount - Discount percentage
 * @param {string|Date} props.coupon.validFrom - Start date of coupon validity
 * @param {string|Date} props.coupon.validUntil - End date of coupon validity
 * @param {string} props.coupon.description - Coupon description
 */
const OrderCoupon = ({ coupon = {} }) => {
	const [toggle, isToggled] = useToggle();
	if (!coupon) {
		return (
			<p
				className="text-gray-600 text-center py-4"
				role="status"
				aria-live="polite">
				Coupon details not available.
			</p>
		);
	}

	return (
		<React.Fragment>
			<p className="text-gray-600">Coupon Code: {coupon?.couponCode}</p>
			<p className="text-gray-600">Discount: {coupon?.discount}%</p>
			<p className="text-gray-600">
				Valid From: {formatToLocaleDateString(coupon?.validFrom)}
			</p>
			<p className="text-gray-600">
				Valid Until: {formatToLocaleDateString(coupon?.validUntil)}
			</p>
			<p className="text-gray-600 break-words">
				Description:
				<Toggler
					IS_TOG={isToggled("orderCouponDescription")}
					TOG={() => toggle("orderCouponDescription")}
					TEXT={coupon?.description}
				/>
			</p>
		</React.Fragment>
	);
};

OrderCoupon.propTypes = {
	coupon: PropTypes.shape({
		couponCode: PropTypes.string,
		discount: PropTypes.number,
		validFrom: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		validUntil: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		description: PropTypes.string,
	}),
};

export default React.memo(OrderCoupon);
