import React from "react";
import Toggler from "./Toggler";
import useHandleToggle from "../hooks/useToggle";
import ListOptions from "./ListOptions";

const ProductPanel = ({ product }) => {
	const {
		coverImage,
		title,
		category,
		shape,
		color,
		dimension,
		size,
		stock,
		price,
		status,
		description,
		images,
	} = product;

	const [toggle, isToggled] = useHandleToggle();

	// Define the right side content as an array of objects
	const rightSideContent = [
		{ label: "Category", value: category },
		{ label: "Shape", value: shape },
		{
			label: "Color",
			value: (
				<span>
					{color.name}
					<small
						className="inline-block w-4 h-4 rounded-full ml-1"
						style={{ backgroundColor: color.hex }}
					/>
				</span>
			),
		},
		{ label: "Dimension", value: dimension },
		{ label: "Size", value: size },
		{ label: "Stock", value: stock },
		{ label: "Price", value: `$${price}` },
		{ label: "Status", value: status ? "Available" : "Out of Stock" },
		{
			label: "Description",
			value: (
				<Toggler
					IS_TOG={isToggled("productDetails")}
					TOG={() => toggle("productDetails")}
					TEXT={description}
				/>
			),
		},
	];

	return (
		<div className="w-full md:flex p-6 gap-6">
			{/* Left Side: Images Showcase */}
			<div className="w-full mb-4">
				<div className="mb-4">
					<img
						src={coverImage.url}
						alt={coverImage.public_id}
						className="w-full h-70 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
					/>
				</div>
				<div className="flex overflow-x-auto items-center justify-evenly">
					<ListOptions
						OPTIONS={images}
						RENDER_ITEM={(image, index) => (
							<img
								key={index}
								src={image.url}
								alt={`Product Image ${index + 1}`}
								className="w-12 h-12 sm:w-16 sm:h-16 md:w-[3.6rem] md:h-[3.6rem] lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-cover rounded-lg m-1 shadow-sm transition-transform transform hover:scale-105"
							/>
						)}
					/>
				</div>
			</div>

			{/* Right Side: Product Details */}
			<div className="w-full">
				<h1 className="text-3xl font-bold mb-2 text-gray-800">{title}</h1>
				<ListOptions
					OPTIONS={rightSideContent}
					RENDER_ITEM={(item, index) => (
						<p key={index} className="text-gray-600 mb-1">
							<strong>{item.label}:</strong> {item.value}
						</p>
					)}
				/>
			</div>
		</div>
	);
};

export default ProductPanel;

// <p className="text-gray-600 mb-1">
// <strong>Category:</strong> {product.category}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Shape:</strong> {product.shape}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Color:</strong> {product.color.name}
// <span
// 	className="inline-block w-4 h-4 rounded-full ml-1"
// 	style={{ backgroundColor: product.color.hex }}></span>
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Dimension:</strong> {product.dimension}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Size:</strong> {product.size}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Stock:</strong> {product.stock}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Price:</strong> ${product.price}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Status:</strong>{" "}
// {product.status ? "Available" : "Out of Stock"}
// </p>
// <p className="text-gray-600 mb-1">
// <strong>Description:</strong>{" "}
// <Toggler
// 	IS_TOG={isToggled("productDetails")}
// 	TOG={() => toggle("productDetails")}
// 	TEXT={product.description}
// />
// </p>
