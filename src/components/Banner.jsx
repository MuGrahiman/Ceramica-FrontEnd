import React from 'react';

const Banner = ({ title, subtitle, buttonText, buttonLink, backgroundImage }) => {
  return (
    <div
      className="relative bg-center bg-cover h-[400px] flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative text-center text-white px-4">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2">
          {title}
        </h1>
        <p className="text-lg mb-4">{subtitle}</p>
        <a
          href={buttonLink}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-200"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default Banner;
