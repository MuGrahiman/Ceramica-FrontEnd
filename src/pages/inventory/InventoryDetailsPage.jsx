import React from "react";
import { useGetInventoryItemByIdQuery } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import ProductPanel from "../../components/ProductPanel";
import BreadCrumb from "../../components/BreadCrumb";
import useInventory from "../../hooks/useInventory";
import { INVENTORY_BREAD_CRUMB_ITEMS } from "../../constants/inventory";
import PageTitle from "../../components/PageTitle";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";

const InventoryDetailsPage = () => {
	const { id } = useParams();
	const {
		data,
		isLoading: fetchLoading,
		error,
		isError,
	} = useGetInventoryItemByIdQuery(id);
	const { handleDelete } = useInventory();

	const onDelete = () => {
		handleDelete(id);
	};

	if (!data || !data) <div>{`Sorry couldn't find any product `}</div>;
	return (
		<LoadingErrorBoundary
			isLoading={fetchLoading}
			isError={isError}
			errorMessage={
				error?.data?.message || error?.message || "Failed to fetch product details"
			}>
			<main className="max-w-5xl  mx-auto ">
				<PageTitle title="Inventory Details" />

				<BreadCrumb items={INVENTORY_BREAD_CRUMB_ITEMS(data?._id)} />
				<div className=" bg-white rounded-lg shadow-lg mt-4">
					<ProductPanel
						productId={data?._id}
						coverImage={data?.coverImage}
						title={data?.title}
						category={data?.category}
						shape={data?.shape}
						color={data?.color}
						dimension={data?.dimension}
						size={data?.size}
						stock={data?.stock}
						price={data?.price}
						status={data?.status}
						description={data?.description}
						images={data?.images}
					/>
				</div>
				<div className="flex gap-6 mt-4">
					<button
						onClick={onDelete}
						aria-label={`Edit ${data?.title}`}
						className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition ease-in-out duration-200">
						Delete
					</button>
					<Link
						to={`/dashboard/update-inventory/${id}`}
						aria-label={`Edit ${data?.title}`}
						className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-200">
						Edit
					</Link>
				</div>
			</main>
		</LoadingErrorBoundary>
	);
};

export default InventoryDetailsPage;
