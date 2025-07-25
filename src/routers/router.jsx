import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import UserLoginPage from "../pages/auth/UserLoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminLoginPage from "../pages/auth/AdminLoginPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import OtpPage from "../pages/auth/OtpPage";
import MailPage from "../pages/auth/MailPage";
import AdminLayout from "../components/AdminLayout";
import DemoPage from "../pages/demo/DemoPage";
import AddToInventory from "../pages/inventory/AddToInventory";
import ModifyInventory from "../pages/inventory/UpdateInventory";
import InventoryDetailsPage from "../pages/inventory/InventoryDetailsPage";
import ProductPage from "../pages/shop/ProductPage";
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
import PasswordPage from "../pages/auth/PasswordPage";
import WishlistPage from "../pages/wishlist/WishlistPage";
import UserOrderPage from "../pages/order/UserOrderPage";
import UserOrderDetailsPage from "../pages/order/UserOrderDetailsPage";
import ProductDetailsPage from "../pages/shop/ProductDetailsPage";

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
				element: <RegisterPage />,
			},
			{
				path: "/login",
				element: <UserLoginPage />,
			},
			{
				path: "/verify-mail",
				element: <MailPage />,
			},
			{
				path: "/reset-password/:token",
				element: <PasswordPage />,
			},
			{
				path: "/otp/:userId",
				element: <OtpPage />,
			},
			{
				path: "/shop",
				element: <ProductPage />,
			},
			{
				path: "/shop/:id",
				element: (
					<PrivateRoute>
						<ProductDetailsPage />
					</PrivateRoute>
				),
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
			{
				path: "/cart",
				element: (
					<PrivateRoute>
						<CartPage />
					</PrivateRoute>
				),
			},
			{
				path: "/orders",
				element: (
					<PrivateRoute>
						<UserOrderPage />
					</PrivateRoute>
				),
			},
			{
				path: "/order/:id",
				element: (
					<PrivateRoute>
						<UserOrderDetailsPage />
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
				path: "/wishlist",
				element: (
					<PrivateRoute>
						<WishlistPage />
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
		element: <AdminLoginPage />,
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
