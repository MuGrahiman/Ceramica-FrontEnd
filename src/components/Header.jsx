import React, { useState, useMemo } from "react";
import BrandLogo from "./BrandLogo";
import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useScroll } from "../hooks/useScroll";
import useToggle from "../hooks/useToggle";
import ListOptions from "./ListOptions";

// navigationItems.js
const navigationItems = [
	{ name: "Home", path: "/" },
	{ name: "Shop", path: "/shop" },
	{ name: "About", path: "/about" },
	{ name: "Contact", path: "/contact" },
	{ name: "Cart", path: "/cart" },
	{ name: "Profile", path: "/profile" },
];

const Header = () => {
	const ToggleContent = "client-sidebar";
	const [selected, setSelected] = useState("Home");
	const [setIsSidebarOpen, isSidebarOpen] = useToggle();
	const isScrolled = useScroll();

	const itemsToDisplay = useMemo(() => navigationItems.slice(0, 4), []);
	const location = useLocation();
	const getActiveItem = (itemName) => {
		const currentPath = location.pathname;
		const activeItem = navigationItems.find(
			(item) => item.path === currentPath
		);
		return (
			activeItem && activeItem.name.toLowerCase() === itemName.toLowerCase()
		);
	};

	return (
		<header
			className={`max-w-screen-2xl mx-auto ${
				isScrolled ? "bg-white shadow-md" : "bg-transparent"
			} sticky top-0 z-50 font-serif`}>
			<div className="container mx-auto px-4 py-4">
				<nav className="flex justify-between items-center">
					<BrandLogo
						imageSize={70}
						titleColor="text-blue-950"
						subtitleColor="text-gray-900"
					/>

					<ul className="hidden md:flex space-x-6">
						<ListOptions
							OPTIONS={itemsToDisplay}
							RENDER_ITEM={(item) => (
								<li
									key={item.path}
									className={`relative cursor-pointer lg:px-4 py-2 transition-all duration-300 ease-in-out ${
										getActiveItem(item.name)
											? "dark:text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
											: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
									} hover:after:bg-gray-300`}
									onClick={() => setSelected(item.name)}>
									<Link to={item.path}>{item.name}</Link>
								</li>
							)}
						/>
					</ul>

					<div className="hidden sm:flex items-center justify-between space-x-4">
						<Link
							to={navigationItems[4].path} // Cart
							className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
								getActiveItem("Cart")
									? "bg-blue-950 text-white"
									: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
							}`}>
							<FaShoppingCart />
						</Link>

						<Link
							to={navigationItems[5].path} // Profile
							className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
								getActiveItem("Profile")
									? "bg-blue-950 text-white"
									: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
							}`}>
							<FaUser />
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div
						className="md:hidden cursor-pointer text-gray-600"
						onClick={() => setIsSidebarOpen(ToggleContent)}
						aria-label="Toggle menu">
						<FaBars size={24} />
					</div>
				</nav>
			</div>

			{/* Mobile Sidebar */}

			<aside
				className={` w-full sm:w-fit md:hidden fixed top-0 left-0 min-h-screen bg-white shadow-lg transform transition-transform duration-300 ${
					isSidebarOpen(ToggleContent)
						? "translate-x-0 opacity-100"
						: "-translate-x-full opacity-100"
				} z-50 `}>
				<div className="flex flex-col items-start p-6 space-y-6">
					<span className="w-full flex items-center justify-between gap-5">
						<BrandLogo
							imageSize={50}
							titleColor="text-blue-950"
							subtitleColor="text-gray-900"
						/>
						<FaTimes
							className="w-6 h-6 text-blue-950 p-1 cursor-pointer rounded-full hover:scale-150 hover:shadow-lg"
							onClick={() => setIsSidebarOpen(ToggleContent)}
						/>
					</span>

					<ListOptions
						OPTIONS={navigationItems}
						RENDER_ITEM={(item) => (
							<Link
								to={item.path}
								key={item.path}
								className={`relative cursor-pointer text-lg w-full px-4 py-2 transition-all duration-300 ease-in-out ${
									selected === item.name
										? "text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
										: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
								} hover:after:bg-gray-300`}
								onClick={() => {
									setSelected(item.name);
									setIsSidebarOpen(ToggleContent);
								}}>
								{item.name}
							</Link>
						)}
					/>
				</div>
			</aside>

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
		</header>
	);
};

export default Header;
