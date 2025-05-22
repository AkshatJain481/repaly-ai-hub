import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsLightning } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { primaryColor } from "@/utils/constants";
import { StoryCardProp } from "@/utils/interfaces";
import { getFormattedDate } from "@/utils/commonFunctions";
import { Button } from "../ui/button";

const StoryCard = ({ storyData }: { storyData: StoryCardProp }) => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);

  const handleNavigate = (tab?: string) => {
    const baseUrl = `/dashboard/instagram/story/${storyData?.story_id}`;
    const url = tab ? `${baseUrl}?tab=${tab}` : baseUrl;
    navigate(url);
  };

  return (
    <div
      className="rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
      onClick={() => handleNavigate()}
    >
      <div className="relative aspect-square rounded-t-xl overflow-hidden aspect-1">
        {/* Image */}
        {storyData?.media_type === "IMAGE" ? (
          <img
            src={
              storyData?.media_url ||
              "https://placehold.co/400x400?text=Story+Image"
            }
            alt="Story media"
            className="w-full object-contain bg-gray-100 dark:bg-gray-700"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src =
                "https://placehold.co/400x400?text=Story+Image";
            }}
          />
        ) : (
          <>
            {videoError ? (
              <img
                src="https://placehold.co/400x400?text=Story+Image"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={storyData?.media_url}
                muted
                playsInline
                onLoadedData={(e) => e.currentTarget.pause()}
                onError={() => setVideoError(true)}
                className="w-full h-full object-cover"
              />
            )}
          </>
        )}
      </div>

      {/* Caption & Buttons */}
      <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {getFormattedDate(storyData?.timestamp)}
        </p>

        <div className="mt-3 flex gap-3">
          <Button
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors flex items-center justify-center gap-2"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleNavigate("automate");
            }}
          >
            <BsLightning className="w-4 h-4" style={{ color: primaryColor }} />
            Automate
          </Button>
          <Button
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors flex items-center justify-center gap-2"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleNavigate("analytics");
            }}
          >
            <BiBarChart className="w-4 h-4" style={{ color: primaryColor }} />
            Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
