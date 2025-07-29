import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiMapPin, FiCreditCard, FiTag } from "react-icons/fi";
import InfoLayout from "../../components/InfoLayout";
import OrderPayment from "./OrderPayment";
import OrderAddress from "./OrderAddress";
import InvoiceModal from "./InvoiceModal";
import AppliedCoupon from "./AppliedCoupon";
import OrderStatusTracker from "./OrderStatusTracker";
import OrderStatusBanner from "./OrderStatusBanner";
import { ORDER_STATUS_STEPS, ORDER_STATUSES } from "../../constants/order";
import InfoSubHeading from "../../components/InfoSubHeading";
import { useGetOrderByIdQuery } from "../../redux/store";
import { useParams } from "react-router-dom";
import OrderHeader from "./OrderHeader";
import TotalPreviewList from "../../components/TotalPreviewList";
import ErrorTemplate from "../../components/ErrorTemplate";
import EmptyTemplate from "../../components/EmptyTemplate";
import Swal from "sweetalert2";
import useOrder from "../../hooks/useOrder";
import { USER_ROLES } from "../../constants/app";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";

// Extracted OrderSummary component
const OrderSummary = ({ orderData, onCancel, onViewInvoice }) => (
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
OrderSummary.propTypes = {
	orderData: PropTypes.object.isRequired,
	onViewInvoice: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

const UserOrderDetailsPage = () => {
	const { id } = useParams();
	const {
		data: orderDetails,
		isLoading,
		error,
		isError,
	} = useGetOrderByIdQuery(id);
	const [orderData, setOrderData] = useState([]);
	const [showInvoiceModal, setShowInvoiceModal] = useState(false);
	const { handleOrderStatusSelection, isOrderStatusUpdating } = useOrder(
		USER_ROLES.CLIENT
	);

	// Update order data when fetched
	useEffect(() => {
		if (orderDetails && Object.keys(orderDetails).length) {
			setOrderData(orderDetails);
		}
	}, [orderDetails]);
	const handleDelete = async () => {
		const result = await Swal.fire({
			title: "Are you sure you want to cancel?",
			text: "Once cancelled, you won't be able to revert this action.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b10202",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, cancel it!",
			cancelButtonText: "No, keep it",
		});

		if (result.isConfirmed)
			await handleOrderStatusSelection(id, ORDER_STATUSES.CANCELLED);

		return;
	};

	// Handle empty state
	if (!orderData.items?.length) {
		return <EmptyTemplate emptyMessage={"No order items found"} />;
	}

	const handleViewInvoice = () => {
		setShowInvoiceModal(true);
	};

	return (
		<LoadingErrorBoundary
			isLoading={isLoading || isOrderStatusUpdating}
			isError={isError}
			errorMessage={handleAndShowError(
				error,
				"Failed to fetch your order details"
			)}
			CustomError={ErrorTemplate}>
			<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<OrderHeader orderData={orderData} />

				<InfoLayout title="Order Status">
					<OrderStatusBanner
						{...ORDER_STATUS_STEPS.find((step) => step.id === orderData.status)}
					/>
					<OrderStatusTracker
						status={orderData.status}
						statusSteps={ORDER_STATUS_STEPS}
					/>
				</InfoLayout>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
					<div className="col-span-full lg:col-span-2">
						<TotalPreviewList title="Order Items" items={orderData.items} />
					</div>
					<div className="col-span-full lg:col-span-1">
						<OrderSummary
							orderData={orderData}
							onViewInvoice={handleViewInvoice}
							onCancel={handleDelete}
						/>
					</div>
				</div>

				{showInvoiceModal && (
					<InvoiceModal
						orderData={orderData}
						onClose={() => setShowInvoiceModal(false)}
					/>
				)}
			</div>
		</LoadingErrorBoundary>
	);
};

export default React.memo(UserOrderDetailsPage);
