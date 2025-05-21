import { useState, useRef } from "react";
import { Box, Icon, Image } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";

const InstagramPhoneStoryContent = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const { storyDetails } = useSelector(
    (state: RootState) => state.storyAutomation
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null); // ref for video element

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play(); // Play the video if it's paused
      } else {
        videoRef.current.pause(); // Pause the video if it's playing
      }
    }
  };
  const renderMediaContent = () => {
    switch (storyDetails?.media_type) {
      case "IMAGE":
        return (
          <Image
            src={
              storyDetails?.media_url ||
              "https://placehold.co/400x400?text=Story+Image"
            }
            alt={"story image"}
            objectFit="cover"
            width="full"
            onDoubleClick={() => setIsLiked(!isLiked)}
            onError={(e) => {
              const target = e.target as HTMLImageElement; // Cast to HTMLImageElement
              target.src = "https://placehold.co/400x400?text=Story+Image"; // Set the placeholder
            }}
          />
        );
      case "VIDEO":
        return (
          <Box overflow="hidden">
            <video
              ref={videoRef}
              src={storyDetails?.media_url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={handleVideoClick} // Add onClick handler
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "530px",
                objectFit: "cover",
                zIndex: 1,
              }}
            />
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <>
      {/* Mute Icon */}
      <Box
        position={"absolute"}
        top="10"
        right={"2"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        cursor="pointer"
        zIndex={20}
        onClick={() => setIsMuted(!isMuted)}
      >
        <Icon
          as={isMuted ? MdVolumeOff : MdVolumeUp}
          boxSize={4}
          color="white"
          cursor="pointer"
        />
      </Box>

      {/* Story Content Area */}
      <Box
        display={"flex"}
        alignItems={"center"}
        bgColor={"gray.900"}
        justifyContent={"center"}
        width={"100%"}
        h={"530px"}
        position="relative"
        onDoubleClick={() => setIsLiked(!isLiked)}
      >
        {renderMediaContent()}
      </Box>

      <Box
        py={2}
        bg={"gray.900"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection="row"
        gap="1rem"
        zIndex={20}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsCommentPopupOpen(!isCommentPopupOpen)}
        >
          <BiComment
            size="1.5rem"
            color="white"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
              transition: "all 0.2s ease",
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          cursor="pointer"
          onClick={() => setIsCommentPopupOpen(!isCommentPopupOpen)}
          color={"white"}
          border={1}
          borderRadius={"full"}
          borderColor={"gray.400"}
          borderStyle={"solid"}
          py={2}
          px={4}
          width={"180px"}
        >
          Message
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Icon
            as={isLiked ? AiFillHeart : AiOutlineHeart}
            boxSize={"1.75rem"}
            color={isLiked ? "red.500" : "white"}
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
              transition: "all 0.2s ease",
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsCommentPopupOpen(!isCommentPopupOpen)}
        >
          <FiSend
            size="1.5rem"
            color="white"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
              transition: "all 0.2s ease",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default InstagramPhoneStoryContent;
