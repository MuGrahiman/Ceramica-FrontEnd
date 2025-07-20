// components/CouponList.jsx
import React from "react";
import PropTypes from "prop-types";
import { setDateAsDayMonthYear } from "../../utils/date";
import ListContainer from "../../components/ListContainer";
import ListOptions from "../../components/ListOptions";
import { STATS_COLOR_CONFIG } from "../../constants/dashboard";
const couponPropShape = {
	_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	couponCode: PropTypes.string.isRequired,
	validFrom: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
		.isRequired,
	validUntil: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date),
	]).isRequired,
	status: PropTypes.oneOf(["active", "inactive"]).isRequired,
	redeemedBy: PropTypes.array,
	usageLimit: PropTypes.number.isRequired,
	discount: PropTypes.number.isRequired,
};
/**
 * Determines CSS classes for coupon status badge
 * @param {'active'|'inactive'} status - Coupon status
 * @param {string|Date} validUntil - Expiration date
 * @returns {string} Tailwind classes for status badge
 */
const getStatusStyle = (status, validUntil) => {
	const now = new Date();
	const expired = new Date(validUntil) < now;

	if (expired)
		return `${STATS_COLOR_CONFIG.gray.bg} ${STATS_COLOR_CONFIG.gray.text}`;
	if (status === "active")
		return `${STATS_COLOR_CONFIG.green.bg} ${STATS_COLOR_CONFIG.green.text}`;
	return `${STATS_COLOR_CONFIG.red.bg} ${STATS_COLOR_CONFIG.red.text}`;
};

/**
 * Individual coupon card component
 * @param {Object} props - Component props
 * @param {string} props.title - Coupon title
 * @param {string} props.couponCode - Coupon code
 * @param {'active'|'inactive'} props.status - Coupon status
 * @param {string|Date} props.validFrom - Start date
 * @param {string|Date} props.validUntil - Expiration date
 * @param {Array} [props.redeemedBy=[]] - Array of users who redeemed
 * @param {number} props.usageLimit - Maximum redemptions allowed
 * @param {number} props.discount - Discount percentage
 * @returns {JSX.Element} Coupon card component
 */
const CouponListCard = ({
	title,
	couponCode,
	status,
	validFrom,
	validUntil,
	redeemedBy = [],
	usageLimit,
	discount,
}) => {
	const isExpired = new Date(validUntil) < new Date();
	const statusText = isExpired
		? "Expired"
		: status.charAt(0).toUpperCase() + status.slice(1);

	return (
		<li className="py-3 group cursor-pointer">
			<div className="flex items-center justify-between">
				<div className="min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate">
						{title} ({couponCode})
					</p>
					<div className="flex space-x-2 text-xs text-gray-500">
						<span>
							{setDateAsDayMonthYear(validFrom)} -{" "}
							{setDateAsDayMonthYear(validUntil)}
						</span>
						<span>•</span>
						<span>
							{redeemedBy.length}/{usageLimit} used
						</span>
					</div>
				</div>
				<div className="ml-4 flex-shrink-0 flex items-center space-x-2">
					<span
						className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(
							status,
							validUntil
						)}`}>
						{statusText}
					</span>
					<span className="text-sm font-medium">{discount}% off</span>
				</div>
			</div>
		</li>
	);
};

CouponListCard.propTypes = couponPropShape;

/**
 * Main coupon list component
 * @param {Object} props - Component props
 * @param {Array} [props.coupons=[]] - Array of coupon objects
 * @returns {JSX.Element} Coupon list container
 */
const CouponList = ({ coupons = [] }) => (
	<ListContainer divideItems scrollable containerClassName="p-2">
		<ListOptions
			OPTIONS={coupons}
			RENDER_ITEM={(coupon) => <CouponListCard key={coupon._id} {...coupon} />}
			EMPTY_MESSAGE="No coupons available"
		/>
	</ListContainer>
);

CouponList.propTypes = {
	coupons: PropTypes.arrayOf(PropTypes.shape(couponPropShape)),
};

export default React.memo(CouponList);
