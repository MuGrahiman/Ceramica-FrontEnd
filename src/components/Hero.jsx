import React from 'react';

const HeroSection = ({ title, subtitle, backgroundImage, buttonText, buttonLink }) => {
    return (
        <div
            className="relative w-full h-64 md:h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
            <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4">
                <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
                <p className="mt-2 text-lg md:text-xl">{subtitle}</p>
                {buttonText && buttonLink && (
                    <a
                        href={buttonLink}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
