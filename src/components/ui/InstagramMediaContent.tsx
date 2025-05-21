import { useState } from "react";
import { Box, Flex, Text, Icon, Avatar, Image, Input } from "@chakra-ui/react";
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
    <Flex
      justifyContent={isSent ? "flex-end" : "flex-start"}
      mb={2}
      width="100%"
    >
      <Box
        maxW="70%"
        bg={isSent ? "blue.500" : "gray.700"}
        color="white"
        px={3}
        py={2}
        borderRadius="xl"
        position="relative"
      >
        <Text fontSize="sm">{content}</Text>
        <Text fontSize="xs" color="whiteAlpha.700" textAlign="right" mt={1}>
          {timestamp}
        </Text>
      </Box>
    </Flex>
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
    <Flex gap={3} width="100%" px={4} py={2} alignItems="center">
      <Avatar.Root size="lg">
        <Avatar.Fallback boxSize={12} as={PiUserCircleDuotone} />
        <Avatar.Image src={userImgUrl} />
      </Avatar.Root>
      <Box flex={1}>
        <Flex alignItems="center" gap={2}>
          <Text
            fontWeight="bold"
            fontSize="sm"
            color="whiteAlpha.900"
            truncate
            maxW={"120px"}
          >
            {username}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.600" whiteSpace="nowrap">
            {timestamp}
          </Text>
        </Flex>

        <Text fontSize="sm" color="whiteAlpha.900" mt={0.5}>
          {content}
        </Text>
        {!isReply && (
          <Flex gap={4} mt={1}>
            <Text fontSize="xs" color="whiteAlpha.600" cursor="pointer">
              Reply
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600" cursor="pointer">
              See translation
            </Text>
          </Flex>
        )}
      </Box>
      <Icon
        as={AiOutlineHeart}
        color="whiteAlpha.600"
        cursor="pointer"
        boxSize={5}
      />
    </Flex>
  );
};

