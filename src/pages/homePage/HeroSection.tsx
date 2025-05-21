
import { FiArrowRight } from "react-icons/fi";
import LoginDrawer from "@/components/common/LoginDrawer";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background px-1">
      <div className="container py-12 z-10 relative">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left column: Text content */}
          <div className="flex flex-col gap-8 items-start lg:max-w-[50%]">
            <span className="bg-primary/20 text-primary text-sm font-bold p-3 rounded-full">
              Your Social Media Manager
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your{" "}
                <p className="bg-gradient-to-r from-[#9b87f5] to-[#3e83f6] bg-clip-text text-transparent">
                  AI Assistant
                </p>
              for Social Media
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Instant AI-Powered Replies for Comments & DMs – Boost Engagement,
              Increase Conversions, and Save Hours of Manual Work.
            </p>

            <div className="flex flex-wrap gap-4">
              <LoginDrawer
                triggerButton={
                  <button
                    className="bg-primary text-white text-lg px-6 py-6 rounded-full font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                  >
                    Get Started for Free
                    <FiArrowRight className="inline ml-2" />
                  </button>
                }
              />
              <Link to="/demo">
                <button
                  className="bg-white text-primary text-lg px-6 py-6 rounded-full font-bold border border-solid border-primary hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  Watch Demo
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-4">
                <img 
                  src="https://bit.ly/sage-adebayo" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://bit.ly/sage-adebayo" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://bit.ly/sage-adebayo" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className="text-md font-bold text-muted-foreground">
                  Trusted by 2,000+ creators
                </p>
                <p className="text-sm text-muted-foreground">
                  Join them today
                </p>
              </div>
            </div>
          </div>

          {/* Right column: App preview image */}
          <div className="lg:max-w-[50%] relative">
            <div className="relative overflow-hidden">
              <img
                src="/heroSection.png"
                alt="Social Media Management Dashboard"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
