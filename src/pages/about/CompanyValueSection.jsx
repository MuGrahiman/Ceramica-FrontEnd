import React from "react";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";

/**
 * CompanyValueSection - Displays company value propositions in a responsive grid.
 *
 * @param {Object} props - Component props
 * @param {Array<{title: string, desc: string, icon: string}>} [props.features] - Array of value propositions
 * @returns {JSX.Element} Marketing section highlighting company values
 */
const CompanyValueSection = ({ features = [] }) => {
	return (
		<section aria-labelledby="value-heading" className="mb-20">
			<h2
				id="value-heading"
				className="text-3xl font-bold text-blue-950 mb-8 text-center">
				Why Choose Our Ceramics
			</h2>

			<div role="list" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<ListOptions
					EMPTY_MESSAGE={"No values to display"}
					OPTIONS={features}
					RENDER_ITEM={(item, index) => (
						<div
							key={item.title + index}
							role="listitem"
							aria-label={item.title}
							className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105">
							<div className="text-4xl mb-4">{item.icon}</div>
							<h3 className="text-xl font-semibold text-blue-950 mb-2">
								{item.title}
							</h3>
							<p className="text-blue-950">{item.desc}</p>
						</div>
					)}
				/>
			</div>
		</section>
	);
};

CompanyValueSection.propTypes = {
	features: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			desc: PropTypes.string.isRequired,
			icon: PropTypes.string.isRequired,
		})
	),
};

export default CompanyValueSection;
