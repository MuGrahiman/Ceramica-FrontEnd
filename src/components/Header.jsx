import React, { useCallback, useMemo } from "react";
import BrandLogo from "./BrandLogo";
import { FaBars, FaLongArrowAltRight, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useScroll } from "../hooks/useScroll";
import useToggle from "../hooks/useToggle";
import ListOptions from "./ListOptions";
import {
	CLIENT_NAVIGATION_PATHS,
	CLIENT_SIDEBAR_TOGGLE_KEY,
	USER_ROLES,
	NAV_ITEM_CATEGORIES,
	CLIENT_HEADER_DROP_DOWN_TOGGLE_KEY,
	CLIENT_HEADER_CART_DOWN_TOGGLE_KEY,
} from "../constants/app";
import { useActiveNav } from "../hooks/useActivePath";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import DropdownMenu from "./DropdownMenu";
import { useUserSlice } from "../redux/store";
import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import CartList from "../pages/cart/CartList";
import CartSummary from "../pages/cart/CartSummary";

//  PropTypes definition for navigation items
const PATH_PROP_SHAPE = {
	path: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	icon: PropTypes.elementType,
	category: PropTypes.oneOf([
		NAV_ITEM_CATEGORIES.HEADER,
		NAV_ITEM_CATEGORIES.AUTH,
		NAV_ITEM_CATEGORIES.DROPDOWN,
	]).isRequired,
};
//  PropTypes definition for cart items
const CART_PROP_SHAPE = {
	isOpen: PropTypes.bool,
	cartItems: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			name: PropTypes.string,
			price: PropTypes.number,
			quantity: PropTypes.number,
			image: PropTypes.string,
		})
	),
	subTotal: PropTypes.number,
	isRemoving: PropTypes.bool,
	isUpdating: PropTypes.bool,
	isFetching: PropTypes.bool,
	onClose: PropTypes.func,
};

const CART = "Cart";
const PROFILE = "Profile";
const ORDER = "Orders";
const WISHLIST = "Wishlist";
const LOGIN = "Login";
const LOGOUT = "Logout";

/**
 * CartModal Component
 *
 * Renders a modal showing shopping cart items and summary.
 *
 * Props:
 * - isOpen (boolean): Controls visibility of the modal.
 * - cartItems (array): List of items in the cart.
 * - subTotal (number): Subtotal value for the cart.
 * - isLoading (boolean): Loading state for cart updates.
 * - onClose (function): Callback to handle closing the modal.
 */
const CartModal = ({
	isOpen = false,
	cartItems = [],
	subTotal = 0,
	isRemoving = false,
	isUpdating = false,
	isFetching = false,
	onClose = () => {},
}) => {
	if (!isOpen) return null; // Don’t render if modal is closed

	return (
		<div
			role="dialog"
			aria-label="Shopping cart"
			className={`
				absolute z-50 bg-blue-950 border border-gray-300 max-h-lvh overflow-hidden 
				rounded-lg shadow-2xl shadow-blue-900/50
				transform origin-top
				transition-all duration-300 ease-out py-6
					${
						isOpen
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
					}
			`}
			style={{ top: "100%", right: "-50px", marginTop: "0.5rem" }}>
			<div className="container bg-white shadow-xl">
				{/* Header */}
				<div className="flex-1 px-4 py-6 sm:px-6">
					<Link
						to="/cart"
						className="flex items-start justify-between"
						onClick={onClose}>
						<h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
						<FaLongArrowAltRight />
					</Link>

					{/* Cart Items */}
					<div className="max-h-56 overflow-y-auto mt-4">
						<CartList CART_ITEMS={cartItems} />
					</div>
				</div>

				{/* Summary */}
				<CartSummary
					subtotal={subTotal}
					isLoading={isRemoving || isUpdating || isFetching}
				/>
			</div>
		</div>
	);
};

CartModal.propTypes = CART_PROP_SHAPE;

/**
 * Desktop navigation component
 */

