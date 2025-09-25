import React, { useState, useEffect } from "react";
import InfoLayout from "../../components/InfoLayout";
import InvoiceModal from "./InvoiceModal";
import OrderStatusTracker from "./OrderStatusTracker";
import OrderStatusBanner from "./OrderStatusBanner";
import { ORDER_STATUS_STEPS, ORDER_STATUSES } from "../../constants/order";
import { useGetOrderByIdQuery } from "../../redux/store";
import { useParams } from "react-router-dom";
import OrderHeader from "./OrderHeader";
import ErrorTemplate from "../../components/ErrorTemplate";
import EmptyTemplate from "../../components/EmptyTemplate";
import Swal from "sweetalert2";
import useOrder from "../../hooks/useOrder";
import { USER_ROLES } from "../../constants/app";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import UserOrderSummary from "./UserOrderSummary";
import UserOrderItemsList from "./UserOrderItemsList";

// Extracted OrderSummary component


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
						<UserOrderItemsList orderItems={orderData.items} />
					</div>
					<div className="col-span-full lg:col-span-1">
						<UserOrderSummary
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
