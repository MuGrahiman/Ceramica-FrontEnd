import React from "react";
import PropTypes from "prop-types";
import Toggler from "../../components/Toggler";
import { useMiniToggler } from "../../hooks/useToggle";
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
 *
 * @example
 * <OrderCoupon coupon={couponObject} />
 *
 * @returns {React.Element} Coupon details component
 */
const OrderCoupon = ({ coupon = null }) => {
	const [isToggled, toggle] = useMiniToggler();

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

	const {
		couponCode = "",
		discount = 0,
		validFrom = "",
		validUntil = "",
		description = "",
	} = coupon;

	const formatDate = (date) => {
		try {
			return formatToLocaleDateString(date) || "Invalid date";
		} catch (error) {
			return "Date error";
		}
	};

	return (
		<div
			className="space-y-2 text-sm"
			role="region"
			aria-label="Coupon details">
			<p className="text-gray-600">
				<span className="font-medium">Coupon Code:</span> {couponCode || "N/A"}
			</p>
			<p className="text-gray-600">
				<span className="font-medium">Discount:</span> {discount}%
			</p>
			<p className="text-gray-600">
				<span className="font-medium">Valid From:</span> {formatDate(validFrom)}
			</p>
			<p className="text-gray-600">
				<span className="font-medium">Valid Until:</span>{" "}
				{formatDate(validUntil)}
			</p>
			<div className="text-gray-600 break-words">
				<span className="font-medium">Description:</span>
				{description ? (
					<Toggler
						IS_TOG={isToggled}
						TOG={toggle}
						TEXT={description}
						TRIM_LENGTH={90}
					/>
				) : (
					<span className="ml-1 text-gray-500">No description available</span>
				)}
			</div>
		</div>
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
