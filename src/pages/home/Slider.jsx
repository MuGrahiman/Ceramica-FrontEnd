import React from "react";

const Slider = ({ heroSlides, currentSlide, setCurrentSlide }) => {
	let animate = 0;
	const getAnimation = (index) => {
		if (animate === 0) {
			animate = 1;
		} else {
			animate = 0;
		}
		const animations = ["animate-slide-in-left", "animate-slide-in-right"];
		return animations[animate];
	};
	return (
		<section className="relative h-screen lg:h-[30rem] overflow-hidden ">
			{heroSlides.map((slide, index) => (
				<div
					key={index}
					className={`absolute inset-0 transition-opacity duration-1000 flex flex-col-reverse lg:flex-row items-center justify-evenly lg:justify-between ${
						index === currentSlide
							? `opacity-100 `
							: "opacity-0 pointer-events-none"
					}`}>
					{/* <div className=" flex flex-col md:flex-row items-center justify-between"> */}
					<div className="mx-auto mb-10 md:mb-0 ">
						<h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
							{slide.title}
						</h1>
						<p className="text-xl md:text-2xl mb-8 text-stone-600">
							{slide.subtitle}
						</p>
						<button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg">
							{slide.cta}
						</button>
					</div>
					<img
						src={slide.image}
						alt={slide.title}
						className="max-h-[70vh] mx-auto my-12 object-contain rounded-lg shadow-xl"
					/>
				</div>
			))}

			{/* Hero Indicators */}
			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
				{heroSlides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`w-3 h-3 rounded-full transition-all ${
							index === currentSlide ? "bg-amber-700 w-6" : "bg-white"
						}`}
					/>
				))}
			</div>
		</section>
	);
};

export default Slider;
