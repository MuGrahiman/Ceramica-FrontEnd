import React, { useCallback, useState } from "react";
import { MdDelete, MdMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImEye, ImSpinner9 } from "react-icons/im";
import Table from "../../components/Table";
import useInventory from "../../hooks/useInventory";
import { KeyFn } from "../../utils/generals";
import img from "../../assets/avatar.png";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import MiniLoader from "../../components/MiniLoader";
import useSearch from "../../hooks/useSearch";
import { FILTER_FORMS_DEFAULT_VALUES } from "../../constants/filter-form";
import FilterFormLayout from "../../components/FilterFormLayout";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { extractErrorMessage } from "../../utils/errorHandlers";
import { INVENTORY_FILTER_CONTENTS } from "../../constants/inventory";
import FilterControlsWithSearch from "../../components/FilterControlsWithSearch";
import PageHeader from "../../components/PageHeader";
import { useMiniToggler } from "../../hooks/useToggle";

/**
 * InventoryPage - Admin page for managing inventory with full CRUD operations
 */
const InventoryPage = () => {
	const [isFilterToggled, toggleFilter, , closeFilter] = useMiniToggler();

	// const [isFilterToggled, setIsOpen] = useState(false);
	const { searchTerm, handleSearch, clearSearch } = useSearch();

	// Use custom hook to manage inventory data
	const {
		// Fetching data
		fetchLoading,
		isFetching,
		fetchError,
		fetchIsError,
		data,
		totalPages,
		currentPage,
		pageNumbers,
		handlePage,

		// Deleting data
		deleteLoading,
		handleDelete,

		// Patching data
		patchId,
		handleStatus,
		patchLoading,

		// Filters and search
		handleFilter,
		clearFilter,

		// Utility
		id,
	} = useInventory(searchTerm);
	// Table headers configuration
	const headers = [
		{
			hide: true,
			label: "Image",
			render: (inventory) => (
				<img
					className="w-10 h-10 rounded-full"
					src={inventory.coverImage.url || img}
					alt={inventory.title || "Inventory Image"}
				/>
			),
			showValue: () => "lg:table-cell",
		},
		{
			label: "Name",
			render: (inventory) => inventory.title,
		},
		{
			hide: true,
			label: "Stock",
			render: (inventory) => `${inventory.stock}`,
			showValue: () => "md:table-cell",
		},
		{
			hide: true,
			label: "Price",
			render: (inventory) => `${inventory.price.toFixed(2)}`,
			showValue: () => "sm:table-cell",
		},
		{
			label: "Availability",
			render: (inventory) => {
				const handleClick = () => handleStatus(inventory);

				return patchLoading && patchId === inventory._id ? (
					<MiniLoader />
				) : (
					<Badge
						ON_CLICK={handleClick}
						LABEL={inventory?.status}
						STATUS={inventory?.status === "active" ? true : false}
					/>
				);
			},
		},
		{
			label: "Details",
			render: (inventory) => (
				<Link
					to={`/dashboard/inventory-item/${inventory._id}`}
					aria-label={`Item ${inventory.title}`}>
					<ImEye
						className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
						aria-label="Details"
					/>
				</Link>
			),
		},
		{
			label: "Edit",
			render: (inventory) => (
				<Link
					to={`/dashboard/update-inventory/${inventory._id}`}
					aria-label={`Edit ${inventory.title}`}>
					<MdMode className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
				</Link>
			),
		},
		{
			label: "Delete",
			render: (inventory) =>
				deleteLoading && inventory._id === id ? (
					<ImSpinner9
						className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600"
						aria-label="Deleting item..."
					/>
				) : (
					<button
						type="button"
						onClick={() => handleDelete(inventory._id)}
						className="text-gray-500 hover:text-red-700 transition-colors duration-200"
						aria-label={`Delete ${inventory.title}`}>
						<MdDelete className="h-6 w-6" />
					</button>
				),
		},
	];

	/**
	 * Handles filter form submission
	 */
	const handleFilterSubmit = useCallback(
		(data) => {
			handleFilter(data);
			closeFilter();
		},
		[handleFilter, closeFilter]
	);

	/**
	 * Handles filter clearance
	 */
	const handleFilterClear = useCallback(() => {
		clearFilter();
		closeFilter();
	}, [clearFilter, closeFilter]);

	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={fetchIsError}
			errorMessage={extractErrorMessage(
				fetchError,
				"Failed to fetch product data"
			)}>
			<React.Fragment>
				{/* Header Section */}
				<PageHeader
					showActionLink
					title="Inventory"
					actionText="Add To Inventory"
					actionLink="/dashboard/add-to-inventory"
				/>

				{/* Filter and Search Section */}
				<FilterControlsWithSearch
					isOpen={isFilterToggled}
					onToggle={toggleFilter}
					onClearSearch={clearSearch}
					onSearch={handleSearch}
					isSearching={isFetching}
				/>

				{/* Inventory Table */}
				<FilterFormLayout
					isOpen={isFilterToggled}
					onSubmit={handleFilterSubmit}
					onClear={handleFilterClear}
					defaultValues={FILTER_FORMS_DEFAULT_VALUES}
					fieldContents={INVENTORY_FILTER_CONTENTS}>
					<Table
						DATA={data}
						CONFIG={headers}
						KEYFN={KeyFn}
						CURRENT_PAGE={currentPage}
						TOTAL_PAGES={totalPages}
						HANDLE_PAGE_CHANGE={handlePage}
					/>

					<Pagination
						pageNumbers={pageNumbers}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePage}
					/>
				</FilterFormLayout>
			</React.Fragment>
		</LoadingErrorBoundary>
	);
};

export default InventoryPage;
