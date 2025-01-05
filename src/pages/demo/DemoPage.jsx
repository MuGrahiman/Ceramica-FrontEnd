import React, { useState } from "react";
import ProductPanel from "../../components/ProductPanel";

function DemoPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const sampleProduct = {
		title: "Sample Product",
		description:
			"This is a description of the sample product.Et adipisicing in duis mollit dolore sint. Tempor aliquip incididunt non cupidatat laborum cillum voluptate anim. Sit veniam esse nulla esse quis laborum voluptate incididunt magna anim. Magna id dolor quis cillum sint tempor et commodo consequat. Culpa sit consequat nisi qui qui cillum.",
		category: "Electronics",
		shape: "Rectangular",
		color: {
			name: "Red",
			hex: "#FF0000",
			image: "path/to/color-image.jpg",
		},
		dimension: "10x5x2 inches",
		size: "Medium",
		stock: 50,
		price: 29.99,
		status: true,
		coverImage: {
			public_id: "cover_image_id",
			url: "https://images.unsplash.com/photo-1525974160448-038dacadcc71?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			type: "image/jpeg",
		},
		images: [
			{
				public_id: "image1_id",
				url: "https://images.unsplash.com/photo-1601430727739-4150d4568f20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "image/jpeg",
			},
			{
				public_id: "image1_id",
				url: "https://images.unsplash.com/photo-1601430727739-4150d4568f20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "image/jpeg",
			},
			{
				public_id: "image1_id",
				url: "https://images.unsplash.com/photo-1601430727739-4150d4568f20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "image/jpeg",
			},
			{
				public_id: "image1_id",
				url: "https://images.unsplash.com/photo-1601430727739-4150d4568f20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "image/jpeg",
			},
			{
				public_id: "image1_id",
				url: "https://images.unsplash.com/photo-1601430727739-4150d4568f20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				type: "image/jpeg",
			},
			// Add more images as needed
		],
		createdAt: new Date(),
	};

	return (
		<section className="bg-white shadow-lg rounded-lg">
			<ProductPanel product={sampleProduct} />
			<div className="flex items-center justify-between gap-5 p-6 text-white ">
				<button className="w-full p-3 rounded-md bg-lime-600 hover:bg-lime-700 text-sm sm:text-base hover:text-base hover:font-bold">
					Wishlist
				</button>
				<button className="w-full p-3 rounded-md bg-yellow-400 hover:bg-yellow-500 text-sm sm:text-base hover:text-base hover:font-bold">
					Add to cart
				</button>
				<button className="w-full p-3 rounded-md bg-orange-600 hover:bg-orange-700 text-sm sm:text-base hover:text-base hover:font-bold">
					BuyNow
				</button>
			</div>
		</section>
	);
}

export default DemoPage;
