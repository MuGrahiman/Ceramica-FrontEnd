import React, { useRef } from "react";

const CraftsmanshipSection = () => {
	const refVideo = useRef();

	function playVideo() {
		if (refVideo && refVideo.current) {
			if (refVideo.current.paused) {
				//   setIsPlaying(true);
				// refVideo.current.requestFullscreen();
				refVideo.current.play();
			} else {
				//   setIsPlaying(false);
				refVideo.current.pause();
			}
		}
		return false;
	}
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center gap-10">
					{/* Text Content */}
					<div className="md:w-1/2 animate-fadeIn">
						<h2 className="text-3xl font-serif font-bold mb-6 text-stone-800">
							The Art of Ceramics
						</h2>
						<p className="text-stone-600 mb-6 leading-relaxed">
							Watch master artisans transform raw clay into functional art using
							techniques perfected over generations. This video showcases our
							studio's process from wheel-throwing to final glazing.
						</p>
						<ul className="space-y-3 mb-8">
							<li className="flex items-start">
								<span className="text-amber-700 mr-2">✓</span>
								<span>Premium stoneware clay</span>
							</li>
							<li className="flex items-start">
								<span className="text-amber-700 mr-2">✓</span>
								<span>Lead-free glazes</span>
							</li>
							<li className="flex items-start">
								<span className="text-amber-700 mr-2">✓</span>
								<span>Two-stage kiln firing</span>
							</li>
						</ul>
						<button
							onClick={playVideo}
							className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-full transition-all">
							Play
						</button>
					</div>

					{/* YouTube Embed */}
					<div className="md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg animate-float">
						<iframe
						
							ref={refVideo}
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/p7O_L0zqXAw?autoplay=0&controls=1&modestbranding=1&rel=0"
							title="Ceramics Making Process - Our Studio"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="w-full h-full"
							loading="lazy"></iframe>
					</div>
					<div className="md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg animate-float">
						<video
							ref={refVideo}
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/p7O_L0zqXAw?autoplay=0&controls=1&modestbranding=1&rel=0"
							title="Ceramics Making Process - Our Studio"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="w-full h-full"
							loading="lazy"></video>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CraftsmanshipSection;
