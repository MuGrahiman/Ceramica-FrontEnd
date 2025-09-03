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
import PropTypes from "prop-types";

// Shared PropTypes definition for navigation items
const NAV_ITEM_SHAPE = {
	path: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

/**
 * Desktop navigation component
 */
const DesktopView = ({ navItems = [], getActiveNav = () => {} }) => {
	return (
		<ul className="hidden md:flex space-x-6">
			<ListOptions
				OPTIONS={navItems}
				RENDER_ITEM={(item) => (
					<li key={item.path}>
						<Link
							className={`relative cursor-pointer lg:px-4 py-2 transition-all duration-300 ease-in-out ${
								getActiveNav(item.name)
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
	);
};

DesktopView.propTypes = {
	navItems: PropTypes.arrayOf(PropTypes.shape(NAV_ITEM_SHAPE)).isRequired,
	getActiveNav: PropTypes.func.isRequired,
};

/**
 * Desktop authentication actions (cart, profile, login)
 */
const DesktopAuthActions = ({
	isAuthorized = false,
	currentNavPath = "",
	loginItem = {},
	cartItem = {},
	profileItem = {},
	getActiveNav = () => {},
}) => {
	return (
		<div className="hidden md:flex items-center justify-between space-x-4">
			{isAuthorized ? (
				<React.Fragment>
					<Link
						to={cartItem.path}
						className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
							getActiveNav(cartItem.name)
								? "bg-blue-950 text-white"
								: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
						}`}
						aria-label="Shopping Cart">
						<FaShoppingCart />
					</Link>
					<Link
						to={profileItem.path}
						className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
							getActiveNav(profileItem.name)
								? "bg-blue-950 text-white"
								: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
						}`}
						aria-label="User Profile">
						<FaUser />
					</Link>
				</React.Fragment>
			) : (
				<Link
					to={loginItem.path}
					className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600  hover:bg-gray-600 hover:text-gray-200 transition-all duration-300 ${
						currentNavPath === loginItem.path
							? "bg-blue-950 text-white"
							: "bg-transparent text-blue-950"
					}`}>
					{loginItem.name}
				</Link>
			)}
		</div>
	);
};

DesktopAuthActions.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
	currentNavPath: PropTypes.string.isRequired,
	loginItem: PropTypes.shape(NAV_ITEM_SHAPE).isRequired,
	cartItem: PropTypes.shape(NAV_ITEM_SHAPE).isRequired,
	profileItem: PropTypes.shape(NAV_ITEM_SHAPE).isRequired,
	getActiveNav: PropTypes.func.isRequired,
};

/**
 * Mobile navigation sidebar
 */
const MobileView = ({
	isSidebarOpen = false,
	setIsSidebarOpen = () => {},
	mobileNavItems = [],
	currentActivePath = "",
}) => {
	return (
		<aside
			className={`w-full sm:w-1/2 md:hidden fixed top-0 left-0 min-h-screen bg-white shadow-lg transform transition-transform duration-300 ${
				isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
						onClick={setIsSidebarOpen}
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
								currentActivePath === item.path
									? "text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
									: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
							} hover:after:bg-gray-300`}
							onClick={setIsSidebarOpen}>
							{item.name}
						</Link>
					)}
				/>
			</div>
		</aside>
	);
};

MobileView.propTypes = {
	isSidebarOpen: PropTypes.bool.isRequired,
	setIsSidebarOpen: PropTypes.func.isRequired,
	mobileNavItems: PropTypes.arrayOf(PropTypes.shape(NAV_ITEM_SHAPE)).isRequired,
	currentActivePath: PropTypes.string.isRequired,
};

/**
 * Client side header with responsive navigation and authentication handling
 */
const Header = () => {
	const { isAuthorized } = useAuth(USER_ROLES.CLIENT);
	const [setIsSidebarOpen, isSidebarOpen] = useToggle();
	const isScrolled = useScroll();
	const { isActiveNav, currentNavPath } = useActiveNav(CLIENT_NAVIGATION_PATHS);

	// Display only first 4 navigation items on desktop for cleaner UI
	const itemsToDisplay = useMemo(() => CLIENT_NAVIGATION_PATHS.slice(0, 4), []);

	// Find navigation items with fallbacks to prevent errors if items are not found
	const CART_ITEM = CLIENT_NAVIGATION_PATHS.find(
		(item) => item.name === "Cart"
	) || { name: "Cart", path: "/cart" };

	const PROFILE_ITEM = CLIENT_NAVIGATION_PATHS.find(
		(item) => item.name === "Profile"
	) || { name: "Profile", path: "/profile" };

	const LOGIN_ITEM = CLIENT_LOGIN_PATH || { name: "Login", path: "/login" };

	/**
	 * Mobile navigation items with authentication-based filtering:
	 * - Unauthorized users: Hide Cart/Profile, show Login
	 * - Authorized users: Show Cart/Profile, hide Login
	 */
	const mobileNavItems = useMemo(() => {
		return [...CLIENT_NAVIGATION_PATHS, CLIENT_LOGIN_PATH].filter((item) => {
			if (!isAuthorized) {
				return item.name !== CART_ITEM.name && item.name !== PROFILE_ITEM.name;
			} else {
				return item.name !== LOGIN_ITEM.name;
			}
		});
	}, [CART_ITEM.name, LOGIN_ITEM.name, PROFILE_ITEM.name, isAuthorized]);
	
	// Helper functions for cleaner code
	const setSideBarAct = () => setIsSidebarOpen(CLIENT_SIDEBAR_TOGGLE_KEY);
	const getActiveNav = (navName) => isActiveNav(navName);
	
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

					{/* Desktop Navigation - Showing only first 4 items */}
					<DesktopView getActiveNav={getActiveNav} navItems={itemsToDisplay} />

					{/* Desktop Auth Actions */}
					<DesktopAuthActions
						getActiveNav={getActiveNav}
						cartItem={CART_ITEM}
						currentNavPath={currentNavPath}
						isAuthorized={isAuthorized}
						loginItem={LOGIN_ITEM}
						profileItem={PROFILE_ITEM}
					/>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden cursor-pointer text-gray-600 p-2"
						onClick={setSideBarAct}
						aria-label="Toggle menu"
						type="button">
						<FaBars size={24} />
					</button>
				</nav>
			</div>

			{/* Mobile Sidebar */}
			<MobileView
				currentActivePath={currentNavPath}
				isSidebarOpen={isSidebarOpen(CLIENT_SIDEBAR_TOGGLE_KEY)}
				setIsSidebarOpen={setSideBarAct}
				mobileNavItems={mobileNavItems}
			/>
		</header>
	);
};

export default Header;