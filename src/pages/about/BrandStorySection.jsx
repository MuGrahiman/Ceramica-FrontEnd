import React from "react";
import PropTypes from "prop-types";

/**
 * BrandStorySection - Displays the company's origin story with an image
 * 
 * @param {string} image - Image URL for the brand story
 */
const BrandStorySection = ({ image }) => (
  <section className="my-20 flex flex-col lg:flex-row items-center gap-12">
    <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
      <img
        src={image}
        alt="Ceramic artisan at work"
        className="w-full h-auto object-cover"
      />
    </div>
    <div className="lg:w-1/2">
      <h2 className="text-3xl font-bold text-blue-950 mb-6">The Art of Ceramics</h2>
      <p className="text-blue-950 mb-4">
        Founded in 2015, our studio began as a small collective of ceramic
        artists passionate about bringing functional art to everyday dining.
      </p>
      <p className="text-blue-950 mb-4">
        Each piece in our collection is thoughtfully designed to elevate
        your dining experience while maintaining the warmth and
        authenticity of handcrafted ceramics.
      </p>
    </div>
  </section>
);

BrandStorySection.propTypes = {
  image: PropTypes.string.isRequired,
};

export default BrandStorySection;