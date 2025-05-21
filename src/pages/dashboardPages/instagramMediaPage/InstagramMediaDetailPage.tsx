
import { Button } from "@/components/ui/button";
import { BiChevronLeft } from "react-icons/bi";
import InstagramMediaAnalyticsTab from "@/components/ui/InstagramMediaAnalyticsTab";
import InstagramMediaAutomateTab from "../../../components/ui/InstagramMediaAutomateTab";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useGetMediaDetailsQuery } from "@/apis/instagram";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import PhoneContainer from "@/components/common/PhoneContainer";
import InstagramMediaContent from "@/components/ui/InstagramMediaContent";
import { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { IoStatsChart } from "react-icons/io5";

const InstagramMediaDetailPage = () => {
  const { mediaId } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [phoneTab, setPhoneTab] = useState<string>("post");
  const { tags, responseDM, responseComment } = useSelector(
    (state: RootState) => state.automation
  );
  const { isLoading } = useGetMediaDetailsQuery(mediaId || "", {
    skip: !mediaId,
    refetchOnMountOrArgChange: true,
  });
  
  useEffect(() => {
    if (
      (tags && tags.length > 0) ||
      (responseComment && responseComment.trim() !== "")
    ) {
      setPhoneTab("comments");
    }
  }, [tags, responseComment]);

  useEffect(() => {
    if (responseDM && responseDM.trim() !== "") {
      setPhoneTab("dm");
    }
  }, [responseDM]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-0 h-full p-2">
      {/* Back button */}
      <Link to={"/dashboard/instagram/media"}>
        <Button
          variant="ghost"
          className="text-gray-600 text-md w-fit font-normal px-0"
        >
          <BiChevronLeft className="h-5 w-5 mr-1" />
          Back to all posts
        </Button>
      </Link>
      <div className="mx-0 xl:mx-[3%]">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left column - Post image and engagement */}
          <div className="flex flex-col mx-0 xl:mx-[3%] justify-normal xl:justify-center my-[5%] xl:my-0 gap-8">
            <PhoneContainer>
              <InstagramMediaContent tab={phoneTab} />
            </PhoneContainer>
            <div className="flex w-full justify-center">
              <Tabs value={phoneTab} onValueChange={setPhoneTab}>
                <TabsList>
                  <TabsTrigger value="post" className="font-bold">
                    Post
                  </TabsTrigger>
                  <TabsTrigger value="comments" className="font-bold">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="dm" className="font-bold">
                    DM
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
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
                  <InstagramMediaAutomateTab />
                </TabsContent>
                <TabsContent value="analytics">
                  <InstagramMediaAnalyticsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramMediaDetailPage;
