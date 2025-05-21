
import { useGetMediaAnalyticsQuery, useGetMediaGraphAnalyticsQuery } from "@/apis/instagram";
import Loading from "../common/Loading";
import {
  FiShoppingCart,
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
  FiTag,
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
  ];

  const isLineChartDataEmpty =
    (!graphAnalyticsData?.by_10m || graphAnalyticsData.by_10m.length === 0) &&
    (!graphAnalyticsData?.by_1h || graphAnalyticsData.by_1h.length === 0);

  return (
    <div className="space-y-4">
      <button
        aria-label="Refresh"
        onClick={() => {
          refetchAnalytics();
          refetchGraphAnalytics();
        }}
        className="bg-transparent text-gray-600 hover:text-gray-800 transition duration-200 
                   font-bold border-2 border-solid border-gray-300 bg-white py-2 px-4 rounded-md
                   flex items-center gap-2"
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
      </button>
      {isAnalyticsLoading || isGraphAnalyticsLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="flex flex-col md:flex-row gap-6 items-center md:items-stretch"
          >
            {/* Automated replies overview */}
            <InstagramMediaReplyAnalytics
              totalReplies={analyticsData?.comment_by_us || 0}
              replyItems={replyItems}
            />

            {/* Pie Chart */}
            <div
              className="rounded-md p-6 bg-white border-2 border-solid border-gray-200
                       w-full md:w-1/2 flex items-center justify-center"
            >
              {analyticsData?.comment_by_us ? (
                <PieChart
                  data={pieChartData}
                  title="Automated Replies Breakdown"
                  customColors={pieChartColors}
                />
              ) : (
                <p
                  className="font-bold text-xl text-center text-gray-500"
                >
                  There is no analytics data available for this post!
                </p>
              )}
            </div>
          </div>

          {/* Line Chart */}
          {isLineChartDataEmpty ? (
            <div
              className="flex items-center justify-center h-[200px] border-2 border-solid border-gray-200 rounded-lg"
            >
              <p
                className="font-bold text-xl text-center text-gray-500"
              >
                There is no analytics data available for this post!
              </p>
            </div>
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
    </div>
  );
};

export default InstagramMediaAnalyticsTab;
