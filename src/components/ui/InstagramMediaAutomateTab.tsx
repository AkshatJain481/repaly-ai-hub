import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineDangerous } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import {
  usePutAutomationMutation,
  useTurnOffAutomationMutation,
} from "@/apis/automation";
import { useLazyGetMediaDetailsQuery } from "@/apis/instagram";

import ConfirmationPopup from "../common/ConfirmationPopup";
import TagManagement from "./TagManagment";
import AIEnabledInteractions from "./AISettings";

const InstagramMediaAutomateTab = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [putAutomation, { isLoading: isApplyAutomationLoading }] =
    usePutAutomationMutation();
  const [turnOffAutomation, { isLoading: isTurnOffAutomationLoading }] =
    useTurnOffAutomationMutation();
  const [triggerGetMediaDetails, { isLoading: isMediaDetailsLoading }] =
    useLazyGetMediaDetailsQuery();
  const { mediaDetails } = useSelector((state: RootState) => state.automation);

  const handleTurnOff = async () => {
    try {
      await turnOffAutomation({ mediaId: mediaDetails?.id || "" }).unwrap();
      await triggerGetMediaDetails(mediaDetails?.id || "").unwrap();
      toast.success("Automation turned off!");
    } catch (err) {
      console.error("Failed to turn off automation:", err);
      toast.error("Failed to turn off automation! Please try again later.");
    } finally {
      setIsPopupOpen(false);
    }
  };

  const applyAutomation = async () => {
    const { error } = await putAutomation({
      mediaId: mediaDetails?.id || "",
    });

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
    <div className="relative ">
      <ConfirmationPopup
        message="This action will result in DELETION of ALL automation settings, still want to proceed?"
        isOpen={isPopupOpen}
        onConfirm={handleTurnOff}
        loading={isTurnOffAutomationLoading || isMediaDetailsLoading}
        title="Turn Off Automation?"
        onClose={() => setIsPopupOpen(false)}
      />

      <div className="dark:bg-gray-900 dark:border-purple-600 border-2 border-gray-200 rounded-xl p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-2xl font-bold">
          <p className="bg-gradient-to-r from-[#9b87f5] to-[#3e83f6] bg-clip-text text-transparent">
            Response Settings
          </p>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            <MdOutlineDangerous size={18} />
            Turn Off Automation
          </button>
        </div>
        {/* Main Sections */}
        <TagManagement />
        <AIEnabledInteractions />
      </div>

      {/* Sticky Apply Button */}
      <div className="fixed bottom-6 right-[10%] z-[999] pointer-events-none">
        <button
          onClick={applyAutomation}
          disabled={isApplyAutomationLoading}
          className="flex items-center gap-2 min-w-[200px] px-4 py-2 rounded-md border-2 border-purple-600 bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-500 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlineLightningBolt size={20} />
          {isApplyAutomationLoading ? "Applying..." : "Apply Automation"}
        </button>
      </div>
    </div>
  );
};

export default InstagramMediaAutomateTab;
