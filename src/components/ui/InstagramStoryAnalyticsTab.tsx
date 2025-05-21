import { Stack, Box, Button } from "@chakra-ui/react";
import { useGetStoryAnalyticsQuery } from "@/apis/instagram";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loading from "../common/Loading";
import { BiRefresh } from "react-icons/bi";
import TaggedComments from "./TaggedComments";

const InstagramStoryAnalyticsTab = () => {
  const { storyDetails } = useSelector(
    (state: RootState) => state.storyAutomation
  );

  const {
    data: analyticsData,
    isFetching: isAnalyticsLoading,
    refetch: refetchAnalytics,
  } = useGetStoryAnalyticsQuery(storyDetails?.story_id || "", {
    refetchOnMountOrArgChange: true,
  });

  return (
    <Stack gap={6}>
      <Button
        aria-label="Refresh"
        onClick={() => refetchAnalytics()}
        size="xl"
        bg="transparent"
        color="gray.600"
        maxW={"150px"}
        _hover={{ color: "gray.800" }}
        transition="all 0.2s ease"
        fontWeight={"bold"}
        borderStyle={"solid"}
        borderWidth={2}
        borderColor={"gray.300"}
        bgColor={"white"}
      >
        <BiRefresh
          style={{
            animation: isAnalyticsLoading ? "spin 1s linear infinite" : "none",
            transition: "transform 0.7s ease-in-out",
            height: "30px",
            width: "30px",
          }}
        />
        Refresh
      </Button>
      <Box borderRadius="md" p={6} bg="white" boxShadow="sm">
        <Box bg="gray.50" borderRadius="md">
          {isAnalyticsLoading ? (
            <Loading />
          ) : (
            <TaggedComments
              comments={analyticsData?.comments_by_type?.tagged || []}
            />
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default InstagramStoryAnalyticsTab;
