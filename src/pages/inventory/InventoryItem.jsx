import React from "react";
import { useGetInventoryItemByIdQuery } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import ProductPanel from "../../components/ProductPanel";
import Loading from "../../components/Loading";
import BreadCrumb from "../../components/BreadCrumb";
import { getBreadCrumbItems } from "../../utils/inventory";
import useInventory from "../../hooks/useInventory";

const InventoryItem = () => {
	const { id } = useParams();
	const { data, isLoading: fetchLoading } = useGetInventoryItemByIdQuery(id);
	const { handleDelete } = useInventory();

	const onDelete = () => {
		handleDelete(id);
	};
	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loading message="Fetching inventory, please wait..." />
			</div>
		);
	}
	if (!data || !data.product) <div>{`Sorry couldn't find any product `}</div>;
	return (
		<main className="max-w-5xl  mx-auto ">
			<BreadCrumb items={getBreadCrumbItems(data.product.title)} />
			<div className=" bg-white rounded-lg shadow-lg mt-4">
				<ProductPanel
					coverImage={data.product.coverImage}
					title={data.product.title}
					category={data.product.category}
					shape={data.product.shape}
					color={data.product.color}
					dimension={data.product.dimension}
					size={data.product.size}
					stock={data.product.stock}
					price={data.product.price}
					status={data.product.status}
					description={data.product.description}
					images={data.product.images}
				/>
			</div>
			<div className="flex gap-6 mt-4">
				<button
					onClick={onDelete}
					aria-label={`Edit ${data.title}`}
					className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition ease-in-out duration-200">
					Delete
				</button>
				<Link
					to={`/dashboard/update-inventory/${id}`}
					aria-label={`Edit ${data.title}`}
					className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-200">
					Edit
				</Link>
			</div>
		</main>
	);
};

export default InventoryItem;
