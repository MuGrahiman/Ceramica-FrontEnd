import React, { useState } from "react";
import Banner from "../../components/Banner";
import HeroSection from "../../components/Hero";
import BreadCrumb from "../../components/BreadCrumb";

const Header = () => {
	return (
		<header className="bg-white sticky top-0 shadow z-10">
			<div className="container mx-auto flex justify-between items-center p-4">
				<a href="/" className="text-lg font-bold">
					Your Logo
				</a>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/about">About</a>
						</li>
						<li>
							<a href="/contact">Contact</a>
						</li>
						<li>
							<a href="/cart">Cart</a>
						</li>
					</ul>
				</nav>
				<input
					type="text"
					placeholder="Search..."
					className="border rounded p-2"
				/>
			</div>
		</header>
	);
};

import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import BrandLogo from "../../components/BrandLogo";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import useToggle from "../../hooks/useToggle";
import FilterForm from "../../components/FilterForm";

const AnimatedNavbar = () => {
	const [selected, setSelected] = useState("Home");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<nav className="bg-white shadow sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					{/* Logo */}
					{/* <div className="text-2xl font-bold dark:text-blue-950">Logo</div> */}
					<BrandLogo
						logo="path/to/logo.png"
						imageSize={70}
						titleColor="text-blue-950"
						subtitleColor="text-gray-900"
					/>

					{/* Desktop Navigation Links */}
					<ul className="hidden md:flex space-x-6">
						{["Home", "Shop", "About", "Contact", "Cart"].map((item) => (
							<li
								key={item}
								className={`relative cursor-pointer px-4 py-2 transition-all duration-300 ease-in-out ${
									selected === item
										? "dark:text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
										: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
								} hover:after:bg-gray-300`}
								onClick={() => setSelected(item)}>
								<a href="/">{item}</a>
							</li>
						))}
					</ul>
					<div className="flex items-center justify-between space-x-4">
						<button
							onClick={() => setSelected("cart")}
							className={`px-6 py-2 rounded-lg  border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 
                            ${
															selected === "cart"
																? "bg-blue-950 text-white"
																: " bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
														}`}>
							<FaShoppingCart />
						</button>

						<button
							onClick={() => setSelected("user")}
							className={`px-6 py-2 rounded-lg  border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 
                            ${
															selected === "user"
																? "bg-blue-950 text-white"
																: " bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
														}`}>
							<FaUser />
						</button>
					</div>
					{/* Mobile Menu Button */}
					<div
						className="md:hidden cursor-pointer text-gray-600"
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						{isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</div>
				</div>
			</nav>

			{/* Mobile Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} z-50 w-64`}>
				<div className="flex flex-col items-start p-6 space-y-6">
					<div className="text-2xl font-bold text-blue-500 mb-6">Logo</div>
					{["Home", "Shop", "About", "Contact", "Cart"].map((item) => (
						<div
							key={item}
							className={`relative cursor-pointer text-lg w-full px-4 py-2 transition-all duration-300 ease-in-out ${
								selected === item
									? "text-blue-500 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-500 after:absolute after:w-full after:bottom-0"
									: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
							} hover:after:bg-gray-300`}
							onClick={() => {
								setSelected(item);
								setIsSidebarOpen(false);
							}}>
							{item}
						</div>
					))}
				</div>
			</div>

			{/* Animation Keyframes */}
			<style>
				{`
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
			</style>
		</>
	);
};

const FilterSidebar = ({ isOpen = false }) => {
	return (
		// <aside
		// className={`
		// 	w-full p-4 transition-all duration-700 ease-in-out ${
		// 	isOpen
		// 		? "translate-y-0 z-50 opacity-100"
		// 		: "-translate-y-full opacity-0 -z-50"
		// } bg-gray-800 text-gray-500 text-lg md:opacity-100 md:-z-0`}>
		// <aside className="hidden md:block w-1/3 min-h-full p-4 bg-white  rounded-lg shadow">
		<>
			<h3 className="font-semibold text-gray-700 mb-4">Filters</h3>
			<div className="mb-4">
				<h4 className="text-gray-600 mb-2">Category</h4>
				<ul>
					<li>
						<input type="checkbox" id="plates" />{" "}
						<label htmlFor="plates">Plates</label>
					</li>
					<li>
						<input type="checkbox" id="mugs" />{" "}
						<label htmlFor="mugs">Mugs</label>
					</li>
					<li>
						<input type="checkbox" id="bowls" />{" "}
						<label htmlFor="bowls">Bowls</label>
					</li>
				</ul>
			</div>
			<div className="mb-4">
				<h4 className="text-gray-600 mb-2">Price Range</h4>
				<input type="range" min="0" max="100" className="w-full" />
			</div>
			<div className="mb-4">
				<h4 className="text-gray-600 mb-2">Rating</h4>
				<ul>
					<li>
						<input type="checkbox" id="4stars" />{" "}
						<label htmlFor="4stars">4 stars & above</label>
					</li>
					<li>
						<input type="checkbox" id="3stars" />{" "}
						<label htmlFor="3stars">3 stars & above</label>
					</li>
				</ul>
			</div>
		</>
	);
};

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-4">
			<div className="container mx-auto text-center">
				<p>© 2025 Your Brand. All Rights Reserved.</p>
				<div className="mt-2">
					<a href="/privacy" className="mx-2">
						Privacy Policy
					</a>
					<a href="/terms" className="mx-2">
						Terms of Service
					</a>
				</div>
			</div>
		</footer>
	);
};

