import React, { useState } from "react";
import logo from '../assets/logo/logo.png'
import PropTypes from "prop-types";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
	MdClose,
	MdDashboard,
	MdFormatListBulletedAdd,
	MdLogout,
	MdManageAccounts,
	MdNotificationImportant,
	MdOutlineInventory,
	MdOutlineManageHistory,
} from "react-icons/md";
import { APP } from "../constants/app";

const navigationItems = [
	{
		label: "Dashboard",
		path: "/dashboard",
		icon: <MdDashboard className="h-6 w-6" />,
	},
	{
		label: "Users",
		path: "/folders",
		icon: <MdManageAccounts className="h-6 w-6" />,
	},
	{
		label: "Inventory",
		path: "/dashboard/inventory",
		icon: <MdOutlineInventory className="h-6 w-6" />,
	},
	{
		label: "Coupon",
		path: "/dashboard/Coupon",
		icon: <MdFormatListBulletedAdd className="h-6 w-6" />,
	},
	{
		label: "Orders",
		path: "/dashboard/orders",
		icon: <MdOutlineManageHistory className="h-6 w-6" />,
	},
	{
		label: "Inquiries",
		path: "/dashboard/inquiries",
		icon: <MdNotificationImportant className="h-6 w-6" />,
	},
];

const SidebarLink = ({ label, path, icon }) => (
	<Link
		to={path}
		className="inline-flex items-center gap-5 p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
		aria-label={label}>
		{icon}
		<span className="sm:hidden md:block">{label}</span>
	</Link>
);

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem(APP);
		navigate("/");
	};

	return (
		<section className="flex min-h-screen max-h-screen overflow-hidden">
			<aside
				className={`${
					isSidebarOpen
						? "translate-x-0 opacity-100"
						: "-translate-x-full opacity-100"
				} sm:translate-x-0 sm:opacity-100 flex-shrink-0
				      w-full sm:w-fit md:w-1/3 lg:w-1/5 flex flex-col bg-gray-800 text-gray-500 text-lg fixed sm:relative z-[100] min-h-full
				      transition-transform duration-700 ease-in-out`}>
				<div className="flex justify-between items-center mx-4 mt-4">
					<Link
						to="/"
						className="inline-flex items-center gap-5 p-3 h-20 rounded-lg">
						<img src={logo} width={50} alt="Logo" />
						<span className="sm:hidden md:block m-0">
							<h1 className="font-serif text-xl m-0">Ceramica</h1>
							<small className="m-0">Tableware's</small>
						</span>
					</Link>
					<button
						className={`sm:hidden text-white self-end transform transition-transform duration-500 my-auto ${
							isSidebarOpen && "rotate-[360deg]"
						}`}
						onClick={() => setIsSidebarOpen(false)}
						aria-label="Close sidebar">
						<MdClose className="h-8 w-8" />
					</button>
				</div>
				<nav className="flex flex-col mx-4 my-6 space-y-4">
					{navigationItems.map((item) => (
						<SidebarLink
							key={item.label}
							label={item.label}
							path={item.path}
							icon={item.icon}
						/>
					))}
				</nav>
				<hr className="border-t border-white w-full bg-white mt-auto" />
				<div className="flex flex-col mx-4 my-6 space-y-4">
					<button
						className="inline-flex items-center gap-5 p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg"
						onClick={handleLogout}
						aria-label="Logout">
						<MdLogout className="h-6 w-6" />
						<span className="sm:hidden md:block">Logout</span>
					</button>
				</div>
			</aside>
			<main
				className={`flex-grow p-6 sm:p-10 space-y-6 overflow-y-auto ${
					isSidebarOpen ? "hidden sm:block" : "block"
				}`}>
				<header className="sm:hidden flex items-center h-20 px-6 sm:px-10 bg-white">
					<button
						className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full"
						onClick={() => setIsSidebarOpen(true)}
						aria-label="Open sidebar">
						<span className="sr-only">Menu</span>
						<svg
							aria-hidden="true"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-6 w-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</button>
					<div className="flex flex-shrink-0 items-center ml-auto">
						<div className="border-l pl-3 ml-3 space-x-1">
							<button
								className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
								aria-label="Notifications">
								<span className="sr-only">Notifications</span>
								<span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
								<span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
								<svg
									aria-hidden="true"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="h-6 w-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</button>
							<button
								onClick={handleLogout}
								className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
								aria-label="Log out">
								<span className="sr-only">Log out</span>
								<svg
									aria-hidden="true"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="h-6 w-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
							</button>
						</div>
					</div>
				</header>
				{/* Main content goes here */}
				<section className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
					<Outlet />
				</section>
			</main>
		</section>
	);
};

export default AdminLayout;
