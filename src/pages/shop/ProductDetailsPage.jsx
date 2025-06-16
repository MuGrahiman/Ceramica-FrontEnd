import React from "react";
import ProductPanel from "../../components/ProductPanel";
import LoadingTemplate from "../../components/LoadingTemplate";
import { useGetInventoryItemByIdQuery } from "../../redux/store";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import ProductReviews from "./ProductReviews";

/**
 * Displays detailed product information including:
 * - Product details panel
 * - Breadcrumb navigation
 * - Product reviews section
 *
 * Fetches product data using Redux RTK Query based on URL param `id`.
 */
const ProductDetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading: fetchLoading } = useGetInventoryItemByIdQuery(id);

	// Handle loading state
	if (fetchLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingTemplate message="Fetching inventory, please wait..." />
			</div>
		);
	}

	// Handle error/empty state
	if (!data || !data.length) <div>{`Sorry couldn't find any product`}</div>;

	return (
		<main className="max-w-5xl mx-auto p-3 sm:p-5">
			<BreadCrumb
				items={[
					{ label: "Home", to: "/" },
					{ label: "Shop", to: "/shop" },
					{ label: data?.title || "Product" },
				]}
			/>

			<div className="mx-auto bg-white rounded-lg shadow-lg mt-4">
				<ProductPanel productId={data?._id} {...data} showWishlist />
			</div>

			<ProductReviews productId={data?._id} />
		</main>
	);
};

export default ProductDetailsPage;
