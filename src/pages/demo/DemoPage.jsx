import React, { useState } from "react";

function DemoPage({ children }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<section className="flex  overflow-hidden">
			
			<main
				className={`flex-grow p-6 sm:p-10 space-y-6 overflow-y-auto ${
					isSidebarOpen ? "hidden sm:block" : "block"
				}`}>
			
				{/* {children} */}
			</main>
		</section>
	);
}

export default DemoPage;
