import React from "react";
import HeroSection from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";
import SearchBar from "../../components/SearchBar";
import useToggle from "../../hooks/useToggle";
import ProductCard from "../../components/ProductCard";
import FilterForm from "../../components/FilterForm";
import heroImage from "../../assets/ceramics/Gemini_Generated_Image_yzrj9syzrj9syzrj.jpeg";
import useInventory from "../../hooks/useInventory";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
// import heroImage from "../../assets/ceramics/Gemini_Generated_Image_k09u6ik09u6ik09u.jpeg";
// const products = [
// 	{
// 		id: 1,
// 		name: "Ceramic Plate Set",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Set of 4 ceramic plates.",
// 		price: 29.99,
// 		rating: 4.5,
// 		reviewCount: 120,
// 	},
// 	{
// 		id: 2,
// 		name: "Coffee Mug",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "12 oz coffee mug.",
// 		price: 15.99,
// 		rating: 4.8,
// 		reviewCount: 250,
// 	},
// 	{
// 		id: 3,
// 		name: "Dinner Bowl",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Deep dinner bowl.",
// 		price: 19.99,
// 		rating: 4.0,
// 		reviewCount: 90,
// 	},
// 	{
// 		id: 4,
// 		name: "Glass Water Bottle",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Reusable glass water bottle.",
// 		price: 9.99,
// 		rating: 4.9,
// 		reviewCount: 70,
// 	},
// 	{
// 		id: 5,
// 		name: "Colorful Salad Bowl",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Large colorful salad bowl.",
// 		price: 22.49,
// 		rating: 4.7,
// 		reviewCount: 45,
// 	},
// 	{
// 		id: 6,
// 		name: "Tea Set",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Includes 1 teapot and 4 cups.",
// 		price: 49.99,
// 		rating: 4.6,
// 		reviewCount: 60,
// 	},
// 	{
// 		id: 7,
// 		name: "Soup Tureen",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Elegant soup serving bowl.",
// 		price: 34.99,
// 		rating: 4.3,
// 		reviewCount: 30,
// 	},
// 	{
// 		id: 8,
// 		name: "Mason Jar Set",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Set of 6 mason jars.",
// 		price: 25.0,
// 		rating: 4.8,
// 		reviewCount: 150,
// 	},
// 	{
// 		id: 9,
// 		name: "Non-stick Frying Pan",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Durable non-stick frying pan.",
// 		price: 45.0,
// 		rating: 4.5,
// 		reviewCount: 110,
// 	},
// 	{
// 		id: 10,
// 		name: "Bamboo Cutting Board",
// 		image: "https://via.placeholder.com/150",
// 		shortDescription: "Eco-friendly bamboo cutting board.",
// 		price: 19.99,
// 		rating: 4.2,
// 		reviewCount: 80,
// 	},
// ];
const Shop = () => {
	const {
		fetchLoading,
		fetchError,
		data,
		totalPages,
		currentPage,
		handlePage,
		handleFilter,
		clearFilter,
		handleSearch,
		clearSearch,
	} = useInventory();

	const [setIsOpen, isOpen] = useToggle();
	const onSubmit = (data) => {
		handleFilter(data);
		setIsOpen("isOpen");
	};
	const onClear = () => {
		clearFilter();
		setIsOpen("isOpen");
	};

	const productList = fetchLoading ? (
		<div className="flex items-center justify-center ">
			<Loading message="Fetching inventory, please wait..." />
		</div>
	) : Array.isArray(data) && data.length > 0 ? (
		data.map((product) => <ProductCard key={product._id} product={product} />)
	) : (
		<p>No products available.</p>
	);

	return (
		<section>
			<HeroSection
				title="Welcome to Our Ceramic Store"
				subtitle="Discover beautiful ceramic tableware"
				backgroundImage={heroImage}
				buttonText="Shop Now"
				buttonLink="/products"
			/>
			<div className="container mx-auto mt-6 px-4 py-6 sm:flex items-center justify-between gap-40 md:gap-52 xl:gap-96 ">
				<BreadCrumb items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
				<span className="w-full  flex items-center justify-between gap-10 mt-4 sm:mt-0">
					<button
						onClick={() => setIsOpen("isOpen")}
						type="button"
						className="sm:hidden sm:w-1/2 lg:w-1/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
						Filter
					</button>

					<SearchBar
						INPUT_STYLE="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-white focus:ring-gray-100 dark:placeholder-gray-500 rounded-e-lg rounded-s-lg dark:text-text-blue-950 border border-gray-300 focus:border-gray-100 dark:border-gray-100 dark:focus:border-gray-100"
						BUTTON_STYLE="p-2.5 h-full text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-e-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800"
						ON_SUBMIT={handleSearch}
						CLEAR_SEARCH={clearSearch}
					/>
				</span>
			</div>
			<div className="container mx-auto mt-6 px-4 py-6 flex  justify-between md:gap-4  ">
				<aside
					className={`min-h-full  sm:w-1/2 lg:w-1/3 bg-white rounded-lg shadow  transition-all duration-700 ease-in-out ${
						isOpen("isOpen")
							? "translate-x-0 opacity-100 w-full p-4"
							: "-translate-x-full opacity-0 w-0"
					} sm:translate-x-0 sm:opacity-100  sm:px-4`}
					aria-hidden={!isOpen("isOpen")}>
					<FilterForm ON_SUBMIT={onSubmit} ON_CLEAR={onClear} />
				</aside>

				<div
					className={`flex flex-wrap items-center justify-evenly gap-6
							 transition-all duration-700 ease-in-out ${
									isOpen("isOpen") ? "opacity-0 w-0 " : "opacity-100  w-full"
								}  sm:opacity-100 sm:w-full  `}>
					{productList}
				</div>
			</div>
			<div className="container mx-auto mt-6 px-4 py-6">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePage}
				/>
			</div>
		</section>
	);
};

export default Shop;