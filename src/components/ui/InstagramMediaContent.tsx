
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFormattedDate } from "@/utils/commonFunctions";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, HeartFilled, MessageCircle, Send, Bookmark,
  Volume2, VolumeX, ArrowLeft, UserCircle2 
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2 w-full`}>
      <div 
        className={`max-w-[70%] ${isSent ? "bg-blue-500" : "bg-gray-700"} text-white px-3 py-2 rounded-xl relative`}
      >
        <p className="text-sm">{content}</p>
        <p className="text-xs text-white/70 text-right mt-1">
          {timestamp}
        </p>
      </div>
    </div>
  );
};

// Comment Item Component
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
      <Avatar className="h-12 w-12">
        <Avatar.Image src={userImgUrl} alt={username} />
        <Avatar.Fallback><UserCircle2 className="h-12 w-12" /></Avatar.Fallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm text-white/90 truncate max-w-[120px]">
            {username}
          </p>
          <p className="text-xs text-white/60 whitespace-nowrap">
            {timestamp}
          </p>
        </div>

        <p className="text-sm text-white/90 mt-0.5">
          {content}
        </p>
        {!isReply && (
          <div className="flex gap-4 mt-1">
            <p className="text-xs text-white/60 cursor-pointer">Reply</p>
            <p className="text-xs text-white/60 cursor-pointer">See translation</p>
          </div>
        )}
      </div>
      <Heart className="text-white/60 cursor-pointer h-5 w-5" />
    </div>
  );
};

// Comment Popup Component
const MotionDiv = motion.div;

const InstagramDMPopup = () => {
  const { responseDM } = useSelector((state: RootState) => state.automation);

  return (
    <AnimatePresence>
      <MotionDiv
        className="absolute top-8 bottom-0 left-0 right-0 bg-black z-[1000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="py-3 px-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft className="text-white h-5 w-5 cursor-pointer" />
            <Avatar className="h-10 w-10">
              <Avatar.Fallback><UserCircle2 className="h-10 w-10" /></Avatar.Fallback>
            </Avatar>
            <div>
              <p className="text-white font-semibold">Test User</p>
              <p className="text-white/70 text-xs">Active 2h ago</p>
            </div>
          </div>
          <Send className="text-white h-5 w-5 cursor-pointer" />
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

        {/* Message Input Section - Simplified */}
        <div className="p-4 border-t border-white/20 flex items-center gap-3 absolute bottom-0 w-full">
          <div className="flex-1 relative">
            <Input
              readOnly={true}
              placeholder="Message..."
              className="bg-white/10 border-none rounded-full text-white placeholder:text-white/60 focus:shadow-none"
            />
          </div>
          <Send className="text-blue-500 cursor-pointer h-5 w-5" />
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};

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
        className="absolute bottom-0 left-0 right-0 bg-black rounded-t-3xl z-[1000]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="py-3 border-b border-gray-800 flex items-center justify-center flex-col gap-2">
          <div className="w-[40px] h-[2px] bg-gray-400"></div>
          <p className="text-white font-semibold">Comments</p>
        </div>

        {/* Comment List Section */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {/* Original comment using the first tag */}
          {latestTag && (
            <CommentItem
              username="test_user"
              content={latestTag}
              timestamp="Just now"
            />
          )}

          {/* Reply comment */}
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
        <div className="p-3 border-t border-white/20 flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <Avatar.Image src={activeAccount?.profile_picture_url} alt={activeAccount?.username || "Your avatar"} />
            <Avatar.Fallback><UserCircle2 className="h-12 w-12" /></Avatar.Fallback>
          </Avatar>

          <div className="flex-1 p-2 rounded-full bg-white/10">
            <p className="text-white/60 text-sm">Start the conversation...</p>
          </div>
          <p className="text-blue-400 font-semibold text-sm cursor-pointer">Send</p>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};

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
            alt={mediaDetails?.caption || "Instagram post"}
            className="object-cover w-full max-h-[586px]"
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
              alt={mediaDetails?.caption || "Instagram video"}
              className="object-cover w-full"
            />
            {isHovering && (
              <video
                src={mediaDetails?.media_url}
                autoPlay
                loop
                muted={isMuted}
                className="absolute top-0 left-0 w-full"
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
      <div className="absolute bottom-12 right-10px flex flex-col gap-4 z-20">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <HeartFilled className="h-7 w-7 text-red-500 filter drop-shadow-md transition-all duration-200" />
          ) : (
            <Heart className="h-7 w-7 text-white filter drop-shadow-md transition-all duration-200" />
          )}
          <p className="text-white text-xs mt-1 text-shadow">
            {mediaDetails?.like_count}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <MessageCircle className="h-6 w-6 text-white filter drop-shadow-md transition-all duration-200" />
          <p className="text-white text-xs mt-1 text-shadow">
            {mediaDetails?.comments_count}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Send className="h-6 w-6 text-white filter drop-shadow-md transition-all duration-200" />
          <p className="text-white text-xs mt-1 text-shadow">
            {mediaDetails?.shares}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Bookmark className="h-6 w-6 text-white filter drop-shadow-md transition-all duration-200" />
          <p className="text-white text-xs mt-1 text-shadow">
            {mediaDetails?.saved}
          </p>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-white cursor-pointer" />
          ) : (
            <Volume2 className="h-4 w-4 text-white cursor-pointer" />
          )}
        </div>
      </div>

      {/* Post Caption and Account */}
      <div className="absolute bottom-12 left-5 flex items-center gap-2 z-10">
        <Avatar className="h-12 w-12">
          <Avatar.Image src={activeAccount?.profile_picture_url} alt={activeAccount?.username || "Profile"} />
          <Avatar.Fallback><UserCircle2 className="h-12 w-12" /></Avatar.Fallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="font-bold text-sm text-white text-shadow">
            {activeAccount?.username || "User Name"}
          </p>

          <div className="relative pr-14">
            <div
              className={`text-xs text-white/90 text-shadow relative overflow-hidden transition-all ${
                isCaptionExpanded ? "max-h-[500px]" : "max-h-[2.8em]"
              }`}
              style={{
                WebkitLineClamp: isCaptionExpanded ? "unset" : 2,
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
              }}
            >
              {mediaDetails?.caption}
              {isCaptionExpanded && (
                <p className="font-bold mt-1">
                  Posted on {getFormattedDate(mediaDetails?.timestamp || "")}
                </p>
              )}
            </div>

            <p
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              className="text-xs mt-1 text-shadow text-white cursor-pointer hover:underline transition-colors"
            >
              {isCaptionExpanded ? "less" : "more"}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div
        className={`${isCaptionExpanded ? "opacity-70" : "opacity-100"} flex items-center bg-gray-900 justify-center w-full h-[586px]`}
      >
        {renderMediaContent()}
      </div>

      {/* Live Demo */}
      {tab === "comments" ? (
        <InstagramCommentPopup />
      ) : (
        tab === "dm" && <InstagramDMPopup />
      )}
    </>
  );
};

export default InstagramMediaContent;
