import React, { useMemo } from "react";
import BrandLogo from "./BrandLogo";
import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useScroll } from "../hooks/useScroll";
import useToggle from "../hooks/useToggle";
import ListOptions from "./ListOptions";
import {
	CLIENT_LOGIN_PATH,
	CLIENT_NAVIGATION_PATHS,
	CLIENT_SIDEBAR_TOGGLE_KEY,
	USER_ROLES,
} from "../constants/app";
import { useActiveNav } from "../hooks/useActivePath";
import { useAuth } from "../hooks/useAuth";

const CART_ITEM = CLIENT_NAVIGATION_PATHS.find((item) => item.name === "Cart");
const PROFILE_ITEM = CLIENT_NAVIGATION_PATHS.find(
	(item) => item.name === "Profile"
);
const LOGIN_ITEM = CLIENT_LOGIN_PATH;
/**
 * Client side header with responsive navigation and authentication handling
 */
const Header = () => {
	const { isAuthorized } = useAuth(USER_ROLES.CLIENT);
	const [setIsSidebarOpen, isSidebarOpen] = useToggle();
	const isScrolled = useScroll();
	const { isActiveNav, currentNavPath } = useActiveNav(CLIENT_NAVIGATION_PATHS);

	const itemsToDisplay = useMemo(() => CLIENT_NAVIGATION_PATHS.slice(0, 4), []);
	/**
	 * Mobile navigation items with authentication-based filtering:
	 * - Unauthorized users: Hide Cart/Profile, show Login
	 * - Authorized users: Show Cart/Profile, hide Login
	 */
	const mobileNavItems = useMemo(
		() =>
			CLIENT_NAVIGATION_PATHS.filter((item) => {
				if (!isAuthorized) {
					return (
						item.name !== CART_ITEM.name && item.name !== PROFILE_ITEM.name
					);
				}
				return item.name !== LOGIN_ITEM.name;
			}),
		[isAuthorized]
	);

	return (
		<header
			className={`max-w-screen-2xl mx-auto ${
				isScrolled ? "bg-white shadow-md" : "bg-transparent"
			} sticky top-0 z-50 font-serif`}>
			<div className="container mx-auto px-4 py-4">
				<nav className="flex justify-between items-center">
					{/* Brand Logo */}
					<BrandLogo
						imageSize={70}
						titleColor="text-blue-950"
						subtitleColor="text-gray-900"
					/>

					{/* Desktop Navigation */}
					<ul className="hidden md:flex space-x-6">
						<ListOptions
							OPTIONS={itemsToDisplay}
							RENDER_ITEM={(item) => (
								<li key={item.path}>
									<Link
										className={`relative cursor-pointer lg:px-4 py-2 transition-all duration-300 ease-in-out ${
											isActiveNav(item.name)
												? "dark:text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
												: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
										} hover:after:bg-gray-300`}
										to={item.path}>
										{item.name}
									</Link>
								</li>
							)}
						/>
					</ul>

					{/* Desktop Auth Actions */}
					<div className="hidden md:flex items-center justify-between space-x-4">
						{isAuthorized ? (
							<React.Fragment>
								<Link
									to={CART_ITEM.path}
									className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
										isActiveNav(CART_ITEM.name)
											? "bg-blue-950 text-white"
											: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
									}`}
									aria-label="Shopping Cart">
									<FaShoppingCart />
								</Link>
								<Link
									to={PROFILE_ITEM.path}
									className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
										isActiveNav(PROFILE_ITEM.name)
											? "bg-blue-950 text-white"
											: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
									}`}
									aria-label="User Profile">
									<FaUser />
								</Link>
							</React.Fragment>
						) : (
							<Link
								to={LOGIN_ITEM.path}
								className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600  hover:bg-gray-600 hover:text-gray-200 transition-all duration-300 ${
									currentNavPath === LOGIN_ITEM.path
										? "bg-blue-950 text-white"
										: "bg-transparent text-blue-950"
								}`}>
								{LOGIN_ITEM.name}
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden cursor-pointer text-gray-600 p-2"
						onClick={() => setIsSidebarOpen(CLIENT_SIDEBAR_TOGGLE_KEY)}
						aria-label="Toggle menu"
						type="button">
						<FaBars size={24} />
					</button>
				</nav>
			</div>

			{/* Mobile Sidebar */}
			<aside
				className={`w-full sm:w-fit md:hidden fixed top-0 left-0 min-h-screen bg-white shadow-lg transform transition-transform duration-300 ${
					isSidebarOpen(CLIENT_SIDEBAR_TOGGLE_KEY)
						? "translate-x-0"
						: "-translate-x-full"
				} z-50`}>
				<div className="flex flex-col items-start p-6 space-y-6">
					<div className="w-full flex items-center justify-between gap-5">
						<BrandLogo
							imageSize={50}
							titleColor="text-blue-950"
							subtitleColor="text-gray-900"
						/>
						<button
							className="p-1 cursor-pointer rounded-full hover:scale-150 hover:shadow-lg"
							onClick={() => setIsSidebarOpen(CLIENT_SIDEBAR_TOGGLE_KEY)}
							aria-label="Close menu"
							type="button">
							<FaTimes className="w-6 h-6 text-blue-950" />
						</button>
					</div>

					<ListOptions
						OPTIONS={mobileNavItems}
						RENDER_ITEM={(item) => (
							<Link
								to={item.path}
								key={item.path}
								className={`relative cursor-pointer text-lg w-full px-4 py-2 transition-all duration-300 ease-in-out ${
									isActiveNav(item.name)
										? "text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
										: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
								} hover:after:bg-gray-300`}
								onClick={() => setIsSidebarOpen(CLIENT_SIDEBAR_TOGGLE_KEY)}>
								{item.name}
							</Link>
						)}
					/>
				</div>
			</aside>
		</header>
	);
};

export default Header;
