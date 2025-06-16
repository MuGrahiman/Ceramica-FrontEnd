import React, { useState } from "react";
import PropTypes from "prop-types";
import Toggler from "./Toggler";
import useToggle from "../hooks/useToggle";
import ListOptions from "./ListOptions";
import CoverImage from "./CoverImage";
import { handleFileError } from "../utils/fileHandler";

/**
 * Displays a product information's.
 * @param {Object} props - Component props
 * @param {string} props.productId - Unique identifier for the product (required)
 * @param {Object} props.coverImage - Primary product image {url, public_id, type}
 * @param {string} props.title - Product title
 * @param {Array} props.images - Array of product images [{url, public_id, type}]
 * @param {string} props.description - Product description (supports HTML/markdown)
 * @param {Boolean} props.showWishlist - Toggles wishlist button visibility
 * @param {Object} props.color - Color details {name, hex, image}
 * @param {number} props.price - Product price (formatted as currency)
 * @param {String} props.status - Availability status (converted to "Available"/"Out of Stock")
 */
const ProductPanel = ({
	productId = "",
	coverImage = {},
	title = "",
	category = "",
	shape = "",
	color = {},
	dimension = "",
	size = "",
	stock = 0,
	price = 0,
	status = "",
	description = "",
	images = {},
	showWishlist = false,
}) => {
	const [toggleFunction, isToggledState] = useToggle();
	const [currentCoverImage, setCurrentCoverImage] = useState(coverImage);
	const [currentImages, setCurrentImages] = useState(images);

	/**
	 * Swaps the current cover image and updates the gallery order.
	 * @param {Object} image - The new cover image to be set.
	 * @param {string} image.public_id - The unique identifier of the image.
	 * @returns {void} - This function does not return a value.
	 */
	const handleCoverImage = (image) => {
		const filteredImages = currentImages.filter(
			(img) => img.public_id !== image.public_id
		);
		const updatedImages = [currentCoverImage, ...filteredImages];
		setCurrentCoverImage(image);
		setCurrentImages(updatedImages);
	};

	const productAttributes = [
		{ valid: !!category, label: "Category", value: category },
		{ valid: !!shape, label: "Shape", value: shape },
		{
			valid: color && !!color.name && !!color.hex,
			label: "Color",
			value: (
				<span>
					{color?.name}
					<small
						className="inline-block w-4 h-4 rounded-full ml-1"
						style={{ backgroundColor: color?.hex }}
					/>
				</span>
			),
		},
		{ valid: !!dimension, label: "Dimension", value: dimension },
		{ valid: !!size, label: "Size", value: size },
		{ valid: Number.isFinite(stock), label: "Stock", value: stock },
		{ valid: Number.isFinite(price), label: "Price", value: `$${price}` },
		{
			valid: typeof status === "boolean",
			label: "Status",
			value: status ? "Available" : "Out of Stock",
		},
	];

	const validAttributes = productAttributes.filter((item) => item.valid);

	return (
		<div className=" container p-6 mx-auto">
			<div className="flex flex-col md:flex-row gap-6">
				{/* Image Gallery Section */}
				<div className="w-full md:w-1/2 mb-4">
					<div className="mb-4">
						<CoverImage
							ITEM_ID={productId}
							IMAGE={currentCoverImage}
							WIDTH="100%"
							HEIGHT="15rem"
							ON_ERROR={handleFileError}
							SHOW_WISHLIST={showWishlist}
						/>
					</div>
					<div className="flex overflow-x-auto items-center justify-evenly">
						<ListOptions
							OPTIONS={currentImages}
							RENDER_ITEM={(image, index) => (
								<img
									key={image.public_id}
									src={image.url}
									alt={`Image of ${title} - ${index + 1}`}
									loading="lazy"
									onError={handleFileError}
									onClick={() => handleCoverImage(image)}
									className="w-12 h-12 sm:w-16 sm:h-16 md:w-[3.6rem] md:h-[3.6rem] lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-cover rounded-lg m-1 shadow-sm transition-transform transform hover:scale-105 cursor-pointer max-w-full"
								/>
							)}
						/>
					</div>
				</div>

				{/* Product Details Section */}
				<div className="w-full md:w-1/2 my-auto">
					<h1 className="text-xl sm:text-3xl font-bold mb-2 text-gray-800">
						{title}
					</h1>
					<ListOptions
						OPTIONS={validAttributes}
						RENDER_ITEM={(item, index) => (
							<p key={index} className="text-gray-600 mb-1 break-words">
								<strong>{item.label}:</strong> {item.value}
							</p>
						)}
					/>
				</div>
			</div>

			{/* Description Section */}
			{!!description && (
				<div className="mb-6 w-full text-gray-600 break-words">
					<Toggler
						IS_TOG={isToggledState("productDetails")}
						TOG={() => toggleFunction("productDetails")}
						TEXT={description}
					/>
				</div>
			)}
		</div>
	);
};

ProductPanel.propTypes = {
	productId: PropTypes.string.isRequired,
	coverImage: PropTypes.shape({
		url: PropTypes.string,
		public_id: PropTypes.string,
		type: PropTypes.string,
	}),
	title: PropTypes.string,
	category: PropTypes.string,
	shape: PropTypes.string,
	color: PropTypes.shape({
		name: PropTypes.string,
		hex: PropTypes.string,
		image: PropTypes.string,
	}),
	dimension: PropTypes.string,
	size: PropTypes.string,
	stock: PropTypes.number,
	price: PropTypes.number,
	status: PropTypes.string,
	description: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string,
			public_id: PropTypes.string,
			type: PropTypes.string,
		})
	),
	showWishlist: PropTypes.bool,
};

export default ProductPanel;
