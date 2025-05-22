import { FaHeart, FaRegCommentAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { BsLightning } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { primaryColor } from "@/utils/constants";
import { MediaCardProp } from "@/utils/interfaces";
import { getFormattedDate } from "@/utils/commonFunctions";
import { useNavigate } from "react-router-dom";

const MediaCardGrid = ({
  mediaData,
  unattendedComments,
}: {
  mediaData: MediaCardProp;
  unattendedComments: number;
}) => {
  const navigate = useNavigate();

  const handleNavigate = (tab?: string) => {
    const baseUrl = `/dashboard/instagram/media/${mediaData?.id}`;
    const url = tab ? `${baseUrl}?tab=${tab}` : baseUrl;
    navigate(url);
  };

  return (
    <div
      className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => handleNavigate()}
    >
      <div className="relative rounded-t-2xl overflow-hidden aspect-1">
        {/* Unattended Comments Badge */}
        {unattendedComments > 0 && (
          <div className="absolute top-0 w-full bg-red-500 dark:bg-red-600 text-white text-sm px-2 py-1 font-semibold flex justify-center z-10">
            {unattendedComments} Unattended Comments
          </div>
        )}

        {/* Image */}
        <img
          src={
            mediaData?.media_type === "IMAGE"
              ? mediaData?.media_url
              : mediaData?.thumbnail_url
          }
          alt="Media"
          className="w-full object-contain bg-gray-100 dark:bg-gray-700"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <FaHeart size={18} />
              <span className="text-sm">{mediaData?.like_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegCommentAlt size={18} />
              <span className="text-sm">{mediaData?.comments_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegBookmark size={18} />
              <span className="text-sm">{mediaData?.saved}</span>
            </div>
          </div>
          <div className="flex gap-3 mt-3 text-sm font-medium">
            Total Engagements: {mediaData?.reach}
          </div>
        </div>
      </div>

      {/* Caption & Buttons */}
      <div className="p-4">
        <p className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-gray-100">
          {mediaData?.caption || "No Caption"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {getFormattedDate(mediaData?.timestamp)}
        </p>

        <div className="flex justify-around gap-3 mt-3">
          <button
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 flex-1 px-3 py-2 text-sm flex items-center gap-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate("automate");
            }}
          >
            <BsLightning color={primaryColor} size={18} />
            <span>Automate</span>
          </button>
          <button
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 flex-1 px-3 py-2 text-sm flex items-center gap-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate("analytics");
            }}
          >
            <BiBarChart color={primaryColor} size={18} />
            <span>Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCardGrid;