const DesktopView = ({
	navItems = [],
	authItems = [],
	dropdownItems = [],
	isDropDownOpen = false,
	getActiveNav = () => {},
	handleDropdownItemSelect = () => {},
	onToggleModal = () => {},
	cartData = {},
}) => {
	return (
		<React.Fragment>
			{/* Main Navigation */}
			<ul className="hidden md:flex space-x-6">
				<ListOptions
					OPTIONS={navItems}
					RENDER_ITEM={(item, index) => (
						<li key={item.path + index}>
							<Link
								to={item.path}
								className={`relative cursor-pointer lg:px-4 py-2 transition-all duration-300 ease-in-out ${
									getActiveNav(item.name)
										? "dark:text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
										: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
								} hover:after:bg-gray-300`}>
								{item.name}
							</Link>
						</li>
					)}
				/>
			</ul>

			{/* Auth Actions (Cart, Profile, Dropdown) */}
			<ul className="relative hidden md:flex items-center justify-between space-x-4">
				<ListOptions
					OPTIONS={authItems}
					RENDER_ITEM={(item = { icon: null, name: "", path: "" }) => {
						const { icon: Icon, name, path } = item;
						return name === LOGIN ? (
							<li key={path}>
								<Link
									to={path}
									className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
										getActiveNav(name)
											? "bg-blue-950 text-white"
											: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
									}`}
									aria-label="User Profile"
									aria-expanded={isDropDownOpen}>
									{name}
								</Link>
							</li>
						) : (
							<li key={path}>
								<button
									onClick={() => onToggleModal(name)}
									className={`px-6 py-2 rounded-lg border-2 border-blue-950 hover:border-gray-600 transition-all duration-300 ${
										getActiveNav(name)
											? "bg-blue-950 text-white"
											: "bg-transparent text-blue-950 hover:bg-gray-600 hover:text-gray-200"
									}`}
									aria-label={name}
									aria-expanded={isDropDownOpen}>
									{Icon && <Icon className="w-5 h-5" />}
								</button>
							</li>
						);
					}}
				/>

				{/*  Cart Modal */}
				<CartModal {...cartData} onClose={() => onToggleModal("CART")} />

				{/* Dropdown */}
				<DropdownMenu
					onClose={() => onToggleModal(PROFILE)}
					options={dropdownItems}
					isOpen={isDropDownOpen}
					onSelect={handleDropdownItemSelect}
					renderKey={(option) => option?.name}
					renderValue={(
						{ icon: RenderIcon, name: renderName } = { icon: null, name: "" }
					) => (
						<div className="flex items-center relative">
							{RenderIcon && <RenderIcon className="w-4 h-4 me-2" />}
							<span className="truncate">{renderName}</span>
						</div>
					)}
					isOptionSelected={(option) => getActiveNav(option?.name)}
					position={{
						left: "auto",
						right: "0",
					}}
				/>
			</ul>
		</React.Fragment>
	);
};

DesktopView.propTypes = {
	navItems: PropTypes.arrayOf(PropTypes.shape(PATH_PROP_SHAPE)).isRequired,
	authItems: PropTypes.arrayOf(PropTypes.shape(PATH_PROP_SHAPE)).isRequired,
	dropdownItems: PropTypes.arrayOf(PropTypes.shape(PATH_PROP_SHAPE)).isRequired,
	isDropDownOpen: PropTypes.bool.isRequired,
	getActiveNav: PropTypes.func.isRequired,
	handleDropdownItemSelect: PropTypes.func.isRequired,
	onToggleModal: PropTypes.func.isRequired,
	cartData: CART_PROP_SHAPE,
};

/**
 * Mobile navigation sidebar
 */
const MobileView = ({
	isSidebarOpen = false,
	setIsSidebarOpen = () => {},
	filteredNavItems = [],
	currentActivePath = "",
	onLogout = () => {},
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
					OPTIONS={filteredNavItems}
					RENDER_ITEM={(item = { icon: null, name: "", path: "" }) => {
						const { icon: Icon, name, path } = item;
						return (
							<Link
								to={path === "#" ? "/" : path}
								key={name}
								className={`relative flex items-center cursor-pointer text-lg w-full px-4 py-2 transition-all duration-300 ease-in-out ${
									currentActivePath === path
										? "text-blue-950 font-semibold after:content-[''] after:block after:h-1 after:bg-blue-950 after:absolute after:w-full after:bottom-0"
										: "text-gray-600 after:content-[''] after:block after:h-1 after:bg-transparent after:absolute after:w-full after:bottom-0"
								} hover:after:bg-gray-300`}
								onClick={(e) =>
									name === LOGOUT ? onLogout(e) : setIsSidebarOpen()
								}>
								{Icon && <Icon className="w-5 h-5 me-3" />} {name}
							</Link>
						);
					}}
				/>
			</div>
		</aside>
	);
};

MobileView.propTypes = {
	isSidebarOpen: PropTypes.bool.isRequired,
	setIsSidebarOpen: PropTypes.func.isRequired,
	filteredNavItems: PropTypes.arrayOf(PropTypes.shape(PATH_PROP_SHAPE))
		.isRequired,
	currentActivePath: PropTypes.string.isRequired,
	onLogout: PropTypes.func.isRequired,
};

/**
 * Client side header with responsive navigation and authentication handling
 */
const Header = () => {
	const { isAuthorized } = useAuth(USER_ROLES.CLIENT);
	const [setToggleState, isToggled] = useToggle();
	const isScrolled = useScroll();
	const { isActiveNav, currentNavPath } = useActiveNav(CLIENT_NAVIGATION_PATHS);
	const { removeUser } = useUserSlice();
	const navigate = useNavigate();
	const { cartItems, isFetching, isRemoving, isUpdating } = useCart();
	const subTotal = useSelector((state) => state.order.subTotal);

	const toggleModal = useCallback(
		(name) => {
			const DROP_DOWN_KEY =
				name === PROFILE
					? CLIENT_HEADER_DROP_DOWN_TOGGLE_KEY
					: CLIENT_HEADER_CART_DOWN_TOGGLE_KEY;

			const isCartOpen = isToggled(CLIENT_HEADER_CART_DOWN_TOGGLE_KEY);
			const isProfileOpen = isToggled(CLIENT_HEADER_DROP_DOWN_TOGGLE_KEY);

			if (name === LOGOUT) {
				setToggleState(CLIENT_HEADER_CART_DOWN_TOGGLE_KEY, false); // Close cart dropdown
				setToggleState(CLIENT_HEADER_DROP_DOWN_TOGGLE_KEY, false); // Close profile dropdown
			} else {
				// If the clicked dropdown is already open, close it
				if (
					(name === PROFILE && isProfileOpen) ||
					(name === CART && isCartOpen)
				) {
					setToggleState(DROP_DOWN_KEY); // Close the currently open dropdown
				} else {
					// Close the other dropdown if it's open
					if (isCartOpen) {
						setToggleState(CLIENT_HEADER_CART_DOWN_TOGGLE_KEY); // Close cart dropdown
					}
					if (isProfileOpen) {
						setToggleState(CLIENT_HEADER_DROP_DOWN_TOGGLE_KEY); // Close profile dropdown
					}
					// Open the clicked dropdown
					setToggleState(DROP_DOWN_KEY);
				}
			}
		},
		[isToggled, setToggleState]
	);

	const setSideBarAct = useCallback(
		() => setToggleState(CLIENT_SIDEBAR_TOGGLE_KEY),
		[setToggleState]
	);

	const getActiveNav = (navName) => isActiveNav(navName);

	const onLogout = async (event) => {
		event?.preventDefault();
		await removeUser();
		navigate("/");
		toggleModal(LOGOUT); // Close dropdowns on logout
		setSideBarAct();
		return;
	};

	const handleDropdownItemSelect = async (item, e) => {
		if (item.name === LOGOUT) {
			await onLogout(e);
		}
		if (item.path && item.path !== "#") {
			navigate(item.path);
		}
	};

	/**
	 * Categorize navigation items based on their category and auth status.
	 */
	const { headerNavItems, authNavItems, mobileNavItems, dropdownItems } =
		useMemo(() => {
			const itemsBasedOnAuth = CLIENT_NAVIGATION_PATHS.filter((item) =>
				!isAuthorized
					? item.name !== CART &&
					  item.name !== PROFILE &&
					  item.name !== ORDER &&
					  item.name !== LOGOUT &&
					  item.name !== WISHLIST
					: item.name !== LOGIN
			);

			return {
				headerNavItems: itemsBasedOnAuth.filter(
					(item) => item.category === NAV_ITEM_CATEGORIES.HEADER
				),
				authNavItems: itemsBasedOnAuth.filter(
					(item) => item.category === NAV_ITEM_CATEGORIES.AUTH
				),
				dropdownItems: itemsBasedOnAuth.filter(
					(item) =>
						item.category === NAV_ITEM_CATEGORIES.DROPDOWN ||
						item.name === PROFILE
				),
				mobileNavItems: itemsBasedOnAuth,
			};
		}, [isAuthorized]);

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
					<DesktopView
						getActiveNav={getActiveNav}
						navItems={headerNavItems}
						dropdownItems={dropdownItems}
						isDropDownOpen={isToggled(CLIENT_HEADER_DROP_DOWN_TOGGLE_KEY)}
						isCartOpen={isToggled(CLIENT_HEADER_CART_DOWN_TOGGLE_KEY)}
						authItems={authNavItems}
						onToggleModal={toggleModal}
						onLogout={onLogout}
						handleDropdownItemSelect={handleDropdownItemSelect}
						cartData={{
							isOpen: isToggled(CLIENT_HEADER_CART_DOWN_TOGGLE_KEY), 
							cartItems,
							isFetching,
							isRemoving,
							isUpdating,
							subTotal,
						}}
					/>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden cursor-pointer text-gray-600 p-2"
						onClick={setSideBarAct}
						aria-label="Toggle menu"
						type="button">
						<FaBars size={24} />
					</button>

					{/* Mobile Sidebar */}
					<MobileView
						currentActivePath={currentNavPath}
						isSidebarOpen={isToggled(CLIENT_SIDEBAR_TOGGLE_KEY)}
						setIsSidebarOpen={setSideBarAct}
						filteredNavItems={mobileNavItems}
						onLogout={onLogout}
					/>
				</nav>
			</div>
		</header>
	);
};

export default Header;
