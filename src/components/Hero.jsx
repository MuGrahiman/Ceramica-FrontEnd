import React from "react";
import PropTypes from "prop-types";
import AnimatedH1 from "./AnimatedH1";

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
				<AnimatedH1 title={title} />
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
