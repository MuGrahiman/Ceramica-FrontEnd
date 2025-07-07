import React from "react";

/**
 * PhilosophyStatement - Displays the company's core philosophy as a highlighted quote with decorative elements.
 *
 * Features:
 * - Decorative gradient divider at the top
 * - Responsive typography for optimal readability
 * - Semantic blockquote structure
 *
 * @returns {JSX.Element} Philosophy statement section with visual accents
 */
const PhilosophyStatement = () => {
	return (
		<section className="pt-24 relative" aria-label="Our ceramic philosophy">
			<div
				className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"
				aria-hidden="true"
			/>

			<div className="container mx-auto px-6 max-w-4xl">
				<blockquote
					className="text-2xl md:text-4xl font-serif italic text-center text-stone-700 leading-relaxed"
					lang="en">
					&ldquo;We don&rsquo;t just shape clay&nbsp;&ndash; we collaborate with
					elemental&nbsp;forces, guiding earth through fire to reveal its
					hidden&nbsp;song.&rdquo;
				</blockquote>
			</div>
		</section>
	);
};

export default PhilosophyStatement;
