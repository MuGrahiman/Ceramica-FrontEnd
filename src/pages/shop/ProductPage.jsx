import React from "react";
import HeroSection from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";
import SearchBar from "../../components/SearchBar";
import useToggle, { useMiniToggler } from "../../hooks/useToggle";
import ProductCard from "../../components/ProductCard";
import FilterForm from "../../components/FilterForm";
import heroImage from "../../assets/ceramics/Gemini_Generated_Image_yzrj9syzrj9syzrj.jpeg";
import useInventory from "../../hooks/useInventory";
import Pagination from "../../components/Pagination";
import useSearch from "../../hooks/useSearch";
import ListOptions from "../../components/ListOptions";
import LoadingErrorBoundary from "../../components/LoadingErrorBoundary";
import { handleAndShowError } from "../../utils/errorHandlers";
import { INVENTORY_FILTER_CONTENTS } from "../../constants/inventory";
/**
 * ProductPage - Main product listing page with search, filter, and pagination
 */
const ProductPage = () => {
	const { searchTerm, handleSearch, clearSearch } = useSearch();
	const {
		fetchLoading,
		isFetching,
		fetchError,
		fetchIsError,
		data,
		totalPages,
		currentPage,
		handlePage,
		handleFilter,
		clearFilter,
		pageNumbers,
	} = useInventory(searchTerm);
	const [isFilterOpen, toggleFilter, , closeFilter] = useMiniToggler();
	/**
	 * Handles filter form submission
	 */
	const onSubmit = (data) => {
		handleFilter(data);
		closeFilter();
	};
	/**
	 * Handles filter clearance
	 */
	const onClear = () => {
		clearFilter();
		closeFilter();
	};

	return (
		<section>
			{/* Hero Section */}
			<HeroSection
				title="Welcome to Our Ceramic Store"
				subtitle="Discover beautiful ceramic tableware"
				backgroundImage={heroImage}
				buttonText="Shop Now"
				buttonLink="#shop"
			/>

			{/* Header Section with Breadcrumb and Search */}
			<div className="container mx-auto mt-6 px-4 py-6 sm:flex items-center justify-between gap-40 md:gap-52 xl:gap-96 ">
				<BreadCrumb items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
				<span className="w-full  flex items-center justify-between gap-10 mt-4 sm:mt-0">
					<button
						onClick={toggleFilter}
						type="button"
						aria-controls="filter-sidebar"
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
			<div className="container mx-auto mt-6 px-4 sm:px-0 md:px-4 py-6 flex  justify-between md:gap-4  ">
				{/* Filter Sidebar */}
				<aside
					className={`min-h-full  sm:w-1/2 lg:w-1/3 bg-white rounded-lg shadow  transition-all duration-700 ease-in-out ${
						isFilterOpen
							? "translate-x-0 opacity-100 w-full p-4"
							: "-translate-x-full opacity-0 w-0"
					} sm:translate-x-0 sm:opacity-100  sm:px-4`}
					aria-hidden={!isFilterOpen}>
					<FilterForm
						FIELD_CONTENT={INVENTORY_FILTER_CONTENTS}
						ON_SUBMIT={onSubmit}
						ON_CLEAR={onClear}
					/>
				</aside>
				{/* Product Grid */}
				<div
					id="shop"
					className={`flex flex-wrap items-center justify-center gap-6
							 transition-all duration-700 ease-in-out ${
									isFilterOpen ? "opacity-0 w-0 " : "opacity-100  w-full"
								}  sm:opacity-100 sm:w-full  `}>
					<LoadingErrorBoundary
						isLoading={fetchLoading || isFetching}
						isError={fetchIsError}
						errorMessage={handleAndShowError(
							fetchError,
							"Failed to fetch products data"
						)}>
						{Array.isArray(data) && (
							<ListOptions
								OPTIONS={data}
								RENDER_ITEM={(product) => (
									<ProductCard key={product._id} product={product} />
								)}
								EMPTY_MESSAGE="No products available."
							/>
						)}
					</LoadingErrorBoundary>
				</div>
			</div>
			{/* Pagination */}
			<div className="container mx-auto mt-6 px-4 py-6">
				<Pagination
					pageNumbers={pageNumbers}
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePage}
				/>
			</div>
		</section>
	);
};

export default ProductPage;
