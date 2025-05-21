import { Flex, Box, Text, Button } from "@chakra-ui/react";
import {
  useGetMediaAnalyticsQuery,
  useGetMediaGraphAnalyticsQuery,
} from "@/apis/instagram";
import Loading from "../common/Loading";
import {
  FiShoppingCart,
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
  FiTag,
  // FiMail,
} from "react-icons/fi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { AnalyticsReplyItem } from "@/utils/interfaces";
import InstagramMediaReplyAnalytics from "./InstagramMediaReplyAnalytics";
import PieChart from "../common/PieChart";
import LineChart from "../common/LineChart";
import IgCommentSection from "../instagramComponents/IgCommentSection";
import { BiRefresh } from "react-icons/bi";

const InstagramMediaAnalyticsTab = () => {
  const { mediaDetails } = useSelector((state: RootState) => state.automation);

  const {
    data: analyticsData,
    isFetching: isAnalyticsLoading,
    refetch: refetchAnalytics,
  } = useGetMediaAnalyticsQuery(mediaDetails?.id || "", {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: graphAnalyticsData,
    isFetching: isGraphAnalyticsLoading,
    refetch: refetchGraphAnalytics,
  } = useGetMediaGraphAnalyticsQuery(mediaDetails?.id || "", {
    refetchOnMountOrArgChange: true,
  });

  const pieChartData = [
    {
      label: "Inquiry Replies",
      value: analyticsData?.inquiry || 0,
    },
    {
      label: "Positive Replies",
      value: analyticsData?.positive_comments || 0,
    },
    {
      label: "Negative Replies",
      value: analyticsData?.negative_comments || 0,
    },
    {
      label: "Buyer Replies",
      value: analyticsData?.potential_buyers || 0,
    },
    {
      label: "Tagged Comment Replies",
      value: analyticsData?.tagged_comment || 0,
    },
    {
      label: "Tagged DM Replies",
      value: analyticsData?.tagged_comment_dm || 0,
    },
    // {
    //   label: "DM Replies",
    //   value: analyticsData?.DMs_by_us || 0,
    // },
  ];

  const pieChartColors = [
    "#4287f5",
    "#03fc28",
    "#f51105",
    "#ff008c",
    "#00d8f0",
    "#ffee00",
    "#ff9d00",
  ];

  const replyItems: AnalyticsReplyItem[] = [
    {
      title: "Inquiry Replies",
      subtitle: "Questions answered automatically",
      count: analyticsData?.inquiry || 0,
      icon: FiMessageSquare,
    },
    {
      title: "Positive Replies",
      subtitle: "Appreciation responses sent",
      count: analyticsData?.positive_comments || 0,
      icon: FiThumbsUp,
    },
    {
      title: "Negative Replies",
      subtitle: "Critical comments addressed",
      count: analyticsData?.negative_comments || 0,
      icon: FiThumbsDown,
    },
    {
      title: "Buyer Replies",
      subtitle: "Purchase interests engaged",
      count: analyticsData?.potential_buyers || 0,
      icon: FiShoppingCart,
    },
    {
      title: "Tagged Comment Replies",
      subtitle: "Tagged comments replied to in comment",
      count: analyticsData?.tagged_comment || 0,
      icon: FiTag,
    },
    {
      title: "Tagged DM Replies",
      subtitle: "Tagged comments replied to in DM",
      count: analyticsData?.tagged_comment_dm || 0,
      icon: FiTag,
    },
    // {
    //   title: "DM Replies",
    //   subtitle: "Direct messages sent",
    //   count: analyticsData?.DMs_by_us || 0,
    //   icon: FiMail,
    // },
  ];

  const isLineChartDataEmpty =
    (!graphAnalyticsData?.by_10m || graphAnalyticsData.by_10m.length === 0) &&
    (!graphAnalyticsData?.by_1h || graphAnalyticsData.by_1h.length === 0);

  return (
    <Box spaceY={4}>
      <Button
        aria-label="Refresh"
        onClick={() => {
          refetchAnalytics();
          refetchGraphAnalytics();
        }}
        size="xl"
        bg="transparent"
        color="gray.600"
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
            animation:
              isAnalyticsLoading || isGraphAnalyticsLoading
                ? "spin 1s linear infinite"
                : "none",
            transition: "transform 0.7s ease-in-out",
            height: "30px",
            width: "30px",
          }}
        />
        Refresh
      </Button>
      {isAnalyticsLoading || isGraphAnalyticsLoading ? (
        <Loading />
      ) : (
        <>
          <Flex
            gap={6}
            flexDir={{ base: "column", md: "row" }}
            align={{ base: "center", md: "stretch" }} // stretch children heights on md+
          >
            {/* Automated replies overview */}
            <InstagramMediaReplyAnalytics
              totalReplies={analyticsData?.comment_by_us || 0}
              replyItems={replyItems}
            />

            {/* Pie Chart */}
            <Box
              borderRadius="md"
              p={6}
              bg="white"
              border={2}
              borderStyle={"solid"}
              borderColor={"gray.200"}
              w={{ base: "full", md: "1/2" }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {analyticsData?.comment_by_us ? (
                <PieChart
                  data={pieChartData}
                  title="Automated Replies Breakdown"
                  customColors={pieChartColors}
                />
              ) : (
                <Text
                  fontWeight={"bold"}
                  fontSize={"xl"}
                  textAlign={"center"}
                  color={"gray.500"}
                >
                  There is no analytics data available for this post!
                </Text>
              )}
            </Box>
          </Flex>

          {/* Line Chart */}
          {isLineChartDataEmpty ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              h={"200px"}
              border={2}
              borderStyle={"solid"}
              borderColor={"gray.200"}
              borderRadius={"lg"}
            >
              <Text
                fontWeight={"bold"}
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.500"}
              >
                There is no analytics data available for this post!
              </Text>
            </Box>
          ) : (
            <LineChart
              attributes={[
                "positive",
                "negative",
                "potential_buyers",
                "tagged_comment",
                "tagged_comment_dm",
                "inquiry",
              ]}
              title="Comment Timeline"
              rawData={graphAnalyticsData!}
              colors={pieChartColors}
            />
          )}
          <IgCommentSection />
        </>
      )}
    </Box>
  );
};

export default InstagramMediaAnalyticsTab;
