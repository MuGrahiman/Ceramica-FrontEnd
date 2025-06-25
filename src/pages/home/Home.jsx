// import React from 'react'
// import Banner from './Banner'
// import TopSellers from './TopSellers'
// import Recommend from './Recommend'
// import News from './News'

// const Home = () => {
//   return (
//     <>
//         <Banner/>
//         <TopSellers/>
//         <Recommend/>
//         <News/>
//     </>
//   )
// }

// export default Home

import { useState, useEffect } from "react";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import FeaturedProducts from "./FeaturedProducts";
import LegacySection from "./LegacySection";
import SubscribeSection from "./SubscribeSection";
import FooterSection from "./FooterSection";
import CraftsmanshipSection from "./CraftsmanshipSection";
import TopSellers from "./TopSellers";
import News from "./News";
import Recommend from "./Recommend";
import Banner from "./Banner";
import CallToAction from "../about/CallToAction";
import { DUMMY_IMAGE, FALL_BACK_IMAGE } from "../../constants/app";
import UniqueSellingPoints from "../about/UniqueSellingPoints";
import useIntervalSlider from "../../hooks/useIntervalSlider";
import StatsBar from "./StatsBar";

const Home = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrollY, setScrollY] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
	};

	const heroSlides = [
		{
			title: "Handcrafted Elegance",
			subtitle: "Discover our artisan ceramic collection",
			image:
				"https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			cta: "Shop Now",
			bgColor: "bg-amber-50",
		},
		{
			title: "New Arrivals",
			subtitle: "Fresh from the kiln - limited editions",
			image:
				"https://images.unsplash.com/photo-1677761640321-b80251be00ca?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			cta: "Explore",
			bgColor: "bg-stone-100",
		},
		{
			title: "Tableware Sets",
			subtitle: "Complete your dining experience",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			cta: "View Collection",
			bgColor: "bg-teal-50",
		},
	];
	const [currentSlide, setCurrentSlide] = useIntervalSlider(
		heroSlides.length,
		2000
	);

	const categories = [
		{
			name: "Dinnerware Sets",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			count: 42,
		},
		{
			name: "Mugs & Cups",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			count: 36,
		},
		{
			name: "Teapots & Kettles",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			count: 28,
		},
		{
			name: "Bowls & Plates",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			count: 51,
		},
		{
			name: "Decorative Pieces",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			count: 23,
		},
		{
			name: "Jugs & Jars",
			image:
				"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			count: 19,
		},
	];

	const featuredProducts = [
		{
			_id: "1", // Changed to string as required by prop types
			title: "Artisan Mug Set",
			description:
				"A beautifully crafted mug set perfect for your morning coffee.",
			price: 45.0,
			stock: 10, // Example stock quantity
			coverImage: {
				url: "https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			_id: "2", // Changed to string
			title: "Porcelain Tea Set",
			description: "Elegant porcelain tea set for a delightful tea experience.",
			price: 89.0,
			stock: 5, // Example stock quantity
			coverImage: {
				url: "https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			_id: "3", // Changed to string
			title: "Hand-painted Bowl",
			description:
				"A unique hand-painted bowl that adds character to any table.",
			price: 32.5,
			stock: 15, // Example stock quantity
			coverImage: {
				url: "https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
		{
			_id: "4", // Changed to string
			title: "Stoneware Platter",
			description:
				"Sturdy stoneware platter ideal for serving your favorite dishes.",
			price: 55.0,
			stock: 8, // Example stock quantity
			coverImage: {
				url: "https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		},
	];

	const aboutData = {
		stats: [
			{ value: "36", label: "Years of Craftsmanship" },
			{ value: "12", label: "Master Artisans" },
			{ value: "200+", label: "Unique Glaze Recipes" },
			{ value: "10K+", label: "Pieces Created" },
		],
	};
	return (
		<div className="font-sans text-stone-800">
			{/* Hero Section */}
			<Wrapper>
				<Slider
					currentSlide={currentSlide}
					heroSlides={heroSlides}
					nextSlide={nextSlide}
					prevSlide={prevSlide}
					setCurrentSlide={setCurrentSlide}
				/>
			</Wrapper>
			<StatsBar aboutData={aboutData} />
			{/* Category Section */}
			<Wrapper isWhite>
				<CategorySection categories={categories} />
			</Wrapper>
			<Wrapper>
				{/* Featured Products at a glance */}
				<FeaturedProducts featuredProducts={featuredProducts} />
			</Wrapper>

			<Wrapper isWhite>
				<section className=" flex flex-col md:flex-row items-center justify-evenly">
					{/* <div className="py-16  container mx-auto  "> */}
					<div className="my-9 relative  h-96 overflow-hidden  w-full md:w-1/3 ">
						{[
							"https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							DUMMY_IMAGE,
							FALL_BACK_IMAGE,
						].map((slide, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center  ${
									index === currentSlide
										? "opacity-100 "
										: "opacity-0 pointer-events-none"
								}`}>
								<img
									src={slide}
									alt={slide.title}
									className="max-h-[70vh] object-contain rounded-lg shadow-xl "
								/>
							</div>
						))}
					</div>
					<div className="md:w-1/3  ">
						<CallToAction />
					</div>
					{/* </div> */}
				</section>
			</Wrapper>
			<Wrapper>
				<UniqueSellingPoints />
			</Wrapper>

			{/* <CraftsmanshipSection /> */}

			{/* Legacy Section */}
			<Wrapper isWhite>
				<LegacySection aboutData={aboutData} />
			</Wrapper>
			{/* Subscribe Section */}
			<Wrapper>
				<SubscribeSection />
			</Wrapper>

			{/* Footer */}
			{/* <FooterSection /> */}
		</div>
	);
};

export default Home;

const Wrapper = ({ isWhite = false, children }) => (
	<section className={`${isWhite ? "bg-white" : " bg-transparent"} `}>
		<div className="max-w-7xl container mx-auto py-12 px-4 sm:px-6 lg:px-8">
			{children}
		</div>
	</section>
);
