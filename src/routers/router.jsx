import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Auth from "../pages/auth/Auth";
// import Login from "../components/Login";
// import Register from "../components/Register";
// import Auth from "../components/Auth";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import OTP from "../pages/auth/OTP";
import Mail from "../pages/auth/Mail";
import AdminLayout from "../components/AdminLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			// {
			// 	path: "/demo",
			// 	element: <UserLogin/>,
			// },
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
			},{
				path: "/mail",
				element: <Mail />,
			},
			{
				path: "/otp/:userId",
				element: <OTP />,
			},
			{
				path: "/about",
				element: <div>About</div>,
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
						<CheckoutPage />
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
