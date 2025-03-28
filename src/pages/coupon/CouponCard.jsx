import React from "react";
import PropTypes from "prop-types";
import Toggler from "../../components/Toggler";
import useToggle from "../../hooks/useToggle";
import { setDateAsDayMonthYear } from "../../utils/date";

const CouponCard = ({ coupon }) => {
	const {
		title,
		couponCode,
		validFrom,
		validUntil,
		minimumPurchaseAmount,
		discount,
		usageLimit,
		description,
		status,
	} = coupon;

	const [toggle, isToggled] = useToggle();

	return (
		<div className="bg-white  w-full rounded overflow-hidden shadow transition-transform duration-300 hover:shadow-xl">
			<div className="px-6 py-4 text-center sm:text-left ">
				<div className="sm:flex justify-between mb-2 ">
					<div className="font-bold text-xl mb-2">{title}</div>
					<span
						className={`px-2 py-1  rounded  font-semibold ${
							status === "active"
								? "bg-green-200 text-green-800"
								: "bg-red-200 text-red-800"
						}`}>
						{status}
					</span>
				</div>
				<div className="sm:flex justify-between mb-2 ">
					<div>
						<p className="font-semibold">Coupon Code:</p>
						<span className="text-gray-600">{couponCode}</span>
					</div>
					<div>
						<p className="font-semibold">Usage Limit:</p>
						<span className="text-gray-600">{usageLimit} times</span>
					</div>
				</div>
				<div className="sm:flex justify-between mb-2">
					<div>
						<p className="font-semibold">Valid From:</p>
						<span className="text-gray-600">
							{setDateAsDayMonthYear(validFrom)}
						</span>
					</div>
					<div>
						<p className="font-semibold">Valid Until:</p>
						<span className="text-gray-600">
							{setDateAsDayMonthYear(validUntil)}
						</span>
					</div>
				</div>
				<div className="sm:flex justify-between mb-2">
					<div>
						<p className="font-semibold">Minimum Purchase:</p>
						<span className="text-gray-600">${minimumPurchaseAmount}</span>
					</div>
					<div>
						<p className="font-semibold">Discount:</p>
						<span className="text-gray-600">{discount}%</span>
					</div>
				</div>
				<div className="sm:flex justify-between mb-2">
					<p className="text-gray-700 text-base mb-4">
						<Toggler
							IS_TOG={isToggled("couponDescription")}
							TOG={() => toggle("couponDescription")}
							TEXT={description}
						/>
					</p>
				</div>
			</div>
		</div>
	);
};

CouponCard.propTypes = {
	coupon: PropTypes.shape({
		title: PropTypes.string.isRequired,
		couponCode: PropTypes.string.isRequired,
		validFrom: PropTypes.string.isRequired,
		validUntil: PropTypes.string.isRequired,
		minimumPurchaseAmount: PropTypes.number.isRequired,
		discount: PropTypes.number.isRequired,
		usageLimit: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
	}).isRequired,
};

export default CouponCard;
