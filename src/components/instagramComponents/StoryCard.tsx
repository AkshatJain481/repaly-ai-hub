import { Box, Image, Text, HStack, Button } from "@chakra-ui/react";
import { BsLightning } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { primaryColor } from "@/utils/constants";
import { StoryCardProp } from "@/utils/interfaces";
import { getFormattedDate } from "@/utils/commonFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StoryCard = ({ storyData }: { storyData: StoryCardProp }) => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);

  const handleNavigate = (tab?: string) => {
    const baseUrl = `/dashboard/instagram/story/${storyData?.story_id}`;
    const url = tab ? `${baseUrl}?tab=${tab}` : baseUrl;
    navigate(url);
  };

  return (
    <Box
      borderRadius="xl"
      bgColor="white"
      border="1px solid"
      borderColor="gray.200"
      cursor="pointer"
      onClick={() => handleNavigate()}
    >
      <Box
        position="relative"
        aspectRatio={1}
        borderTopRadius="xl"
        overflow="hidden"
        boxShadow="md"
      >
        {/* Image */}
        {storyData?.media_type === "IMAGE" ? (
          <Image
            src={
              storyData?.media_url ||
              "https://placehold.co/400x400?text=Story+Image"
            }
            alt="Media"
            width="100%"
            height="100%"
            objectFit="cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement; // Cast to HTMLImageElement
              target.src = "https://placehold.co/400x400?text=Story+Image"; // Set the placeholder
            }}
          />
        ) : (
          <>
            {videoError ? (
              <img
                src="https://placehold.co/400x400?text=Story+Image"
                alt="Placeholder"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <video
                src={storyData?.media_url}
                muted
                playsInline
                onLoadedData={(e) => e.currentTarget.pause()}
                onError={() => setVideoError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </>
        )}
      </Box>

      {/* Caption & Buttons */}
      <Box p={4}>
        <Text fontSize="sm" color="gray.500">
          {getFormattedDate(storyData?.timestamp)}
        </Text>

        <HStack mt={2} gap={2} justifyContent="space-around">
          <Button
            bgColor="gray.100"
            color="black"
            border="1px solid"
            borderColor="gray.200"
            flex="1"
            px={2}
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={1}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate("automate");
            }}
          >
            <BsLightning color={primaryColor} />
            <Text fontSize="sm">Automate</Text>
          </Button>
          <Button
            bgColor="gray.100"
            color="black"
            border="1px solid"
            borderColor="gray.200"
            flex="1"
            px={2}
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={1}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate("analytics");
            }}
          >
            <BiBarChart color={primaryColor} />
            <Text fontSize="sm">Analytics</Text>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default StoryCard;
