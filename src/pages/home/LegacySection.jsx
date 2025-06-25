import React from "react";
import { Link } from "react-router-dom"; // or use Next.js Link if applicable

const LegacySection = ({ aboutData }) => {
	return (
		<section className=" text-stone-800">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center gap-12">
					{/* Visual Element */}
					<div className="md:w-2/5">
						<div className="relative rounded-xl overflow-hidden aspect-square bg-stone-700">
							<img
								src="https://plus.unsplash.com/premium_photo-1714702846361-286897ba112a?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="Artisan crafting ceramics"
								className="w-full h-full object-cover opacity-90"
							/>
							{/* <div className="absolute inset-0 bg-amber-800 mix-blend-multiply"></div> */}
						</div>
					</div>

					{/* Content */}
					<div className="md:w-3/5">
						<h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
							Our Ceramics Legacy
						</h2>

						<div className="grid grid-cols-2 gap-6 mb-8">
							{aboutData.stats.map((stat, index) => (
								<StatCard key={index} value={stat.value} label={stat.label} />
							))}
						</div>
						<p className="text-xl mb-8 text-blue-950 leading-relaxed">
							Since 1924, our studio has preserved ancient ceramic techniques
							while innovating modern designs. Each piece carries the
							fingerprint of its maker.
						</p>

						<div className="flex flex-wrap gap-4">
							<Link
								to="/about"
								className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg">
								Our Full Story →
							</Link>
							{/* <Link 
                to="/about#makers" 
                className="border border-amber-600 text-amber-400 hover:bg-stone-700/50 px-8 py-3 rounded-full font-bold transition-all"
              >
                Meet the Makers
              </Link> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
// StatCard.jsx

const StatCard = ({ value, label }) => {
	return (
		<div className="bg-stone-700/50 p-4 rounded-lg">
			<h3 className="text-amber-400 font-bold mb-2">{value}</h3>
			<p className="text-white">{label}</p>
		</div>
	);
};

export default LegacySection;
