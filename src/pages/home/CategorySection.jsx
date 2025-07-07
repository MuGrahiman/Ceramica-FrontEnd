import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";

/**
 * CategorySection - Infinite horizontal scrolling category display with smooth animations.
 *
 * @returns {JSX.Element} A visually appealing category carousel section
 */
const CategorySection = ({ categories = [] }) => {
	const [currentPosition, setCurrentPosition] = useState(0);
	const duplicatedCategories = [...categories, ...categories];

	// Auto-scrolling effect
	useEffect(() => {
		const scrollSpeed = 0.5;
		const updateInterval = 20;

		const interval = setInterval(() => {
			setCurrentPosition((prev) => {
				const itemWidth = 200;
				const scrollLimit = categories.length * itemWidth;

				// Reset position when reaching the duplicated section
				return prev >= scrollLimit ? 0 : prev + scrollSpeed;
			});
		}, updateInterval);

		return () => clearInterval(interval);
	}, [categories.length]);

	return (
		<section className="py-16 bg-white overflow-hidden">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-serif font-bold text-center mb-12">
					Shop by Category
				</h2>

				{/* Scrolling container */}
				<div className="relative h-64">
					<div
						className="flex absolute left-0 gap-4"
						style={{
							transform: `translateX(-${currentPosition}px)`,
							transition: "transform 0.1s linear",
							width: `${duplicatedCategories.length * 200}px`,
						}}
						aria-label="Product categories carousel">
						<ListOptions
							OPTIONS={duplicatedCategories}
							RENDER_ITEM={(category, index) => (
								<CategoryCard
									key={`clone-${category.name}-${index}`}
									index={index}
									{...category}
								/>
							)}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

// Extracted card component for better readability
const CategoryCard = ({ index = 0, name = "", count = 0, image = "" }) => (
	<div
		className="w-48 h-64 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500"
		role="group"
		aria-label={`${name} category with ${count} items`}>
		{/* Category image */}
		<img
			src={image}
			alt={name}
			className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
			loading={index < 3 ? "eager" : "lazy"}
		/>

		{/* Overlay with category info */}
		<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex flex-col justify-end p-4">
			<h3 className="text-white font-bold text-lg">{name}</h3>
			<p className="text-white/90 text-sm">{count} items</p>
		</div>
	</div>
);
// PropTypes for the category card
CategoryCard.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
};
// PropTypes for the category data structure
CategorySection.propTypes = {
	categories: PropTypes.array.isRequired,
};

export default CategorySection;
