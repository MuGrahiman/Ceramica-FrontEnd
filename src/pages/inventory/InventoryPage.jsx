import React, { useState } from "react";
import { MdDelete, MdMode, MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImEye, ImSpinner9 } from "react-icons/im";
import Table from "../../components/Table";
import LoadingTemplate from "../../components/LoadingTemplate";
import SearchBar from "../../components/SearchBar";
import useInventory from "../../hooks/useInventory";
import { KeyFn } from "../../utils/generals";
import img from "../../assets/avatar.png";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";
import MiniLoader from "../../components/MiniLoader";
import useSearch from "../../hooks/useSearch";
import {
	FILTER_FORMS_CATEGORIES_OPTIONS,
	FILTER_FORMS_COMPONENTS,
	FILTER_FORMS_DEFAULT_VALUES,
	FILTER_FORMS_SIZES_OPTIONS,
	FILTER_FORMS_SORT_OPTIONS,
} from "../../constants/filter-form";
import FilterFormLayout from "../../components/FilterFormLayout";

// Inventory Component
const InventoryPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { searchTerm, handleSearch, clearSearch } = useSearch();

	// Use custom hook to manage inventory data
	const {
		// Fetching data
		fetchLoading,
		fetchError,
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
					<MdDelete
						id={inventory._id}
						onClick={() => handleDelete(inventory._id)}
						className="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-700"
						aria-label={`Delete ${inventory.title}`}
					/>
				),
		},
	];

	const onSubmit = (data) => {
		handleFilter(data);
		setIsOpen((prev) => !prev);
	};
	const onClear = () => {
		clearFilter();
		setIsOpen((prev) => !prev);
	};
	const FieldContents = [
		{
			title: "Filter by Category",
			type: FILTER_FORMS_COMPONENTS.CHECKBOX,
			props: { name: "categories", options: FILTER_FORMS_CATEGORIES_OPTIONS },
		},
		{
			title: "Filter by Size",
			type: FILTER_FORMS_COMPONENTS.CHECKBOX,
			props: { name: "sizes", options: FILTER_FORMS_SIZES_OPTIONS },
		},
		{
			title: "Sort By",
			type: FILTER_FORMS_COMPONENTS.RADIO,
			props: { name: "sort", options: FILTER_FORMS_SORT_OPTIONS },
		},
		{
			title: "Filter by Price",
			type: FILTER_FORMS_COMPONENTS.INPUT,
			props: {
				name: "price",
				options: [
					{ name: "minPrice", label: "Minimum Price", type: "numbers" },
					{ name: "maxPrice", label: "Maximum Price", type: "numbers" },
				],
			},
		},
	];
	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inventory, please wait..." />
			</div>
		);
	}

	// Handle error state
	if (fetchError) {
		return (
			<div className="text-center text-gray-500">
				<p>Error fetching inventory. Please try again later.</p>
			</div>
		);
	}

	return (
		<>
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-2 sm:mb-6">
				<h2 className="text-4xl font-extrabold font-serif text-gray-700">
					Inventory
				</h2>
				<Link
					to="/dashboard/add-to-inventory"
					className="inline-flex items-center mt-4 sm:mt-0 sm:gap-2 
					px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 
					rounded-md shadow-md">
					<MdOutlineAdd className="h-6 w-6" />
					Add To Inventory
				</Link>
			</div>

			{/* Filter and Search Section */}
			<div className="flex justify-between items-center mt-4 mb-4 gap-10">
				<button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					className="inline-flex items-center mt-4 sm:mt-0 sm:gap-2 px-5 py-2.5 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md">
					Filter
				</button>
				<SearchBar
					INPUT_STYLE={`focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:ring-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 rounded-e-lg rounded-s-lg dark:text-white border border-gray-300 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-500`}
					BUTTON_STYLE={`p-2.5 h-full text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-e-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800`}
					ON_SUBMIT={handleSearch}
					CLEAR_SEARCH={clearSearch}
				/>
			</div>

			{/* Inventory Table */}
			<FilterFormLayout
				isOpen={isOpen}
				onSubmit={onSubmit}
				onClear={onClear}
				defaultValues={FILTER_FORMS_DEFAULT_VALUES}
				fieldContents={FieldContents}>
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
		
		</>
	);
};

export default InventoryPage;
