import { Link } from "react-router-dom";
import {
    HiMiniBars3CenterLeft,
    HiOutlineHeart,
    HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/store";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 5);
    };

    const handleLogOut = async () => {
        try {
            await dispatch(removeUser());
            setIsDropdownOpen(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const role = currentUser?.Role || null;

    return (
        <header className={`max-w-screen-2xl mx-auto px-4 py-6 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"} sticky top-0 z-50`}>
            <nav className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="h-6 w-6" />
                    </Link>

                    <div className="relative sm:w-72 w-40 space-x-2">
                        <IoSearchOutline className="absolute left-3 inset-y-2" />
                        <input
                            type="text"
                            placeholder="Search here"
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {role === "client" ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-haspopup="true" aria-expanded={isDropdownOpen}>
                                    <img
                                        src={avatarImg}
                                        alt="User Avatar"
                                        className={`h-7 w-7 rounded-full ${currentUser ? "ring-2 ring-blue-500" : ""}`}
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : role === "admin" ? (
                            <Link to="/dashboard" className="border-b-2 border-primary">Dashboard</Link>
                        ) : (
                            <Link to="/login">
                                <HiOutlineUser className="h-6 w-6" />
                            </Link>
                        )}
                    </div>

                    {/* Other Icons */}
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="h-6 w-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart />
                        <span className="text-sm font-semibold sm:ml-1">{cartItems.length > 0 ? cartItems.length : 0}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
