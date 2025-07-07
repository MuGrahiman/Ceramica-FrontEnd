import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // or use Next.js Link if applicable
import CountUpNumber from "../../components/CountUpNumber";
import ListOptions from "../../components/ListOptions";
import { FALL_BACK_IMAGE } from "../../constants/app";

/**
 * LegacySection - Displays the company's legacy with stats and historical context.
 *
 * @param {Object} props - Component props
 * @param {Array<{value: number, label: string}>} props.legacyStats - Statistics to display
 * @param {Array<string>} props.storyParagraphs - Legacy narrative paragraphs
 * @returns {JSX.Element} Legacy section with image and stats
 */
const LegacySection = ({ legacyStats = [], storyParagraphs = "" }) => {
	return (
		<section aria-labelledby="legacy-heading" className=" text-stone-800">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center gap-12">
					{/* Visual Element */}
					<div className="md:w-2/5">
						<div className="relative rounded-xl overflow-hidden aspect-square bg-stone-700">
							<img
								src="https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="Artisan crafting ceramics"
								loading="lazy"
								onError={(e) => (e.target.src = FALL_BACK_IMAGE)}
								className="w-full h-full object-cover opacity-90"
							/>
						</div>
					</div>

					{/* Content */}
					<div className="md:w-3/5">
						<h2
							id="legacy-heading"
							className="text-3xl md:text-4xl font-serif font-bold mb-6">
							Our Ceramics Legacy
						</h2>

						<div className="grid sm:grid-cols-2 gap-6 mb-8">
							<ListOptions
								EMPTY_MESSAGE={"no status"}
								OPTIONS={legacyStats}
								RENDER_ITEM={(stat, index) => (
									<StatCard key={index} {...stat} />
								)}
							/>
						</div>
						<p className="text-xl mb-8 text-blue-950 leading-relaxed">
							{storyParagraphs}
						</p>

						<div className="flex flex-wrap gap-4">
							<Link
								to="/about"
								className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg">
								Our Full Story →
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const StatCard = ({ value, label }) => {
	return (
		<div className="bg-stone-700/50 p-4 rounded-lg">
			<h3 className="text-amber-400 font-bold mb-2">
				<CountUpNumber value={value} />
			</h3>
			<p className="text-white">{label}</p>
		</div>
	);
};

LegacySection.propTypes = {
	legacyStats: PropTypes.array.isRequired,
	storyParagraphs: PropTypes.string.isRequired,
};

StatCard.propTypes = {
	value: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
};
export default LegacySection;
