import { Button } from "@/components/ui/button";
import LoginDrawer from "@/components/common/LoginDrawer";
import { FiArrowRight } from "react-icons/fi";

const GetStartedSection = () => {
  return (
    <div className="w-full py-10 md:py-20 bg-primary text-white px-1">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Try Repaly for Free
          </h2>

          <p className="text-lg font-bold max-w-xl mx-auto">
            Transform your social media interactions with AI-powered replies!
            Start automating your engagement today.
          </p>

          <LoginDrawer
            triggerButton={
              <Button className="bg-white hover:bg-slate-200 text-primary px-6 py-3 rounded-full font-bold hover:translate-y-[-2px] hover:shadow-lg transition-all">
                Get Started for Free
                <FiArrowRight className="inline ml-2" />
              </Button>
            }
          />

          <p className="text-md mt-2">
            No credit card required. Free plan available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStartedSection;
