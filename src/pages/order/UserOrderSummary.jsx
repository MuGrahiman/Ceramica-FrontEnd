import React from "react";
import { ORDER_STATUSES } from "../../constants/order";
import PropTypes from "prop-types";
import InfoLayout from "../../components/InfoLayout";
import InfoSubHeading from "../../components/InfoSubHeading";
import { FiCreditCard, FiMapPin, FiTag } from "react-icons/fi";
import OrderAddress from "./OrderAddress";
import OrderPayment from "./OrderPayment";
import AppliedCoupon from "./AppliedCoupon";

const UserOrderSummary = ({ orderData, onCancel, onViewInvoice }) => (
	<InfoLayout title="Order Summary">
		<div className="overflow-hidden p-4  grid  sm:grid-cols-4 gap-8 ">
			<div className="w-full h-full col-span-full sm:col-span-2 lg:col-span-full ">
				<InfoSubHeading
					headingText="Shipping Address"
					icon={<FiMapPin className="text-gray-500" />}
				/>
				<OrderAddress address={orderData.addressId} />
			</div>

			<div className="w-full h-full  col-span-full sm:col-span-2 lg:col-span-full">
				<InfoSubHeading
					headingText="Payment Information"
					icon={<FiCreditCard className="text-gray-500" />}
				/>
				<OrderPayment paymentDetails={orderData.paymentId} />
			</div>

			{orderData.couponId && (
				<div className="col-span-full sm:col-span-2 lg:col-span-full ">
					<InfoSubHeading
						headingText="Coupon Applied"
						icon={<FiTag className="text-gray-500" />}
					/>
					<AppliedCoupon couponDetails={orderData.couponId} />
				</div>
			)}

			<div className="col-span-full sm:col-span-2 lg:col-span-full border-t sm:border-0 lg:border-t border-gray-200 pt-4 ">
				<div className="flex justify-between text-base font-medium text-gray-900">
					<p>Order Total</p>
					<p>${orderData.totalAmount.toFixed(2)}</p>
				</div>
			</div>

			<div className="pt-4 space-y-3 col-span-full sm:col-span-2 lg:col-span-full sm:col-start-3">
				<button
					onClick={onViewInvoice}
					className="w-full flex items-center justify-center gap-2 bg-blue-100  border border-blue-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-600  transition-colors duration-200"
					aria-label="View order invoice">
					View Invoice
				</button>
				{orderData.status !== ORDER_STATUSES.DELIVERED && (
					<button
						onClick={onCancel}
						className="w-full bg-red-100 border border-red-300 rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-white hover:bg-red-500  transition-colors duration-200"
						aria-label="Cancel order">
						Cancel Order
					</button>
				)}
			</div>
		</div>
	</InfoLayout>
);

UserOrderSummary.propTypes = {
	orderData: PropTypes.object.isRequired,
	onViewInvoice: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default UserOrderSummary;
