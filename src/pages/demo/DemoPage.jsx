import React, { useState } from "react";

// Now you can use the coupons array

function DemoPage() {
	return (
		<div className="container mx-auto">
			<WishlistPage />
		</div>
	);
}
const WishlistPage = () => {
	const [wishlistItems, setWishlistItems] = useState([
		{
			id: 1,
			name: "Wireless Bluetooth Headphones",
			price: 129.99,
			image:
				"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			inStock: true,
			rating: 4.5,
		},
		{
			id: 2,
			name: "Smart Fitness Tracker",
			price: 79.99,
			image:
				"https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			inStock: true,
			rating: 4.2,
		},
		{
			id: 3,
			name: "Organic Cotton T-Shirt",
			price: 29.99,
			image:
				"https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			inStock: false,
			rating: 4.0,
		},
		{
			id: 4,
			name: "Stainless Steel Water Bottle",
			price: 24.95,
			image:
				"https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			inStock: true,
			rating: 4.7,
		},
		{
			id: 5,
			name: "Wireless Charging Pad",
			price: 39.99,
			image:
				"https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			inStock: true,
			rating: 4.3,
		},
		{
			id: 6,
			name: "Leather Wallet",
			price: 49.99,
			image:
				"https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
			inStock: false,
			rating: 4.1,
		},
	]);

	const [sortOption, setSortOption] = useState("default");
	const [filterOption, setFilterOption] = useState("all");

	const removeFromWishlist = (id) => {
		setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const moveToCart = (id) => {
		// In a real app, this would move the item to cart
		console.log(`Moving item ${id} to cart`);
		removeFromWishlist(id);
	};

	const sortedItems = [...wishlistItems].sort((a, b) => {
		if (sortOption === "price-low") return a.price - b.price;
		if (sortOption === "price-high") return b.price - a.price;
		if (sortOption === "rating") return b.rating - a.rating;
		return 0;
	});

	const filteredItems = sortedItems.filter((item) => {
		if (filterOption === "in-stock") return item.inStock;
		if (filterOption === "out-of-stock") return !item.inStock;
		return true;
	});

	return (
		<div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Page Header */}
				<div className="text-center mb-10 animate-fade-in">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Your Wishlist
					</h1>
					<p className="text-gray-600">
						{wishlistItems.length}{" "}
						{wishlistItems.length === 1 ? "item" : "items"} saved for later
					</p>
				</div>

				{/* Filters and Sorting */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
					<div className="flex items-center space-x-2">
						<label
							htmlFor="filter"
							className="text-sm font-medium text-gray-700">
							Filter:
						</label>
						<select
							id="filter"
							value={filterOption}
							onChange={(e) => setFilterOption(e.target.value)}
							className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-200">
							<option value="all">All Items</option>
							<option value="in-stock">In Stock</option>
							<option value="out-of-stock">Out of Stock</option>
						</select>
					</div>
					<div className="flex items-center space-x-2">
						<label htmlFor="sort" className="text-sm font-medium text-gray-700">
							Sort by:
						</label>
						<select
							id="sort"
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
							className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-200">
							<option value="default">Default</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
							<option value="rating">Highest Rated</option>
						</select>
					</div>
				</div>

				{/* Wishlist Items */}
				{filteredItems.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredItems.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-slide-up">
								<div className="relative">
									<img
										className="w-full h-48 object-cover"
										src={item.image}
										alt={item.name}
									/>
									{!item.inStock && (
										<div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
											Out of Stock
										</div>
									)}
									<button
										onClick={() => removeFromWishlist(item.id)}
										className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
										aria-label="Remove from wishlist">
										<svg
											className="h-5 w-5 text-red-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
								<div className="p-4">
									<h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
										{item.name}
									</h3>

									<div className="flex items-center mb-2">
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												className={`h-4 w-4 ${
													i < Math.floor(item.rating)
														? "text-yellow-400"
														: "text-gray-300"
												}`}
												fill="currentColor"
												viewBox="0 0 20 20">
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										))}
										<span className="text-gray-600 text-sm ml-1">
											({item.rating})
										</span>
									</div>

									<div className="flex items-center justify-between mt-4">
										<span className="text-lg font-bold text-gray-900">
											${item.price.toFixed(2)}
										</span>
										<button
											onClick={() => moveToCart(item.id)}
											disabled={!item.inStock}
											className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
												item.inStock
													? "bg-indigo-600 text-white hover:bg-indigo-700"
													: "bg-gray-200 text-gray-500 cursor-not-allowed"
											}`}>
											{item.inStock ? "Add to Cart" : "Notify Me"}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="bg-white rounded-xl shadow-sm p-12 text-center animate-fade-in">
						<svg
							className="mx-auto h-16 w-16 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1}
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						<h3 className="mt-4 text-lg font-medium text-gray-900">
							Your wishlist is empty
						</h3>
						<p className="mt-2 text-gray-500">
							Start adding items you love to your wishlist
						</p>
						<div className="mt-6">
							<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Browse Products
							</button>
						</div>
					</div>
				)}

				{/* Custom Animations */}
				<style jsx global>{`
					@keyframes fade-in {
						from {
							opacity: 0;
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					@keyframes slide-up {
						from {
							opacity: 0;
							transform: translateY(20px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.animate-fade-in {
						animation: fade-in 0.5s ease-out forwards;
					}
					.animate-slide-up {
						animation: slide-up 0.4s ease-out forwards;
					}
				`}</style>
			</div>
		</div>
	);
};
export default DemoPage;
