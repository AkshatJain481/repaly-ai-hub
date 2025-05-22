import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFormattedDate } from "@/utils/commonFunctions";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";

// MessageBubble Component
const MessageBubble = ({
  content,
  isSent = true,
  timestamp = "1m",
}: {
  content: string;
  isSent?: boolean;
  timestamp?: string;
}) => {
  return (
    <div
      className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2 w-full`}
    >
      <div
        className={`max-w-[70%] px-3 py-2 rounded-xl relative ${
          isSent ? "bg-blue-500" : "bg-gray-700 dark:bg-gray-600"
        } text-white`}
      >
        <p className="text-sm">{content}</p>
        <p className="text-xs text-white/70 text-right mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

// CommentItem Component
const CommentItem = ({
  username,
  content,
  isReply = false,
  timestamp = "1m",
  userImgUrl,
}: {
  username: string;
  content: string;
  isReply?: boolean;
  timestamp?: string;
  userImgUrl?: string;
}) => {
  return (
    <div className="flex gap-3 w-full px-4 py-2 items-center">
      <Avatar className="w-12 h-12">
        <AvatarFallback>
          <PiUserCircleDuotone className="w-12 h-12 text-white/60" />
        </AvatarFallback>
        <AvatarImage
          src={userImgUrl}
          className="w-12 h-12 rounded-full object-cover"
        />
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm text-white/90 max-w-[120px] truncate">
            {username}
          </p>
          <p className="text-xs text-white/60 whitespace-nowrap">{timestamp}</p>
        </div>
        <p className="text-sm text-white/90 mt-0.5">{content}</p>
        {!isReply && (
          <div className="flex gap-4 mt-1">
            <p className="text-xs text-white/60 cursor-pointer hover:text-white/80">
              Reply
            </p>
            <p className="text-xs text-white/60 cursor-pointer hover:text-white/80">
              See translation
            </p>
          </div>
        )}
      </div>
      <AiOutlineHeart className="w-5 h-5 text-white/60 cursor-pointer hover:text-white/80" />
    </div>
  );
};

// InstagramDMPopup Component
const MotionDiv = motion.div;
const InstagramDMPopup = () => {
  const { responseDM } = useSelector((state: RootState) => state.automation);

  return (
    <AnimatePresence>
      <MotionDiv
        className="absolute top-1 bottom-6 left-0 right-0 bg-black dark:bg-gray-900 z-[1000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="py-3 px-4 border-b border-gray-800 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BsArrowLeft className="w-5 h-5 text-white cursor-pointer hover:text-white/80" />
            <Avatar className="w-10 h-10">
              <AvatarFallback>
                <PiUserCircleDuotone className="w-10 h-10 text-white/60" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-semibold">Test User</p>
              <p className="text-xs text-white/70">Active 2h ago</p>
            </div>
          </div>
          <FiSend className="w-5 h-5 text-white cursor-pointer hover:text-white/80" />
        </div>

        {/* Messages Section */}
        <div className="h-[calc(100%-128px)] overflow-y-auto p-4 flex flex-col">
          <div className="flex flex-col w-full">
            {responseDM ? (
              <MessageBubble
                content={responseDM}
                isSent={true}
                timestamp="Just now"
              />
            ) : (
              <MessageBubble
                content="Configure your DM settings to send messages."
                isSent={true}
                timestamp="5m ago"
              />
            )}
          </div>
        </div>

        {/* Message Input Section */}
        <div className="p-4 border-t border-white/20 dark:border-gray-700 flex items-center gap-3 absolute bottom-0 w-full">
          <div className="flex-1 relative">
            <input
              readOnly
              placeholder="Message..."
              className="w-full bg-white/10 dark:bg-gray-800 text-white placeholder-white/60 rounded-full px-4 py-2 focus:outline-none"
            />
          </div>
          <FiSend className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-400" />
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};

// InstagramCommentPopup Component
const InstagramCommentPopup = () => {
  const { tags, responseComment } = useSelector(
    (state: RootState) => state.automation
  );
  const { activeAccount } = useSelector((state: RootState) => state.user);
  const latestTag =
    tags && tags.length > 0 ? tags[tags.length - 1] : "user comment";

  return (
    <AnimatePresence>
      <MotionDiv
        className="absolute bottom-6 left-0 right-0 bg-black dark:bg-gray-900 rounded-t-3xl z-[1000]"
        initial={{ y: "100%" }}
        animate={{ y: 10 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="py-3 border-b border-gray-800 dark:border-gray-700 flex flex-col items-center gap-2">
          <div className="w-10 h-0.5 bg-gray-400 dark:bg-gray-500"></div>
          <p className="text-white font-semibold">Comments</p>
        </div>

        {/* Comment List Section */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {latestTag && (
            <CommentItem
              username="test_user"
              content={latestTag}
              timestamp="Just now"
            />
          )}
          {responseComment && (
            <div className="pl-6 mt-1">
              <CommentItem
                username={activeAccount?.username || "You"}
                content={responseComment}
                isReply={true}
                timestamp="Just now"
                userImgUrl={activeAccount?.profile_picture_url}
              />
            </div>
          )}
        </div>

        {/* Comment Input Section */}
        <div className="p-3 border-t border-white/20 dark:border-gray-700 flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback>
              <PiUserCircleDuotone className="w-12 h-12 text-white/60" />
            </AvatarFallback>
            <AvatarImage
              src={activeAccount?.profile_picture_url}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Avatar>
          <div className="flex-1 p-2 rounded-full bg-white/10 dark:bg-gray-800">
            <p className="text-sm text-white/60">Start the conversation...</p>
          </div>
          <p className="text-blue-400 font-semibold text-sm cursor-pointer hover:text-blue-300">
            Send
          </p>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};

// InstagramMediaContent Component
const InstagramMediaContent = ({ tab }: { tab: string }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const { activeAccount } = useSelector((state: RootState) => state.user);
  const { mediaDetails } = useSelector((state: RootState) => state.automation);
  const [isLiked, setIsLiked] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const renderMediaContent = () => {
    switch (mediaDetails?.media_type) {
      case "IMAGE":
        return (
          <img
            src={mediaDetails?.media_url}
            alt={mediaDetails?.caption}
            className="w-full max-h-[586px] object-cover"
            onDoubleClick={() => setIsLiked(!isLiked)}
          />
        );
      case "VIDEO":
        return (
          <div
            className="relative rounded-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onDoubleClick={() => setIsLiked(!isLiked)}
          >
            <img
              src={mediaDetails?.thumbnail_url || mediaDetails?.media_url}
              alt={mediaDetails?.caption}
              className="w-full max-h-[586px] object-cover"
            />
            {isHovering && (
              <video
                src={mediaDetails?.media_url}
                autoPlay
                loop
                muted={isMuted}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Action Icons */}
      <div className="absolute bottom-12 right-2.5 flex flex-col gap-4 z-20">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? (
            <AiFillHeart className="w-7 h-7 text-red-500 drop-shadow-md transition-all duration-200" />
          ) : (
            <AiOutlineHeart className="w-7 h-7 text-white drop-shadow-md transition-all duration-200" />
          )}
          <p className="text-white text-xs mt-1 drop-shadow-md">
            {mediaDetails?.like_count}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <BiComment className="w-6 h-6 text-white drop-shadow-md transition-all duration-200" />
          <p className="text-white text-xs mt-1 drop-shadow-md">
            {mediaDetails?.comments_count}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FiSend className="w-6 h-6 text-white drop-shadow-md transition-all duration-200" />
          <p className="text-white text-xs mt-1 drop-shadow-md">
            {mediaDetails?.shares}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaRegBookmark className="w-6 h-6 text-white drop-shadow-md transition-all duration-200" />
          <p className="text-white text-xs mt-1 drop-shadow-md">
            {mediaDetails?.saved}
          </p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <MdVolumeOff className="w-6 h-6 text-white cursor-pointer" />
          ) : (
            <MdVolumeUp className="w-6 h-6 text-white cursor-pointer" />
          )}
        </div>
      </div>

      {/* Post Caption and Account */}
      <div className="absolute bottom-20 left-5 flex items-center gap-2 z-10">
        <Avatar className="w-12 h-12">
          <AvatarFallback>
            <PiUserCircleDuotone className="w-12 h-12 text-white/60" />
          </AvatarFallback>
          <AvatarImage
            src={activeAccount?.profile_picture_url}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Avatar>
        <div className="flex flex-col">
          <p className="font-bold text-sm text-white drop-shadow-md">
            {activeAccount?.username || "User Name"}
          </p>
          <div className="relative pr-14">
            <div
              className={`text-xs text-white/90 drop-shadow-md transition-all duration-300 ${
                isCaptionExpanded ? "" : "line-clamp-2"
              }`}
            >
              {mediaDetails?.caption}
              {isCaptionExpanded && (
                <p className="font-bold mt-1">
                  Posted on {getFormattedDate(mediaDetails?.timestamp || "")}
                </p>
              )}
            </div>
            <p
              className="text-xs text-white mt-1 drop-shadow-md cursor-pointer hover:underline"
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
            >
              {isCaptionExpanded ? "less" : "more"}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div
        className={`flex items-center justify-center w-full h-[586px] bg-gray-900 dark:bg-gray-800 ${
          isCaptionExpanded ? "opacity-70" : "opacity-100"
        }`}
      >
        {renderMediaContent()}
      </div>

      {/* Popups */}
      {tab === "comments" ? (
        <InstagramCommentPopup />
      ) : (
        tab === "dm" && <InstagramDMPopup />
      )}
    </>
  );
};

export default InstagramMediaContent;
