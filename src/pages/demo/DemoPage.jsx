import React, { useState } from "react";
import OrderList from "../order/OrderList";
import UserOrderPage from "../order/UserOrderPage";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import Dashboard from "../dashboard/Dashboard";
import DropdownMenu from "../../components/DropdownMenu";
import { FiChevronDown } from "react-icons/fi";

// Now you can use the coupons array

function DemoPage() {
	const [selectedCategory, setSelectedCategory] = useState("mugs");
	const [isOpen, setIsOpen] = useState(false);

	const categories = [
		{ value: "dinnerware", label: "Dinnerware Sets" },
		{ value: "mugs", label: "Coffee Mugs" },
		{ value: "bowls", label: "Serving Bowls" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "plates", label: "Decorative Plates" },
		{ value: "vases", label: "Ceramic Vases" },
	];

	return (
		<div className="container mx-auto w-1/4">
			<div className="relative w-full">
				{/* Dropdown Trigger */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					// disabled={disabled}
					className={`
          w-full px-4 py-3 text-left bg-white border-2 rounded-xl 
          transition-all duration-300 ease-out
          ${
						isOpen
							? "border-amber-400 shadow-lg shadow-amber-100"
							: "border-gray-300 hover:border-amber-300 hover:shadow-md"
					}
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50
        `}>
					<div className="flex items-center justify-between">
						<span
							className={`truncate ${
								!selectedCategory ? "text-gray-400" : "text-gray-800"
							}`}>
							{selectedCategory?.label}
						</span>
						<FiChevronDown
							className={`
              h-5 w-5 transition-transform duration-300
              ${
								isOpen ? "transform rotate-180 text-amber-600" : "text-gray-400"
							}
            `}
						/>
					</div>
				</button>

				<DropdownMenu
					options={categories}
					selectedValue={selectedCategory}
					onSelect={(option) => setSelectedCategory(option.value)}
					placeholder="Choose product category"
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					renderKey={(option) => option.label}
					renderValue={(option) => option.value}
					isOptionSelected={(option) => option.value === selectedCategory}
				/>
			</div>
		</div>
	);
}

export default DemoPage;
