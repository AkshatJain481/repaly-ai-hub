
import { Button } from "@/components/ui/button";
import { BiChevronLeft } from "react-icons/bi";
import { useParams, Link, useSearchParams } from "react-router-dom";
import PhoneContainer from "@/components/common/PhoneContainer";
import InstagramStoryAutomateTab from "@/components/ui/InstagramStoryAutomateTab";
import InstagramPhoneStoryContent from "@/components/ui/InstagramPhoneStoryContent";
import { useGetStoryDetailsQuery } from "@/apis/instagram";
import Loading from "@/components/common/Loading";
import InstagramStoryAnalyticsTab from "@/components/ui/InstagramStoryAnalyticsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { IoStatsChart } from "react-icons/io5";

const InstagramStoryDetailPage = () => {
  const { storyId } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const { isFetching } = useGetStoryDetailsQuery(storyId || "", {
    skip: !storyId,
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-0 h-full p-2">
      {/* Back button */}
      <Link to={"/dashboard/instagram/story"}>
        <Button
          variant="ghost"
          className="text-gray-600 text-md w-fit font-normal px-0"
        >
          <BiChevronLeft className="h-5 w-5 mr-1" />
          Back to all posts
        </Button>
      </Link>

      <div className="overflow-auto mx-0 xl:mx-[5%]">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-32 w-full">
          {/* Left column - Post image and engagement */}
          <div className="mx-auto xl:mx-[3%] my-[5%]">
            <PhoneContainer>
              <InstagramPhoneStoryContent />
            </PhoneContainer>
          </div>
          {/* Right column - Analytics and stats */}
          <div className="flex flex-col gap-6 overflow-auto max-h-full xl:max-h-[90vh] w-full">
            {/* Post title section */}
            <div className="flex flex-col gap-2">
              <Tabs
                defaultValue={
                  ["automate", "analytics"].includes(tab || "")
                    ? tab
                    : "automate"
                }
              >
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="automate" className="flex items-center gap-2 font-bold">
                    <HiOutlineLightningBolt className="h-5 w-5" />
                    Automate
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2 font-bold">
                    <IoStatsChart className="h-5 w-5" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="automate">
                  <InstagramStoryAutomateTab />
                </TabsContent>
                <TabsContent value="analytics">
                  <InstagramStoryAnalyticsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramStoryDetailPage;
