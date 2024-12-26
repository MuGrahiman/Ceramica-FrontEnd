import React, { useEffect, useState } from "react";
import { MdDelete, MdMode, MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import {
	useDeleteInventoryMutation,
	useGetInventoryItemsQuery,
} from "../../redux/store";
import img from "../../assets/avatar.png";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import useToast from "../../hooks/useToast";

const Inventory = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [id, setId] = useState(null);
	const [data, setData] = useState();
	const showToast = useToast();

	const limit = 5;
	const { data: productData, isLoading: fetchLoading } =
		useGetInventoryItemsQuery({
			page: currentPage,
			limit,
		});
	useEffect(() => {
		if (productData) {
			const { products, totalPages } = productData;
			setData(products || []);
			setTotalPages(totalPages || 1);
		}
	}, [productData]);

	const [deleteInventory, { isLoading: dltLoading }] =
		useDeleteInventoryMutation();


	const handleDelete = async (id) => {
		setId(id);
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b10202",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		});
	
		if (!result.isConfirmed) return setId(null);
	
		try {
			const res = await deleteInventory(id).unwrap();
			showToast(res.message, res.success ? "success" : "error");
		} catch (err) {
			showToast(err?.data?.message || "Something went wrong", "error");
			console.error("Delete inventory error:", err);
		} finally {
			setId(null);
		}
	};
	


	// Key function for row identification
	const KeyFn = (inventory) => inventory._id;

	// Table headers configuration
	const headers = [
		{
			hide: true,
			label: "Image",
			render: (inventory) => (
				<img
					className="w-10 h-10 rounded-full"
					src={inventory.coverImage.url || img}
					alt={inventory.title || "Book Image"}
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
			label: "Category",
			render: (inventory) => inventory.category,
			showValue: () => "md:table-cell",
		},
		{
			hide: true,
			label: "Price",
			render: (inventory) => `${inventory.price.toFixed(2)}`,
			showValue: () => "sm:table-cell",
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

	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading message="Fetching inventory, please wait..." />
				</div>
		);
	}

	return (
		<section className="sm:py-8 h-full w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:mb-6">
				<h2 className="text-4xl font-extrabold font-serif text-gray-700">
					Inventory
				</h2>
				<Link
					to="/dashboard/add-to-inventory"
					className="inline-flex items-center mt-4 sm:mt-0 sm:gap-2 px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md">
					<MdOutlineAdd className="h-6 w-6" />
					Add To Inventory
				</Link>
			</div>

			{/* Table Section */}
			<div className="block w-full shadow-lg">
				{data && (
					<Table
						DATA={data}
						CONFIG={headers}
						KEYFN={KeyFn}
						CURRENT_PAGE={currentPage}
						TOTAL_PAGES={totalPages}
						HANDLE_PAGE_CHANGE={(page) => setCurrentPage(page)}
					/>
				)}
			</div>
		</section>
	);
};

export default Inventory;
