import React from "react";
import { FiChevronRight, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProductCard from "../../components/ProductCard";

const FeaturedProducts = ({ featuredProducts }) => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-12">
					<h2 className="text-3xl font-serif font-bold">Featured Products</h2>
					<a
						href="#"
						className="text-amber-700 hover:text-amber-800 flex items-center">
						View all <FiChevronRight className="ml-1" />
					</a>
				</div>


				<div className=" flex flex-nowrap overflow-x-auto xl:overflow-visible items-center justify-between gap-6 scroll-smooth ">
					{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 "> */}
					{featuredProducts.map((product) => (
						// <div
						// 	key={product?._id}
						// 	className="flex items-center justify-center "
						// >
						<ProductCard key={product?._id} product={product} />
						// {/* </div> */}
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedProducts;
