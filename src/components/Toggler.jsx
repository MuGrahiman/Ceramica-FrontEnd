import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { stringTrimmer } from "../utils/generals";

const Toggler = ({ IS_TOG, TEXT, TOG }) => {
	const normalHeight = '70px'
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(normalHeight); // Start collapsed

    // Set the height based on whether it's toggled or not
    useEffect(() => {
        if (IS_TOG) {
            // Expand and set height to the scroll height of the content
            setContentHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            // Collapse to 0
            setContentHeight(normalHeight);
        }
    }, [IS_TOG]);

    return (
        <div className="mb-4 overflow-hidden transition-height duration-700 ease-out">
            {/* Container for the collapsing content with dynamic height */}
            <div
                ref={contentRef}
                style={{ height: contentHeight }}
                className="transition-height duration-700 ease-out"
            >
                <p className="text-gray-700 mb-2">
				{IS_TOG ? TEXT : `${stringTrimmer(TEXT, 100)}...`}
                </p>
            </div>
            <button
                onClick={TOG}
                className="text-blue-500 hover:text-blue-700 focus:outline-none transition-opacity duration-300 ease-in-out">
                {IS_TOG ? "Read Less" : "Read More"}
            </button>
        </div>
    );
};

Toggler.propTypes = {
    IS_TOG: PropTypes.bool.isRequired,
    TOG: PropTypes.func.isRequired,
    TEXT: PropTypes.string.isRequired,
};

export default Toggler;
