import React from "react";
import  heroImage from "../../assets/ceramics/Gemini_Generated_Image_tksqltksqltksqlt.jpeg";
import ceramicImage from "../../assets/ceramics/Gemini_Generated_Image_syamptsyamptsyam.jpeg";
import HeroSection from "../../components/Hero";
import BrandStorySection from "./BrandStorySection";
import UniqueSellingPoints from "./UniqueSellingPoints";
import SiteGuideSection from "./SiteGuideSection";
import CallToAction from "./CallToAction";
import MissionVisionSection from "./MissionVisionSection";

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
      
      <div className="max-w-7xl container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <BrandStorySection image={ceramicImage} />
        <MissionVisionSection />
        <UniqueSellingPoints />
        <CallToAction />
        <SiteGuideSection />
      </div>
    </div>
  );
};

export default AboutPage;