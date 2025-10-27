import React, { useCallback, useState } from "react";
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
} from "../../constants/order";
import { useMiniToggler } from "../../hooks/useToggle";

const ALL_ORDERS = "All Orders";

/**
 * UserOrderPage - Displays user orders with filtering capabilities
 */
const UserOrderPage = () => {
	const [selectedTab, setSelectedTab] = useState(ALL_ORDERS);
	const [isFilterToggled, toggleFilter] = useMiniToggler();

	const {
		ordersData,
		isOrdersLoading,
		ordersFetchIsError,
		ordersFetchError,
		isOrdersLength,
		filterOrders,
		clearOrderFilters,
	} = useOrder(USER_ROLES.CLIENT);

	/**
	 * Handles filter form submission
	 * @param {Object} data - Form data containing orderStatus
	 */
	const handleFilterSubmit = useCallback(
		(data) => {
			const { orderStatus } = data;
			if (orderStatus) {
				filterOrders({ orderStatus: [orderStatus] });
				setSelectedTab(orderStatus);
			}
			toggleFilter();
		},
		[filterOrders, toggleFilter]
	);

	/**
	 * Clears all filters and resets to default state
	 */
	const handleFilterClear = useCallback(() => {
		clearOrderFilters();
		setSelectedTab(ALL_ORDERS);
		toggleFilter();
	}, [clearOrderFilters, toggleFilter]);

	/**
	 * Handles filter toggle with keyboard support
	 */
	const handleFilterToggle = useCallback(
		(e) => {
			if (e.type === "click" || e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				toggleFilter();
			}
		},
		[toggleFilter]
	);

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<AnimatedH1 title="Your Orders" />

			<LoadingErrorBoundary
				isLoading={isOrdersLoading}
				isError={ordersFetchIsError}
				errorMessage={handleAndShowError(
					ordersFetchError,
					"Failed to fetch your orders."
				)}>
				{isOrdersLength ? (
					<FilterFormLayout
						isOpen={isFilterToggled}
						onSubmit={handleFilterSubmit}
						onClear={handleFilterClear}
						defaultValues={USER_ORDER_FILTER_FORMS_DEFAULT_VALUES}
						fieldContents={USER_ORDER_FIELD_CONTENTS}>
						<InfoLayout
							title={toPascalCase(selectedTab)}
							rightComponent={
								<button
									type="button"
									className="inline-flex items-center text-blue-500 font-medium hover:font-bold duration-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded px-2 py-1"
									aria-label={
										isFilterToggled ? "Close filters" : "Open filters"
									}
									aria-expanded={isFilterToggled}
									onClick={handleFilterToggle}
									onKeyDown={handleFilterToggle}
									tabIndex={0}>
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
