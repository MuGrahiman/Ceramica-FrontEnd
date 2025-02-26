import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvide } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import LoadingTemplate from "./components/LoadingTemplate";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		// Cleanup timer
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return (
			<div className="container min-h-screen flex justify-center items-center">
				<LoadingTemplate />
			</div>
		);
	}
	//FBF8F1 ,FFFBE9 ,FAFDD6 cowdung,FEFBE7,FCF8E8
	return (
		<>
			<AuthProvide>
				<Header />
				<main className="min-h-screen max-w-screen-2xl mx-auto  font-primary">
					<Outlet />
				</main>
				<Footer />
			</AuthProvide>
		</>
	);
}

export default App;
