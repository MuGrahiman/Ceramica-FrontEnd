import React from "react";
import PropTypes from "prop-types";
import { FiChevronRight } from "react-icons/fi";
import ProductCard from "../../components/ProductCard";
import MiniLoader from "../../components/MiniLoader";
import ListOptions from "../../components/ListOptions";

/**
 * FeaturedProducts - Displays a horizontal scrollable list of featured products.
 * 
 * @param {Object} props - Component props
 * @param {Array<Product>} props.featuredProducts - Array of product objects
 * @param {boolean} [props.isLoading=false] - Loading state flag
 * @returns {JSX.Element} Featured products carousel section
 */
const FeaturedProducts = ({ featuredProducts = [], isLoading = false }) => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-12">
					<h2 className="text-3xl font-serif font-bold">Featured Products</h2>
					<a
						href="/shop"
						className="text-amber-700 hover:text-amber-800 flex items-center"
						aria-label="View all products">
						View all <FiChevronRight className="ml-1" />
					</a>
				</div>

				<div
					role="list"
					aria-label="Featured products carousel"
					className="py-4 flex flex-nowrap overflow-x-auto xl:overflow-visible items-center gap-6 scroll-smooth"
					>
					{isLoading ? (
						<MiniLoader />
					) : (
						<ListOptions
							EMPTY_MESSAGE={"Products are not available"}
							OPTIONS={featuredProducts}
							RENDER_ITEM={(product) => (
								<ProductCard key={product._id} product={product} />
							)}
						/>
					)}
				</div>
			</div>
		</section>
	);
};

FeaturedProducts.propTypes = {
	featuredProducts: PropTypes.array.isRequired,
	isLoading: PropTypes.bool,
};

export default FeaturedProducts;
