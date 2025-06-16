import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { stringTrimmer } from "../utils/generals";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

/**
 * A responsive and animated read more/less toggle component that:
 * - Smoothly expands/collapses content with animations
 * - Positions the toggle button right after the text
 * - Handles responsive behavior across all screen sizes
 * - Provides customizable height and trim length
 *
 * @param {Object} props - Component props
 * @param {boolean} props.IS_TOG - Current toggle state (controlled by parent)
 * @param {string} props.TEXT - The text content to display
 * @param {function} props.TOG - Toggle handler function
 * @param {number} [props.COLLAPSED_HEIGHT=50] - Height when collapsed (in pixels)
 * @param {number} [props.TRIM_LENGTH=100] - Character limit when collapsed
 * @param {number} [props.ANIMATION_DURATION=300] - Animation duration in milliseconds
 */
const Toggler = ({
	IS_TOG = false,
	TEXT = "",
	TOG = () => {},
	COLLAPSED_HEIGHT = 50,
	TRIM_LENGTH = 100,
	ANIMATION_DURATION = 300,
}) => {
	const contentRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(`${COLLAPSED_HEIGHT}px`);

	useEffect(() => {
		if (contentRef.current) {
			// Set appropriate height based on toggle state
			setContentHeight(
				IS_TOG
					? `${contentRef.current.scrollHeight}px`
					: `${COLLAPSED_HEIGHT}px`
			);
		}
	}, [IS_TOG, TEXT, COLLAPSED_HEIGHT, TRIM_LENGTH]);

	/**
	 * Generates transition styles for smooth height animation
	 * @returns {Object} CSS transition styles
	 */
	const getTransitionStyle = () => ({
		height: contentHeight,
		transition: `height ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
		overflow: "hidden",
	});

	return (
		<div className="relative" aria-expanded={IS_TOG} aria-live="polite">
			<div
				ref={contentRef}
				style={{ ...getTransitionStyle(), willChange: "height" }}>
				<p className="text-gray-700 mb-2">
					{IS_TOG
						? TEXT
						: `${stringTrimmer(TEXT, TRIM_LENGTH)}
            ${TEXT?.length > TRIM_LENGTH ? "..." : " "}
            `}

					{TEXT?.length > TRIM_LENGTH && (
						<button
							onClick={(e) => {
								e.preventDefault();
								TOG();
							}}
							className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none 
                text-sm font-medium transition-colors duration-200"
							aria-expanded={IS_TOG}
							aria-label={IS_TOG ? "Show less content" : "Show more content"}>
							<span className="flex items-center justify-center">
								{IS_TOG ? (
									<>
										<span>Read Less</span>
										<IoIosArrowUp className="ml-1" />
									</>
								) : (
									<>
										<span>Read More</span>
										<IoIosArrowDown className="ml-1" />
									</>
								)}
							</span>
						</button>
					)}
				</p>
			</div>
		</div>
	);
};

Toggler.propTypes = {
	IS_TOG: PropTypes.bool.isRequired,
	TEXT: PropTypes.string.isRequired,
	TOG: PropTypes.func.isRequired,
	COLLAPSED_HEIGHT: PropTypes.number,
	TRIM_LENGTH: PropTypes.number,
	ANIMATION_DURATION: PropTypes.number,
};

export default React.memo(Toggler);
