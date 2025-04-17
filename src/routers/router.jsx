import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Auth from "../pages/auth/Auth";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import OTP from "../pages/auth/OTP";
import Mail from "../pages/auth/Mail";
import AdminLayout from "../components/AdminLayout";
import DemoPage from "../pages/demo/DemoPage";
import AddToInventory from "../pages/inventory/AddToInventory";
import ModifyInventory from "../pages/inventory/UpdateInventory";
import InventoryDetailsPage from "../pages/inventory/InventoryDetailsPage";
import Shop from "../pages/shop/Shop";
import CartPage from "../pages/cart/CartPage";
import CheckOutPage from "../pages/checkout/CheckOutPage";
import SuccessPaymentPage from "../pages/success/SuccessPaymentPage";
import CouponPage from "../pages/coupon/CouponPage";
import CreateCoupon from "../pages/coupon/CreateCoupon";
import CouponDetailsPage from "../pages/coupon/CouponDetailsPage";
import UpdateCoupon from "../pages/coupon/UpdateCoupon";
import OrderPage from "../pages/order/OrderPage";
import OrderDetailPage from "../pages/order/OrderDetailPage";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import InquiryPage from "../pages/inquiry/InquiryPage";
import InquiryDetailsPage from "../pages/inquiry/InquiryDetailsPage";
import InventoryPage from "../pages/inventory/InventoryPage";
import UserPage from "../pages/user/UserPage";
import UserDetailPage from "../pages/user/UserDetailPage";
import ProfilePage from "../pages/profile/ProfilePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/demo",
				element: <DemoPage />,
			},
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/mail",
				element: <Mail />,
			},
			{
				path: "/otp/:userId",
				element: <OTP />,
			},
			{
				path: "/shop",
				element: <Shop/>,
			},
			{
				path: "/about",
				element: <AboutPage/>,
			},
			{
				path: "/contact",
				element: <ContactPage/>,
			},
			{
				path: "/cart",
				element: <CartPage />,
			},
			{
				path: "/orders",
				element: (
					<PrivateRoute>
						<OrderPage />
					</PrivateRoute>
				),
			},
			{
				path: "/checkout",
				element: (
					<PrivateRoute>
						<CheckOutPage />
					</PrivateRoute>
				),
			},
			{
				path: "/success/:id",
				element: (
					<PrivateRoute>
						<SuccessPaymentPage />
					</PrivateRoute>
				),
			},
			{
				path: "/profile",
				element: (
					<PrivateRoute>
						<ProfilePage />
					</PrivateRoute>
				),
			},

			{
				path: "/books/:id",
				element: <SingleBook />,
			},
			{
				path: "/user-dashboard",
				element: (
					<PrivateRoute>
						<UserDashboard />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "/admin",
		element: <Auth />,
	},
	{
		path: "/dashboard",
		element: (
			<AdminRoute>
				<AdminLayout />
			</AdminRoute>
		),
		children: [
			{
				path: "",
				element: (
					<AdminRoute>
						<Dashboard />
					</AdminRoute>
				),
			},
			{
				path: "clients",
				element: (
					<AdminRoute>
						<UserPage />
					</AdminRoute>
				),
			},
			{
				path: "client/:id",
				element: (
					<AdminRoute>
						<UserDetailPage />
					</AdminRoute>
				),
			},
			{
				path: "inventory",
				element: (
					<AdminRoute>
						<InventoryPage />
					</AdminRoute>
				),
			},
			{
				path: "add-to-inventory",
				element: (
					<AdminRoute>
						<AddToInventory />
					</AdminRoute>
				),
			},
			{
				path: "update-inventory/:id",
				element: (
					<AdminRoute>
						<ModifyInventory />
					</AdminRoute>
				),
			},
			{
				path: "inventory-item/:id",
				element: (
					<AdminRoute>
						<InventoryDetailsPage />
					</AdminRoute>
				),
			},
			{
				path: "coupon",
				element: (
					<AdminRoute>
						<CouponPage />
					</AdminRoute>
				),
			},
			{
				path: "create-coupon",
				element: (
					<AdminRoute>
						<CreateCoupon />
					</AdminRoute>
				),
			},
			{
				path: "view-coupon/:id",
				element: (
					<AdminRoute>
						<CouponDetailsPage />
					</AdminRoute>
				),
			},
			{
				path: "update-coupon/:id",
				element: (
					<AdminRoute>
						<UpdateCoupon />
					</AdminRoute>
				),
			},
			{
				path: "orders",
				element: (
					<AdminRoute>
						<OrderPage />
					</AdminRoute>
				),
			},
			{
				path: "order-detail/:id",
				element: (
					<AdminRoute>
						<OrderDetailPage />
					</AdminRoute>
				),
			},
			{
				path: "inquiries",
				element: (
					<AdminRoute>
						<InquiryPage />
					</AdminRoute>
				),
			},
			{
				path: "inquiry-item/:id",
				element: (
					<AdminRoute>
						<InquiryDetailsPage />
					</AdminRoute>
				),
			},
			{
				path: "add-new-book",
				element: (
					<AdminRoute>
						<AddBook />
					</AdminRoute>
				),
			},
			{
				path: "edit-book/:id",
				element: (
					<AdminRoute>
						<UpdateBook />
					</AdminRoute>
				),
			},
			{
				path: "manage-books",
				element: (
					<AdminRoute>
						<ManageBooks />
					</AdminRoute>
				),
			},
		],
	},
]);

export default router;
