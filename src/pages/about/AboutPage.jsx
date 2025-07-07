import React from "react";
import heroImage from "../../assets/ceramics/Gemini_Generated_Image_tksqltksqltksqlt.jpeg";
import ceramicImage from "../../assets/ceramics/Gemini_Generated_Image_syamptsyamptsyam.jpeg";
import HeroSection from "../../components/Hero";
import BrandStorySection from "./BrandStorySection";
import CompanyValueSection from "./CompanyValueSection";
import SiteGuideSection from "./SiteGuideSection";
import JoinOurJourneySection from "./JoinOurJourneySection";
import MissionVisionSection from "./MissionVisionSection";
import Wrapper from "../../components/Wrapper";
import PhilosophyStatement from "./PhilosophyStatement";
import StatsBar from "./StatsBar";
import { COMPANY_LEGACY, COMPANY_VALUES } from "../../constants/app";

/**
 * AboutPage - Displays the company's story, mission, and unique value propositions
 *
 * Features:
 * - Hero section with title and subtitle
 * - Brand story with image and description
 * - Mission and vision cards
 * - Unique selling points grid
 * - Site usage guide
 * - Call to action section
 */
const AboutPage = () => {

	return (
		<div className="min-h-screen">
			<HeroSection
				title="Our Ceramic Story"
				subtitle="Handcrafted elegance for your dining experience"
				backgroundImage={heroImage}
			/>
			<StatsBar stats={COMPANY_LEGACY.stats} />
			<PhilosophyStatement />
			<Wrapper>
				<BrandStorySection story={COMPANY_LEGACY.story} image={ceramicImage} />
				<MissionVisionSection />
				<CompanyValueSection features={COMPANY_VALUES} />
				<JoinOurJourneySection />
				<SiteGuideSection />
			</Wrapper>
		</div>
	);
};

export default AboutPage;
