import React from "react";
import PropTypes from "prop-types";

// Static size configurations (better performance)
const SIZE_CLASSES = {
    sm: {
        svg: "h-14 w-14",
        container: "h-20",
        text: {
            line1: "w-24 h-1 rounded",
            line2: "w-20 h-1 rounded", 
            line3: "w-full h-1 rounded",
        },
    },
    md: {
        svg: "h-16 w-16",
        container: "h-28",
        text: {
            line1: "w-32 h-2.5 rounded",
            line2: "w-28 h-2 rounded",
            line3: "w-24 h-2 rounded",
        },
    },
    lg: {
        svg: "h-20 w-20",
        container: "h-36", 
        text: {
            line1: "w-1/2 h-2.5 rounded",
            line2: "w-full h-2.5 rounded",
            line3: "w-1/3 h-2.5 rounded",
        },
    },
};

/**
 * Loading skeleton component with flexible sizing and optional image placeholder.
 * 
 * @param {Object} props
 * @param {boolean} [props.isSvg] - Whether to include SVG image placeholder
 * @param {'sm'|'md'|'lg'} [props.size] - Size variant of the skeleton
 */
const Skeleton = ({ isSvg = false, size = "md" }) => {
    const currentSize = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    return (
        <div
            role="status"
            className={`
                animate-pulse 
                flex flex-col md:flex-row md:items-center 
                gap-4 p-6
                ${currentSize.container}
            `}
            aria-live="polite"
            aria-label="Loading content"
        >
            {/* SVG Image Placeholder */}
            {isSvg && (
                <div
                    className={`
                        flex items-center justify-center 
                        rounded bg-gray-300 dark:bg-gray-700
                        ${currentSize.svg}
                    `}
                    aria-hidden="true"
                >
                    <svg
                        className={`text-gray-200 dark:text-gray-600 ${currentSize.svg}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
            )}

            {/* Text Content Placeholder */}
            <div className="flex-1 space-y-3">
                <div 
                    className={`bg-gray-200 dark:bg-gray-700 ${currentSize.text.line1} mb-2`}
                ></div>
                <div 
                    className={`bg-gray-200 dark:bg-gray-700 ${currentSize.text.line2} mb-2`}
                ></div>
                <div 
                    className={`bg-gray-200 dark:bg-gray-700 ${currentSize.text.line3}`}
                ></div>
            </div>

            {/* Screen Reader Only */}
            <span className="sr-only">
                Loading content... {isSvg ? "with image placeholder" : ""}
            </span>
        </div>
    );
};

Skeleton.propTypes = {
    isSvg: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Skeleton;