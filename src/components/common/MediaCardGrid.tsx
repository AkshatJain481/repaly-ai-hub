import { Box, Image, Text, HStack, Badge, Button } from "@chakra-ui/react";
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
        {/* Unattended Comments Badge */}
        {unattendedComments > 0 && (
          <Badge
            position="absolute"
            bg="#f04f4d"
            width="100%"
            color="white"
            fontSize="sm"
            px={2}
            py={1}
            zIndex={10}
            borderRadius="none"
            display="flex"
            fontWeight={700}
            justifyContent="center"
          >
            {unattendedComments} Unattended Comments
          </Badge>
        )}

        {/* Image */}
        <Image
          src={
            mediaData?.media_type === "IMAGE"
              ? mediaData?.media_url
              : mediaData?.thumbnail_url
          }
          alt="Media"
          width="100%"
          height="100%"
          objectFit="cover"
        />

        {/* Hover Overlay */}
        <Box className="text-white absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
          <HStack gap={3}>
            <HStack>
              <FaHeart size={20} />
              <Text fontSize="sm">{mediaData?.like_count}</Text>
            </HStack>
            <HStack>
              <FaRegCommentAlt size={20} />
              <Text fontSize="sm">{mediaData?.comments_count}</Text>
            </HStack>
            <HStack>
              <FaRegBookmark size={20} />
              <Text fontSize="sm">{mediaData?.saved}</Text>
            </HStack>
          </HStack>
          <HStack gap={3} mt={2}>
            Total Engagements: {mediaData?.reach}
          </HStack>
        </Box>
      </Box>

      {/* Caption & Buttons */}
      <Box p={4}>
        <Text fontSize="lg" fontWeight={700} lineClamp={1}>
          {mediaData?.caption || "No Caption"}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {getFormattedDate(mediaData?.timestamp)}
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

export default MediaCardGrid;
