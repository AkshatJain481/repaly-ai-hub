
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsLightning } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { primaryColor } from "@/utils/constants";
import { StoryCardProp } from "@/utils/interfaces";
import { getFormattedDate } from "@/utils/commonFunctions";

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
      className="rounded-xl bg-white border border-gray-200 cursor-pointer shadow-sm"
      onClick={() => handleNavigate()}
    >
      <div
        className="relative aspect-square rounded-t-xl overflow-hidden shadow-md"
      >
        {/* Image */}
        {storyData?.media_type === "IMAGE" ? (
          <img
            src={
              storyData?.media_url ||
              "https://placehold.co/400x400?text=Story+Image"
            }
            alt="Media"
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.currentTarget;
              target.src = "https://placehold.co/400x400?text=Story+Image"; // Set the placeholder
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
        <p className="text-sm text-gray-500">
          {getFormattedDate(storyData?.timestamp)}
        </p>

        <div className="mt-2 gap-2 justify-around flex">
          <button
            className="bg-gray-100 text-black border border-gray-200 flex-1 px-2 py-2 text-sm flex items-center justify-center gap-1 rounded-md hover:bg-gray-200 transition-colors"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleNavigate("automate");
            }}
          >
            <BsLightning style={{ color: primaryColor }} />
            <span className="text-sm">Automate</span>
          </button>
          <button
            className="bg-gray-100 text-black border border-gray-200 flex-1 px-2 py-2 text-sm flex items-center justify-center gap-1 rounded-md hover:bg-gray-200 transition-colors"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleNavigate("analytics");
            }}
          >
            <BiBarChart style={{ color: primaryColor }} />
            <span className="text-sm">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
