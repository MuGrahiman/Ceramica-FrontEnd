import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import logo from "../assets/logo/logo.png";

// const BrandLogo = ({
// 	imageSize = 50,
// 	titleColor = "text-gray-800",
// 	subtitleColor = "text-gray-600",
// }) => {
// 	return (
// 		<Link
// 			to="/"
// className="inline-flex items-center gap-4 p-4 h-20 rounded-lg  shadow-lg hover:shadow-xl transition-shadow duration-300"

// 			className="inline-flex items-center rounded-lg bg-transparent   transition-shadow duration-300">
// 			<img
// 				src={logo}
// 				width={imageSize}
// 				height={imageSize}
// 				alt="Logo"
// 				className="rounded-full"
// 			/>
// 			<span className="flex flex-col text-start">
// 				<h1
// 					className={`font-serif text-2xl font-bold ${titleColor} leading-none`}>
// 					CERAMICA
// 				</h1>
// 				<small className={`text-sm ${subtitleColor} leading-none`}>
// 					Tableware's
// 				</small>
// 			</span>
// 		</Link>
// 	);
// };

// export default BrandLogo;

/**
 * LogoLink Component
 * Displays a clickable logo with a title and subtitle.
 *
 * Props:
 * @param {string} logo - The URL of the logo image.
 * @param {number} imageSize - The size (width & height) of the logo image.
 * @param {string} titleColor - Tailwind color class for the title.
 * @param {string} subtitleColor - Tailwind color class for the subtitle.
 */
const LogoLink = ({
	imageSize = 50,
	titleColor = "text-gray-800",
	subtitleColor = "text-gray-600",
}) => {
	return (
		<Link
			to="/"
			className="inline-flex items-center rounded-lg bg-transparent   transition-shadow duration-300">
			<LogoImage src={logo} size={imageSize} />
			<LogoText
				title="Ceramica"
				subtitle="Tableware's"
				titleColor={titleColor}
				subtitleColor={subtitleColor}
			/>
		</Link>
	);
};

const LogoImage = ({ src, size }) => (
	<img
		src={src || "default-logo.png"}
		width={size}
		height={size}
		alt="Logo"
		className="rounded-full"
	/>
);

const LogoText = ({ title, subtitle, titleColor, subtitleColor }) => (
	<span className="flex flex-col">
		<h1 className={`font-serif text-2xl font-bold ${titleColor} leading-none`}>
			{title}
		</h1>
		<small className={`text-sm ${subtitleColor} leading-none`}>
			{subtitle}
		</small>
	</span>
);

// PropTypes for type validation
LogoLink.propTypes = {
	logo: PropTypes.string,
	imageSize: PropTypes.number,
	titleColor: PropTypes.string,
	subtitleColor: PropTypes.string,
};

LogoImage.propTypes = {
	src: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
};

LogoText.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	titleColor: PropTypes.string.isRequired,
	subtitleColor: PropTypes.string.isRequired,
};

export default LogoLink;
