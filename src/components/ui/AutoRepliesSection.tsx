
import { BsCheckCircle } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import LoginDrawer from "@/components/common/LoginDrawer";

// Feature list item component
const FeatureListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 items-start">
      <div className="min-w-6 h-6 bg-primary/20 text-primary rounded-full flex justify-center items-center">
        <BsCheckCircle className="w-3 h-3" />
      </div>
      <p className="text-lg text-foreground">{children}</p>
    </div>
  );
};

const AutoRepliesSection = () => {
  // List of features for the section
  const featuresList = [
    "Set up automatic replies to common questions",
    "Customize response tone and style to match your brand",
    "Handle customer inquiries while you sleep",
    "Increase engagement rates with timely responses",
  ];

  return (
    <div className="relative py-10 md:py-20 overflow-hidden px-1">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Left side: Image */}
          <div className="flex-1 w-full">
            <img
              src="/automationSection.png" 
              alt="Smart Auto-Replies Dashboard"
              className="w-full"
            />
          </div>

          {/* Right side: Content */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
            <span className="bg-primary/20 text-primary text-sm font-bold py-2 px-4 rounded-full">
              Smart Auto-Replies
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Let AI Handle Your Comments While You Create
            </h2>

            <p className="text-lg text-muted-foreground max-w-lg">
              Stop spending hours responding to the same questions. Repaly's AI
              analyzes each comment and crafts personalized responses based on
              your preferences and brand voice.
            </p>

            <div className="flex flex-col gap-4">
              {featuresList.map((feature, index) => (
                <FeatureListItem key={index}>{feature}</FeatureListItem>
              ))}
            </div>

            <LoginDrawer
              triggerButton={
                <button
                  className="mt-2 bg-primary text-white text-lg font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
                >
                  Learn More
                  <FiArrowRight />
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoRepliesSection;
