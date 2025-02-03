import React, { useState } from "react";
import PropTypes from "prop-types";
import Toggler from "./Toggler";
import useToggle from "../hooks/useToggle";
import ListOptions from "./ListOptions";
import fallBackImage from "../assets/defualtimage.png";
import CoverImage from "./CoverImage";
const ProductPanel = ({
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
}) => {
	const [toggle, isToggled] = useToggle();
	const [currentCoverImage, setCurrentCoverImage] = useState(coverImage);
	const [currentImages, setCurrentImages] = useState(images);

	const handleCoverImage = (image) => {
		const filteredImages = currentImages.filter(
			(img) => img.public_id !== image.public_id
		);
		const updatedImages = [currentCoverImage, ...filteredImages];
		setCurrentCoverImage(image);
		setCurrentImages(updatedImages);
	};

	const handleImageError = (e) => {
		e.target.src = fallBackImage;
	};

	const rightSideContent = [
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
		{
			valid: !!description,
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

	const validContent = rightSideContent.filter((item) => item.valid);

	return (
		<div className="w-full md:flex p-6 gap-6">
			{/* Left Side: Images Showcase */}
			<div className="w-1/2 mb-4">
				<div className="mb-4">
					<CoverImage
						IMAGE={currentCoverImage}
						WIDTH={"100%"}
						HEIGHT={"15rem"}
						ON_ERROR={handleImageError}
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
								onError={handleImageError}
								onClick={() => handleCoverImage(image)}
								className="w-12 h-12 sm:w-16 sm:h-16 md:w-[3.6rem] md:h-[3.6rem] lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-cover rounded-lg m-1 shadow-sm transition-transform transform hover:scale-105 cursor-pointer"
							/>
						)}
					/>
				</div>
			</div>

			{/* Right Side: Product Details */}
			<div className="w-1/2">
				<h1 className="text-3xl font-bold mb-2 text-gray-800">{title}</h1>
				<ListOptions
					OPTIONS={validContent}
					RENDER_ITEM={(item, index) => (
						<p key={index} className="text-gray-600 mb-1 ">
							<strong>{item.label}:</strong> {item.value}
						</p>
					)}
				/>
			</div>
		</div>
	);
};

// Define prop types for the individual data
ProductPanel.propTypes = {
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
};

export default ProductPanel;