// Comment Popup Component
const MotionBox = motion(Box);
const InstagramDMPopup = () => {
  const { responseDM } = useSelector((state: RootState) => state.automation);

  return (
    <AnimatePresence>
      <MotionBox
        position="absolute"
        top={8}
        bottom={0}
        left={0}
        right={0}
        bgColor="black"
        zIndex={1000}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <Flex
          py={3}
          px={4}
          borderBottom="1px solid"
          borderColor="gray.800"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={3}>
            <Icon as={BsArrowLeft} color="white" boxSize={5} cursor="pointer" />
            <Avatar.Root size="md">
              <Avatar.Fallback boxSize={10} as={PiUserCircleDuotone} />
            </Avatar.Root>
            <Box>
              <Text color="white" fontWeight="semibold">
                Test User
              </Text>
              <Text color="whiteAlpha.700" fontSize="xs">
                Active 2h ago
              </Text>
            </Box>
          </Flex>
          <Icon as={FiSend} color="white" boxSize={5} cursor="pointer" />
        </Flex>

        {/* Messages Section */}
        <Box
          height="calc(100% - 128px)"
          overflowY="auto"
          p={4}
          display="flex"
          flexDirection="column"
        >
          <Flex direction="column" width="100%">
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
          </Flex>
        </Box>

        {/* Message Input Section - Simplified */}
        <Flex
          p={4}
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          alignItems="center"
          gap={3}
          position="absolute"
          bottom={0}
          width="100%"
        >
          <Box flex={1} position="relative">
            <Input
              readOnly={true}
              placeholder="Message..."
              bg="whiteAlpha.100"
              border="none"
              borderRadius="full"
              color="white"
              _placeholder={{ color: "whiteAlpha.600" }}
              _focus={{ boxShadow: "none" }}
            />
          </Box>
          <Box>
            <Icon
              as={FiSend}
              color={"blue.500"}
              cursor={"pointer"}
              boxSize={5}
            />
          </Box>
        </Flex>
      </MotionBox>
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
      <MotionBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgColor="black"
        borderTopRadius="3xl"
        zIndex={1000}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <Flex
          py={3}
          borderBottom="1px solid"
          borderColor="gray.800"
          alignItems="center"
          justifyContent={"center"}
          flexDir={"column"}
          gap={2}
        >
          <Box w={"40px"} h={"2px"} bgColor={"gray.400"}></Box>
          <Text color="white" fontWeight="semibold">
            Comments
          </Text>
        </Flex>

        {/* Comment List Section */}
        <Box maxH="60vh" overflowY="auto" py={2}>
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
            <Box pl={6} mt={1}>
              <CommentItem
                username={activeAccount?.username || "You"}
                content={responseComment}
                isReply={true}
                timestamp="Just now"
                userImgUrl={activeAccount?.profile_picture_url}
              />
            </Box>
          )}
        </Box>

        {/* Comment Input Section */}
        <Flex
          p={3}
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          alignItems="center"
          gap={3}
        >
          <Avatar.Root size="lg">
            <Avatar.Fallback boxSize={12} as={PiUserCircleDuotone} />
            <Avatar.Image src={activeAccount?.profile_picture_url} />
          </Avatar.Root>

          <Box flex={1} p={2} borderRadius="full" bgColor="whiteAlpha.100">
            <Text color="whiteAlpha.600" fontSize="sm">
              Start the conversation...
            </Text>
          </Box>
          <Text
            color="blue.400"
            fontWeight="semibold"
            fontSize="sm"
            cursor="pointer"
          >
            Send
          </Text>
        </Flex>
      </MotionBox>
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
          <Image
            src={mediaDetails?.media_url}
            alt={mediaDetails?.caption}
            objectFit="cover"
            width="full"
            maxH={"586px"}
            onDoubleClick={() => setIsLiked(!isLiked)}
          />
        );
      case "VIDEO":
        return (
          <Box
            position="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            borderRadius="lg"
            onDoubleClick={() => setIsLiked(!isLiked)}
          >
            <Image
              src={mediaDetails?.thumbnail_url || mediaDetails?.media_url}
              alt={mediaDetails?.caption}
              objectFit="cover"
              width="full"
            />
            {isHovering && (
              <video
                src={mediaDetails?.media_url}
                autoPlay
                loop
                muted={isMuted}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
              />
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        position="absolute"
        bottom="12"
        right="10px"
        display="flex"
        flexDirection="column"
        gap="1rem"
        zIndex={20}
      >
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
          <Text
            color="white"
            fontSize="xs"
            mt="1"
            textShadow="0 1px 2px rgba(0,0,0,0.5)"
          >
            {mediaDetails?.like_count}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
        >
          <BiComment
            size="1.5rem"
            color="white"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
              transition: "all 0.2s ease",
            }}
          />

          <Text
            color="white"
            fontSize="xs"
            mt="1"
            textShadow="0 1px 2px rgba(0,0,0,0.5)"
          >
            {mediaDetails?.comments_count}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
        >
          <FiSend
            size="1.5rem"
            color="white"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
              transition: "all 0.2s ease",
            }}
          />

          <Text
            color="white"
            fontSize="xs"
            mt="1"
            textShadow="0 1px 2px rgba(0,0,0,0.5)"
          >
            {mediaDetails?.shares}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
        >
          <FaRegBookmark
            size="1.5rem"
            color="white"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
              transition: "all 0.2s ease",
            }}
          />

          <Text
            color="white"
            fontSize="xs"
            mt="1"
            textShadow="0 1px 2px rgba(0,0,0,0.5)"
          >
            {mediaDetails?.saved}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsMuted(!isMuted)}
        >
          <Icon
            as={isMuted ? MdVolumeOff : MdVolumeUp}
            boxSize={4}
            color="white"
            cursor="pointer"
          />
        </Box>
      </Box>

      {/* Post Caption and Account */}
      <Flex
        position="absolute"
        bottom="12"
        left="5"
        align="center"
        gap="2"
        zIndex="10"
      >
        <Avatar.Root size="xl">
          <Avatar.Fallback boxSize={12} as={PiUserCircleDuotone} />
          <Avatar.Image src={activeAccount?.profile_picture_url} />
        </Avatar.Root>

        <Flex direction="column">
          <Text
            fontWeight="bold"
            fontSize="sm"
            color="white"
            textShadow="0 1px 2px rgba(0,0,0,0.8)"
          >
            {activeAccount?.username || "User Name"}
          </Text>

          <Box position="relative" pr={14}>
            <Box
              fontSize="xs"
              color="whiteAlpha.900"
              textShadow="0 1px 2px rgba(0,0,0,0.8)"
              position="relative"
              overflow="hidden"
              transition={
                isCaptionExpanded ? "max-height 0.4s ease-in" : "none"
              }
              maxH={isCaptionExpanded ? "500px" : "2.8em"}
              display="-webkit-box"
              style={{
                WebkitLineClamp: isCaptionExpanded ? "unset" : 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {mediaDetails?.caption}
              {isCaptionExpanded && (
                <Text fontWeight="bold" mt={1}>
                  Posted on {getFormattedDate(mediaDetails?.timestamp || "")}
                </Text>
              )}
            </Box>

            <Text
              onClick={() => setIsCaptionExpanded(!isCaptionExpanded)}
              fontSize="xs"
              mt={1}
              textShadow="0 1px 2px rgba(0,0,0,0.8)"
              color="white"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              transition="color 0.2s"
            >
              {isCaptionExpanded ? "less" : "more"}
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* Post Content Area */}
      <Box
        opacity={isCaptionExpanded ? 0.7 : 1}
        display={"flex"}
        alignItems={"center"}
        bgColor={"gray.900"}
        justifyContent={"center"}
        width={"100%"}
        height={"586px"}
      >
        {renderMediaContent()}
      </Box>

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
