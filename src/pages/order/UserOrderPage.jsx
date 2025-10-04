import React, { useCallback, useEffect, useState } from "react";
import OrderList from "./OrderList";
import OrderEmptySpot from "./OrderEmptySpot";
import useOrder from "../../hooks/useOrder";
import AnimatedH1 from "../../components/AnimatedH1";
import InfoLayout from "../../components/InfoLayout";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import FilterFormLayout from "../../components/FilterFormLayout";
import { handleAndShowError } from "../../utils/errorHandlers";
import { toPascalCase } from "../../utils/generals";
import { USER_ROLES } from "../../constants/app";
import {
	USER_ORDER_FILTER_FORMS_DEFAULT_VALUES,
	USER_ORDER_FIELD_CONTENTS,
	ORDER_STATUSES,
} from "../../constants/order";

/**
 * UserOrderPage - Displays user orders with filter
 */
const UserOrderPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedTab, setSelectedTab] = useState(
		toPascalCase(ORDER_STATUSES.PROCESSING)
	);

	const {
		ordersData,
		isOrdersLoading,
		ordersFetchIsError,
		ordersFetchError,
		isOrdersLength,
		filterOrders,
	} = useOrder(USER_ROLES.CLIENT);

	useEffect(() => {
		filterOrders({
			orderStatus: [ORDER_STATUSES.PROCESSING],
		});
	}, []);

	/**
	 * Toggles the filter form visibility
	 */
	const toggleFilter = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	/**
	 * Handles filter form submission
	 * @param {Object} data - Form data containing orderStatus
	 */
	const handleFilterSubmit = useCallback(
		(data) => {
			const { orderStatus } = data;
			if (orderStatus) {
				filterOrders({ orderStatus: [orderStatus] });
				setSelectedTab(toPascalCase(orderStatus));
			}
			toggleFilter();
		},
		[filterOrders, toggleFilter]
	);

	/**
	 * Clears filters and resets to default state
	 */
	const handleFilterClear = useCallback(() => {
		filterOrders({ orderStatus: [ORDER_STATUSES.PROCESSING] });
		setSelectedTab(toPascalCase(ORDER_STATUSES.PROCESSING));
		toggleFilter();
	}, [filterOrders, toggleFilter]);

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<AnimatedH1 title={'Your Orders '} />

			<LoadingErrorBoundary
				isLoading={isOrdersLoading}
				isError={ordersFetchIsError}
				errorMessage={handleAndShowError(
					ordersFetchError,
					"Failed to fetch your orders."
				)}>
				{isOrdersLength ? (
					<FilterFormLayout
						isOpen={isOpen}
						onSubmit={handleFilterSubmit}
						onClear={handleFilterClear}
						defaultValues={USER_ORDER_FILTER_FORMS_DEFAULT_VALUES}
						fieldContents={USER_ORDER_FIELD_CONTENTS}>
						<InfoLayout
							title={selectedTab}
							rightComponent={
								<button
									type="button"
									className="inline-flex items-center  text-blue-500 font-medium hover:font-bold  duration-700 "
									aria-label="Toggle order filters"
									onClick={toggleFilter}>
									Filter
								</button>
							}>
							<OrderList baseUrl="/order" orders={ordersData} />
						</InfoLayout>
					</FilterFormLayout>
				) : (
					<div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
						<OrderEmptySpot />
					</div>
				)}
			</LoadingErrorBoundary>
		</div>
	);
};

export default UserOrderPage;
