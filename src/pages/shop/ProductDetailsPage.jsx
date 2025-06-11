import React from "react";
import ProductPanel from "../../components/ProductPanel";
import LoadingTemplate from "../../components/LoadingTemplate";
import { useGetInventoryItemByIdQuery } from "../../redux/store";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/BreadCrumb";
import ProductReviews from "./ProductReviews";

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
	if (!data || !data) <div>{`Sorry couldn't find any product `}</div>;
	const handleSubmitReview = (review) => {
		// In a real app, you would send this to your backend
		console.log("New review submitted:", review);
	};

	return (
		<main className="max-w-5xl  mx-auto py-5">
			{/* <PageTitle title="Inventory Details" /> */}
			<BreadCrumb
				items={[
					{ label: "Home", to: "/" },
					{ label: "Shop", to: "/shop" },
					{ label: data?.title },
				]}
			/>

			<div className=" bg-white rounded-lg shadow-lg mt-4">
				<ProductPanel
					productId={data._id}
					coverImage={data.coverImage}
					title={data.title}
					category={data.category}
					shape={data.shape}
					color={data.color}
					dimension={data.dimension}
					size={data.size}
					stock={data.stock}
					price={data.price}
					status={data.status}
					description={data.description}
					images={data.images}
					showWishlist
				/>
			</div>
			<ProductReviews productId="12345" onSubmitReview={handleSubmitReview} />
		</main>
	);
};

export default ProductDetailsPage;