function DemoPage() {
	const products = [
		{
			id: 1,
			name: "Ceramic Plate Set",
			image: "https://via.placeholder.com/150",
			shortDescription: "Set of 4 ceramic plates.",
			price: 29.99,
			rating: 4.5,
			reviewCount: 120,
		},
		{
			id: 2,
			name: "Coffee Mug",
			image: "https://via.placeholder.com/150",
			shortDescription: "12 oz coffee mug.",
			price: 15.99,
			rating: 4.8,
			reviewCount: 250,
		},
		{
			id: 3,
			name: "Dinner Bowl",
			image: "https://via.placeholder.com/150",
			shortDescription: "Deep dinner bowl.",
			price: 19.99,
			rating: 4.0,
			reviewCount: 90,
		},
		{
			id: 4,
			name: "Glass Water Bottle",
			image: "https://via.placeholder.com/150",
			shortDescription: "Reusable glass water bottle.",
			price: 9.99,
			rating: 4.9,
			reviewCount: 70,
		},
		{
			id: 5,
			name: "Colorful Salad Bowl",
			image: "https://via.placeholder.com/150",
			shortDescription: "Large colorful salad bowl.",
			price: 22.49,
			rating: 4.7,
			reviewCount: 45,
		},
		{
			id: 6,
			name: "Tea Set",
			image: "https://via.placeholder.com/150",
			shortDescription: "Includes 1 teapot and 4 cups.",
			price: 49.99,
			rating: 4.6,
			reviewCount: 60,
		},
		{
			id: 7,
			name: "Soup Tureen",
			image: "https://via.placeholder.com/150",
			shortDescription: "Elegant soup serving bowl.",
			price: 34.99,
			rating: 4.3,
			reviewCount: 30,
		},
		{
			id: 8,
			name: "Mason Jar Set",
			image: "https://via.placeholder.com/150",
			shortDescription: "Set of 6 mason jars.",
			price: 25.0,
			rating: 4.8,
			reviewCount: 150,
		},
		{
			id: 9,
			name: "Non-stick Frying Pan",
			image: "https://via.placeholder.com/150",
			shortDescription: "Durable non-stick frying pan.",
			price: 45.0,
			rating: 4.5,
			reviewCount: 110,
		},
		{
			id: 10,
			name: "Bamboo Cutting Board",
			image: "https://via.placeholder.com/150",
			shortDescription: "Eco-friendly bamboo cutting board.",
			price: 19.99,
			rating: 4.2,
			reviewCount: 80,
		},
	];
	const [setIsOpen, isOpen] = useToggle();
	// const [isOpen, setIsOpen] = useState(false);

	return (
		<div className=" min-h-screen">
			{/* <AnimatedNavbar /> */}
			<HeroSection
				title="Welcome to Our Ceramic Store"
				subtitle="Discover beautiful ceramic tableware"
				backgroundImage="https://media.istockphoto.com/id/636013786/photo/tile-samples-in-store.jpg?s=1024x1024&w=is&k=20&c=ZkQcNU9mTkqZcYzjfLS4Glj3ce_6vIv15a2ywRSoslY="
				buttonText="Shop Now"
				buttonLink="/products"
			/>
			{/* <Banner
				title="Welcome to Our Store!"
				subtitle="Discover New Products and Exciting Offers"
				buttonText="Shop Now"
				buttonLink="/shop"
				backgroundImage="https://demos.codezeel.com/wordpress/WCM08/WCM080183/default/wp-content/plugins/templatemela-plugin-ciramica/layouts/default/img/logo.svg"
			/> */}
			<div className="lg:container mx-auto ">
				
				{
					!(
						<div className="  flex  justify-between gap-4 py-6">
							{/* <div className="w-1/3"> */}
							<aside
								className={` 
						 min-h-full w-1/3 bg-white  rounded-lg shadow
						 p-4 transition-all duration-700 ease-in-out 
						${isOpen ? "translate-x-full " : "-translate-x-0 opacity-0 z-50"}
					 text-lg `}>
								<FilterSidebar />
							</aside>
							{/* </div> */}
							<div
								className={`w-full  transition-all duration-700 ease-in-out ${
									isOpen("client-filter")
										? "opacity-0 -z-50"
										: "opacity-100 z-50"
								} flex flex-wrap items-center justify-evenly
						`}
								// className="flex flex-wrap items-center justify-evenly gap-6 w-full "
							>
								{products.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						</div>
					)
				}

				<div className="flex  justify-between md:gap-4 py-6 ">
					<aside
						className={`min-h-full  sm:w-1/2 lg:w-1/3 bg-white rounded-lg shadow  transition-all duration-700 ease-in-out ${
							isOpen("isOpen")
								? "translate-x-0 opacity-100 w-full p-4"
								: "-translate-x-full opacity-0 w-0"
						} sm:translate-x-0 sm:opacity-100  sm:p-4`}>
						<FilterForm />
					</aside>

					<div
						className={`flex flex-wrap items-center justify-evenly gap-6
							 transition-all duration-700 ease-in-out ${
									isOpen("isOpen") ? "opacity-0 w-0 " : "opacity-100  w-full"
								}  sm:opacity-100 sm:w-full  `}>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>

					{/* Button to toggle filter visibility */}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default DemoPage;
