import { useEffect, useState } from "react";

const CategorySection = () => {
	const [currentPosition, setCurrentPosition] = useState(0);

	// Updated categories with separate items and proper images
	const categories = [
		{
			name: "Cups",
			image:
				"https://images.unsplash.com/photo-1560847975-9e3d66d1b3b2?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 42,
		},
		{
			name: "Kettle",
			image:
				"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 18,
		},
		{
			name: "Plates",
			image:
				"https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 36,
		},
		{
			name: "Bowls",
			image:
				"https://images.unsplash.com/photo-1585238342020-15d6e7e7ab0a?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 28,
		},
		{
			name: "Jars",
			image:
				"https://images.unsplash.com/photo-1604176354204-92669b0ff5bd?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 24,
		},
		{
			name: "Jugs",
			image:
				"https://images.unsplash.com/photo-1605000797499-95e51c9bdc5f?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 15,
		},
		{
			name: "Mugs",
			image:
				"https://images.unsplash.com/photo-1597822738124-151fb72dcb79?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 32,
		},
		{
			name: "Saucer",
			image:
				"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 27,
		},
		{
			name: "Decorates",
			image:
				"https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
			count: 19,
		},
	];

	// Duplicate the categories to create seamless loop
	const duplicatedCategories = [...categories, ...categories];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPosition((prev) => {
				// Reset position when we've scrolled through one full set
				if (prev >= categories.length * 200) {
					return 0;
				}
				return prev + 0.5; // Adjust speed here
			});
		}, 20);

		return () => clearInterval(interval);
	}, [categories.length]);

	return (
		<section className="py-16 bg-white overflow-hidden">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-serif font-bold text-center mb-12">
					Shop by Category
				</h2>

				<div className="relative h-64">
					<div
						className="flex absolute left-0 gap-4"
						style={{
							transform: `translateX(-${currentPosition}px)`,
							transition: "transform 0.1s linear",
							width: `${duplicatedCategories.length * 200}px`,
						}}>
						{duplicatedCategories.map((category, index) => (
							<div
								key={`${category.name}-${index}`}
								className="w-48 h-64 group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
								<img
									src={category.image}
									alt={category.name}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex flex-col justify-end p-4">
									<h3 className="text-white font-bold text-lg">
										{category.name}
									</h3>
									<p className="text-white/90 text-sm">
										{category.count} items
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CategorySection;
