
import { useStoryAutomationMutation } from "../../apis/automation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import StoryTagManagement from "./StoryTagManagement";

const InstagramStoryAutomateTab = () => {
  const [storyAutomation, { isLoading }] = useStoryAutomationMutation();
  const { storyDetails } = useSelector(
    (state: RootState) => state.storyAutomation
  );
  
  const applyAutomation = async () => {
    const { error } = await storyAutomation(storyDetails?.story_id || "");

    if (error) {
      const errorMessage =
        "data" in error
          ? (error.data as any) || "Failed to update automation settings"
          : "Failed to update automation settings";

      toast.error(errorMessage);
      return;
    }

    toast.success("Automation settings updated successfully");
  };

  return (
    <div className="relative">
      {/* Add padding at the bottom to prevent content from being hidden under sticky button */}
      <div className="bg-white p-4 border-2 border-solid border-gray-200 rounded-xl gap-4">
        {/* Tabs List positioned at the top right */}

        <div className="text-3xl font-bold">
          <p className="bg-gradient-to-r from-[#9b87f5] to-[#3e83f6] bg-clip-text text-transparent">
            Response Settings
          </p>
        </div>
        {/* Main Content */}
        <StoryTagManagement />
      </div>
      {/* Sticky Button Container */}
      <div className="fixed bottom-[3%] right-[10%] flex justify-center z-[999] pointer-events-none">
        <Button
          className="min-w-[200px] bg-purple-600 hover:bg-purple-400 text-white px-4 py-2 rounded border-2 border-solid border-purple-600 font-medium shadow-lg pointer-events-auto"
          onClick={applyAutomation}
          disabled={isLoading}
        >
          <Zap className="h-5 w-5 mr-2" />
          {isLoading ? "Applying..." : "Apply Automation"}
        </Button>
      </div>
    </div>
  );
};

export default InstagramStoryAutomateTab;
