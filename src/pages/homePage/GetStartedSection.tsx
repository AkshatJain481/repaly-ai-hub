
import { Button } from "@/components/ui/button";
import LoginDrawer from "@/components/common/LoginDrawer";

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
              <Button
                className="bg-white text-primary px-6 py-6 rounded-full font-bold hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                Get Started for Free
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
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
