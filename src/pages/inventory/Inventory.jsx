import React, { useState } from "react";
import { MdDelete, MdMode, MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImEye, ImSpinner9 } from "react-icons/im";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import SearchBar from "../../components/SearchBar";
import FilterForm from "../../components/FilterForm";
import useInventory from "../../hooks/useInventory";
import { KeyFn } from "../../utils/generals";
import img from "../../assets/avatar.png";
import Pagination from "../../components/Pagination";
import Badge from "../../components/Badge";

// Inventory Component
const Inventory = () => {
	const [isOpen, setIsOpen] = useState(false);

	// Use custom hook to manage inventory data
	const {
		fetchLoading,
		currentPage,
		fetchError,
		totalPages,
		handlePage,
		dltLoading,
		handleDelete,
		data,
		id,
		patchId,
		handleFilter,
		clearFilter,
		clearSearch,
		handleSearch,
		handleStatus,
		patchLoading,
	} = useInventory();

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
			label: "Price",
			render: (inventory) => `${inventory.price.toFixed(2)}`,
			showValue: () => "sm:table-cell",
		},
		{
			label: "Availability",
			render: (inventory) => {
				const handleClick = () => handleStatus(inventory);

				return patchLoading && patchId === inventory._id ? (
					<ImSpinner9
						className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600"
						aria-label="Deleting item..."
					/>
				) : (
					<Badge
						ON_CLICK={handleClick}
						LABEL={inventory?.status ? "Enabled" : "Disabled"}
						STATUS={inventory?.status}
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
				dltLoading && inventory._id === id ? (
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
	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading message="Fetching inventory, please wait..." />
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
				<SearchBar ON_SUBMIT={handleSearch} CLEAR_SEARCH={clearSearch} />
			</div>

			{/* Inventory Table */}
			<div className="relative mb-12 min-h-screen">
				<div
					className={`w-full shadow-lg transition-all duration-700 ease-in-out ${
						isOpen ? "opacity-0 -z-50" : "opacity-100 z-50"
					}`}>
					{data && (
						<>
							<Table
								DATA={data}
								CONFIG={headers}
								KEYFN={KeyFn}
								CURRENT_PAGE={currentPage}
								TOTAL_PAGES={totalPages}
								HANDLE_PAGE_CHANGE={handlePage}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePage}
							/>
						</>
					)}
				</div>

				{/* Sidebar - Filter Form */}
				<aside
					className={`absolute top-0 left-0 w-full p-4 transition-all duration-700 ease-in-out ${
						isOpen
							? "translate-y-0 z-50 opacity-100"
							: "-translate-y-full opacity-0 -z-50"
					} bg-gray-800 text-gray-500 text-lg`}>
					<FilterForm ON_SUBMIT={onSubmit} ON_CLEAR={onClear} />
				</aside>
			</div>
		</>
	);
};

export default Inventory;
