
import { Element } from "react-scroll";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeatureSection";
import AutoRepliesSection from "./AutoRepliesSection";
import AutoDMs from "./AutoDMs";
import PricingSection from "./PricingSection";
import TestimonialSection from "./TestimonialSection";
import GetStartedSection from "./GetStartedSection";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-0">
      <Element name="home">
        <HeroSection />
      </Element>
      <Element name="features">
        <FeaturesSection />
      </Element>
      <Element name="product">
        <AutoRepliesSection />
        <AutoDMs />
      </Element>
      <Element name="pricing">
        <PricingSection />
      </Element>
      <TestimonialSection />
      <Element name="about">
        <GetStartedSection />
      </Element>
    </div>
  );
};

export default HomePage;
