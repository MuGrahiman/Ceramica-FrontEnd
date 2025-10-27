import React, { useCallback } from "react";
import InfoLayout from "../../components/InfoLayout";
import InvoiceModal from "./InvoiceModal";
import OrderStatusTracker from "./OrderStatusTracker";
import OrderStatusBanner from "./OrderStatusBanner";
import {
	ORDER_CANCEL_SWAL,
	ORDER_STATUS_STEPS,
	ORDER_STATUSES,
} from "../../constants/order";
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
import { useMiniToggler } from "../../hooks/useToggle";

/**
 * UserOrderDetailsPage - Displays detailed information about a user's order
 */
const UserOrderDetailsPage = () => {
	const { id } = useParams();
	const {
		data: orderData,
		isLoading,
		error,
		isError,
	} = useGetOrderByIdQuery(id);
	const { handleOrderStatusSelection, isOrderStatusUpdating } = useOrder(
		USER_ROLES.CLIENT
	);
	const [isInvoiceOpen, , openInvoice, closeInvoice] = useMiniToggler();

	const isUserOrderDetailsLoading = isLoading || isOrderStatusUpdating;

	/**
	 * Handles order cancellation with confirmation dialog
	 */
	const handleCancellation = useCallback(async () => {
		const result = await Swal.fire(ORDER_CANCEL_SWAL);

		if (result.isConfirmed)
			await handleOrderStatusSelection(id, ORDER_STATUSES.CANCELLED);

		return;
	}, [id, handleOrderStatusSelection]);

	const currentStatusStep = ORDER_STATUS_STEPS.find(
		(step) => step.id === orderData?.status
	);

	if (!orderData?.items?.length && !isUserOrderDetailsLoading) {
		return <EmptyTemplate emptyMessage={"No order items found"} />;
	}

	return (
		<LoadingErrorBoundary
			isLoading={isUserOrderDetailsLoading}
			isError={isError}
			errorMessage={handleAndShowError(
				error,
				"Failed to fetch your order details"
			)}
			CustomError={ErrorTemplate}>
			<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<OrderHeader orderData={orderData} />

				<InfoLayout title="Order Status">
					<OrderStatusBanner {...currentStatusStep} />
					<OrderStatusTracker
						status={orderData?.status}
						statusSteps={ORDER_STATUS_STEPS}
					/>
				</InfoLayout>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
					<div className="col-span-full lg:col-span-2">
						<UserOrderItemsList orderItems={orderData?.items} />
					</div>
					<div className="col-span-full lg:col-span-1">
						<UserOrderSummary
							orderData={orderData}
							onViewInvoice={openInvoice}
							onCancel={handleCancellation}
						/>
					</div>
				</div>

				{isInvoiceOpen && (
					<InvoiceModal orderData={orderData} onClose={closeInvoice} />
				)}
			</div>
		</LoadingErrorBoundary>
	);
};

export default React.memo(UserOrderDetailsPage);
