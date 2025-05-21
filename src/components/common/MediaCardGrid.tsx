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
      className="rounded-xl bg-white border border-gray-200 cursor-pointer"
      onClick={() => handleNavigate()}
    >
      <div className="relative aspect-square rounded-t-xl overflow-hidden shadow-md">
        {/* Unattended Comments Badge */}
        {unattendedComments > 0 && (
          <div className="absolute top-0 w-full bg-[#f04f4d] text-white text-sm px-2 py-1 font-bold flex justify-center z-10">
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
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <FaHeart size={20} />
              <span className="text-sm">{mediaData?.like_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegCommentAlt size={20} />
              <span className="text-sm">{mediaData?.comments_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegBookmark size={20} />
              <span className="text-sm">{mediaData?.saved}</span>
            </div>
          </div>
          <div className="flex gap-3 mt-2 text-sm">
            Total Engagements: {mediaData?.reach}
          </div>
        </div>
      </div>

      {/* Caption & Buttons */}
      <div className="p-4">
        <p className="text-lg font-bold line-clamp-1">
          {mediaData?.caption || "No Caption"}
        </p>
        <p className="text-sm text-gray-500">
          {getFormattedDate(mediaData?.timestamp)}
        </p>

        <div className="flex justify-around gap-2 mt-2">
          <button
            className="bg-gray-100 text-black border border-gray-200 flex-1 px-2 text-sm flex items-center gap-1 py-1.5 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate("automate");
            }}
          >
            <BsLightning color={primaryColor} />
            <span className="text-sm">Automate</span>
          </button>
          <button
            className="bg-gray-100 text-black border border-gray-200 flex-1 px-2 text-sm flex items-center gap-1 py-1.5 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate("analytics");
            }}
          >
            <BiBarChart color={primaryColor} />
            <span className="text-sm">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCardGrid;
