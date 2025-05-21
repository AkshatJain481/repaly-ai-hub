import { Box, Tabs, Text, Stack, Flex } from "@chakra-ui/react";
import { useGetMediaCommentsQuery } from "@/apis/instagram";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { primaryColor } from "@/utils/constants";
import CommentCard from "../common/CommentCard";
import { CommentData } from "@/utils/interfaces";

// Format UNIX timestamp (seconds) to "Apr 19, 1:25 PM"
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const IgCommentSection = () => {
  const [commentType, setCommentType] = useState<
    | "positive"
    | "negative"
    | "potential_buyers"
    | "tagged_comment"
    | "tagged_comment_dm"
    | "inquiry"
  >("positive");

  const { mediaDetails } = useSelector((state: RootState) => state.automation);

  const { data: rawData = [], isFetching } = useGetMediaCommentsQuery(
    {
      mediaId: mediaDetails?.id || "",
      type: commentType,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const commentsData: CommentData[] = rawData.map(
    ([commentTimestamp, username, comment, repliedComment, repliedTimestamp]: [
      number,
      string,
      string,
      string,
      number,
    ]) => ({
      commentTimestamp,
      username,
      comment,
      repliedComment,
      repliedTimestamp,
    })
  );

  const tabs = [
    "positive",
    "negative",
    "potential_buyers",
    "tagged_comment",
    "tagged_comment_dm",
    "inquiry",
  ] as const;

  return (
    <Box>
      <Tabs.Root
        lazyMount
        unmountOnExit
        defaultValue="positive"
        variant="plain"
      >
        <Tabs.List
          display="flex"
          bg="bg.muted"
          rounded="l3"
          p="1"
          overflowX="auto"
          whiteSpace="nowrap"
          gap={2}
        >
          {tabs.map((type) => (
            <Tabs.Trigger
              flex={1}
              key={type}
              onClick={() => setCommentType(type)}
              minW="150px"
              px={4}
              py={2}
              flexShrink={0}
              justifyContent="center"
              value={type}
            >
              {type
                .split("_")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ")}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator rounded="l2" />
        </Tabs.List>

        <Tabs.Content value={commentType}>
          {isFetching ? (
            <Flex alignItems={"center"} justifyContent={"center"} h={"30vh"}>
              <ClimbingBoxLoader size={16} color={primaryColor} />
            </Flex>
          ) : commentsData.length === 0 ? (
            <Flex alignItems={"center"} justifyContent={"center"} h={"30vh"}>
              <Text
                textAlign="center"
                mt={4}
                fontWeight="bold"
                fontSize="lg"
                color="gray.500"
              >
                No data available
              </Text>
            </Flex>
          ) : (
            <Stack gap={4} mt={4}>
              {commentsData.map((comment, idx) => (
                <CommentCard
                  key={idx}
                  username={comment.username}
                  timestamp={formatTimestamp(comment.commentTimestamp)}
                  question={comment.comment}
                  replyText={comment.repliedComment}
                  isReplySent={true}
                  replyTimestamp={formatTimestamp(comment.repliedTimestamp)}
                />
              ))}
            </Stack>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default IgCommentSection;
