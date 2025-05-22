import { useStoryAutomationMutation } from "../../apis/automation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "./button";
import { HiOutlineLightningBolt } from "react-icons/hi";
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
      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200 space-y-6">
        <div className="text-2xl font-semibold">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Response Settings
          </span>
        </div>
        <StoryTagManagement />
      </div>

      {/* Sticky Button Container */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <Button
          className={`
            min-w-[200px] px-4 py-2 text-sm font-medium text-white bg-purple-600 dark:bg-purple-500 border border-purple-600 dark:border-purple-500 rounded-lg
            hover:bg-purple-700 dark:hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none
            transition-colors shadow-lg flex items-center gap-2
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={applyAutomation}
          disabled={isLoading}
        >
          <HiOutlineLightningBolt className="w-5 h-5" />
          {isLoading ? "Applying..." : "Apply Automation"}
        </Button>
      </div>
    </div>
  );
};

export default InstagramStoryAutomateTab;
