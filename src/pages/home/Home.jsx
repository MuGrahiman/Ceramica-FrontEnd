import React from "react";
import Slider from "./Slider";
import CategorySection from "./CategorySection";
import FeaturedProducts from "./FeaturedProducts";
import LegacySection from "./LegacySection";
import SubscribeSection from "./SubscribeSection";
import CompanyValueSection from "../about/CompanyValueSection";
import JoinOurJourneyGallerySection from "./JoinOurJourneyGallerySection";
import Wrapper from "../../components/Wrapper";
import useInventory from "../../hooks/useInventory";
import {
	CATEGORY_SLIDES,
	COMPANY_LEGACY,
	COMPANY_VALUES,
	GALLERY_SLIDES,
	HERO_SLIDES,
} from "../../constants/app";

/**
 * Main home page component that composes all section components.
 * Handles data fetching, error states, and renders the complete page layout.
 *
 * @returns {JSX.Element} The complete home page with all sections
 */
const Home = () => {
	const { fetchLoading, topRatedProducts } = useInventory();

	return (
		<div className="font-sans text-stone-800">
			{/* Hero Section */}
			<Wrapper>
				<Slider slides={HERO_SLIDES} />
			</Wrapper>

			{/* Category Section */}
			<Wrapper isWhite>
				<CategorySection categories={CATEGORY_SLIDES} />
			</Wrapper>

			{/* Featured Products Section */}
			<Wrapper>
				<FeaturedProducts
					featuredProducts={topRatedProducts}
					isLoading={fetchLoading}
				/>
			</Wrapper>

			{/* Products gallery section */}
			<Wrapper isWhite>
				<JoinOurJourneyGallerySection gallerySlides={GALLERY_SLIDES} />
			</Wrapper>

			{/* Company Value Section */}
			<Wrapper>
				<CompanyValueSection features={COMPANY_VALUES} />
			</Wrapper>

			{/* Legacy Section */}
			<Wrapper isWhite>
				<LegacySection
					legacyStats={COMPANY_LEGACY.stats}
					storyParagraphs={COMPANY_LEGACY.story[0]}
				/>
			</Wrapper>

			{/* Subscribe Section */}
			<Wrapper>
				<SubscribeSection />
			</Wrapper>
		</div>
	);
};

export default Home;
