import React from "react";
import PropTypes from "prop-types";

const HeroSection = ({
	title,
	subtitle,
	backgroundImage,
	buttonText,
	buttonLink,
}) => {
	return (
		<div
			className="relative w-full h-64 md:h-96 bg-cover bg-center"
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
			<div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4 animate-fade-in">
				<h1 className="text-3xl md:text-5xl  font-bold  mb-6 animate-slide-down">
					{title}
				</h1>
				<p
					className="mt-2 text-lg md:text-xl
                 max-w-3xl mx-auto animate-slide-up">
					{subtitle}
				</p>
				{buttonText && buttonLink && (
					<a
						href={buttonLink}
						className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
						{buttonText}
					</a>
				)}
			</div>
		</div>
	);
};

HeroSection.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	backgroundImage: PropTypes.string,
	buttonText: PropTypes.string,
	buttonLink: PropTypes.string,
};

export default HeroSection;
