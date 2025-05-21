import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BiMessageRoundedDetail, BiSend } from "react-icons/bi";
import { BsHeart, BsHeartFill, BsVolumeUp, BsVolumeMute } from "react-icons/bs";

const InstagramPhoneStoryContent = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const { storyDetails } = useSelector(
    (state: RootState) => state.storyAutomation
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play(); // Play the video if it's paused
      } else {
        videoRef.current.pause(); // Pause the video if it's playing
      }
    }
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = "https://placehold.co/400x400?text=Story+Image"; // Set the placeholder
  };
  
  const renderMediaContent = () => {
    switch (storyDetails?.media_type) {
      case "IMAGE":
        return (
          <img
            src={
              storyDetails?.media_url ||
              "https://placehold.co/400x400?text=Story+Image"
            }
            alt={"story image"}
            className="object-cover w-full"
            onDoubleClick={() => setIsLiked(!isLiked)}
            onError={handleImageError}
          />
        );
      case "VIDEO":
        return (
          <div className="overflow-hidden">
            <video
              ref={videoRef}
              src={storyDetails?.media_url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={handleVideoClick} // Add onClick handler
              className="absolute top-0 left-0 w-full h-[530px] object-cover z-1"
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Mute Icon */}
      <div className="absolute top-10 right-2 flex flex-col items-center cursor-pointer z-20" onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? (
          <BsVolumeMute className="h-4 w-4 text-white cursor-pointer" />
        ) : (
          <BsVolumeUp className="h-4 w-4 text-white cursor-pointer" />
        )}
      </div>

      {/* Story Content Area */}
      <div
        className="flex items-center bg-gray-900 justify-center w-full h-[530px] relative"
        onDoubleClick={() => setIsLiked(!isLiked)}
      >
        {renderMediaContent()}
      </div>

      <div className="py-2 bg-gray-900 flex justify-center items-center flex-row gap-4 z-20">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsCommentPopupOpen(!isCommentPopupOpen)}>
          <BiMessageRoundedDetail className="h-6 w-6 text-white filter drop-shadow-md transition-all duration-200" />
        </div>
        <div 
          className="flex flex-col cursor-pointer px-4 py-2 text-white border border-gray-400 rounded-full w-[180px] text-center"
          onClick={() => setIsCommentPopupOpen(!isCommentPopupOpen)}
        >
          Message
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <BsHeartFill className="h-7 w-7 text-red-500 filter drop-shadow-md transition-all duration-200" />
          ) : (
            <BsHeart className="h-7 w-7 text-white filter drop-shadow-md transition-all duration-200" />
          )}
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsCommentPopupOpen(!isCommentPopupOpen)}>
          <BiSend className="h-6 w-6 text-white filter drop-shadow-md transition-all duration-200" />
        </div>
      </div>
    </>
  );
};

export default InstagramPhoneStoryContent;
