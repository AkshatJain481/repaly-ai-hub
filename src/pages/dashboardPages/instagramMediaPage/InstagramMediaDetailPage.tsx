import { Stack, Button, Flex, Tabs } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { secondaryTextColor } from "@/utils/constants";
import { BsLightning } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
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
    <Stack gap={0} height={"100%"} p={2}>
      {/* Back button */}
      <Link to={"/dashboard/instagram/media"}>
        <Button
          color={secondaryTextColor}
          bg="transparent"
          fontSize={"md"}
          width="fit-content"
          fontWeight="normal"
          px={0}
        >
          <IoChevronBack />
          Back to all posts
        </Button>
      </Link>
      <Stack mx={{ base: "none", xl: "3%" }}>
        <Flex direction={{ base: "column", lg: "row" }} gap={6} width={"100%"}>
          {/* Left column - Post image and engagement */}
          <Flex
            mx={{ base: "none", xl: "3%" }}
            justifyContent={{ base: "normal", xl: "center" }}
            flexDir={"column"}
            my={{ base: "5%", xl: "0%" }}
            spaceY={8}
          >
            <PhoneContainer>
              <InstagramMediaContent tab={phoneTab} />
            </PhoneContainer>
            <Flex width={"100%"} justifyContent={"center"}>
              <Tabs.Root value={phoneTab} variant="plain">
                <Tabs.List bg="bg.muted" rounded="l3" p="1">
                  <Tabs.Trigger
                    onClick={() => setPhoneTab("post")}
                    value="post"
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    Post
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    onClick={() => setPhoneTab("comments")}
                    value="comments"
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    Comments
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    onClick={() => setPhoneTab("dm")}
                    value="dm"
                    fontWeight={"bold"}
                    color={"gray.600"}
                  >
                    DM
                  </Tabs.Trigger>
                  <Tabs.Indicator rounded="l2" />
                </Tabs.List>
              </Tabs.Root>
            </Flex>
          </Flex>

          {/* Right column - Analytics and stats */}
          <Stack
            gap={6}
            overflow={"auto"}
            maxH={{ base: "100%", xl: "90vh" }}
            width={"100%"}
          >
            {/* Post title section */}
            <Stack gap={2}>
              <Tabs.Root
                lazyMount
                unmountOnExit
                defaultValue={
                  ["automate", "analytics"].includes(tab || "")
                    ? tab
                    : "automate"
                }
                size={"lg"}
                variant={"plain"}
                w="full"
              >
                <Tabs.List
                  bg="bg.muted"
                  rounded="l3"
                  p="2"
                  w="full"
                  display="flex" // Use flexbox
                >
                  <Tabs.Trigger
                    value="automate"
                    fontWeight={"bold"}
                    flex="1" // This makes the trigger expand to fill available space equally
                    justifyContent={"center"}
                    _selected={{
                      color: "black",
                    }}
                  >
                    <BsLightning size={24} />
                    Automate
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="analytics"
                    fontWeight={"bold"}
                    flex="1" // This makes the trigger expand to fill available space equally
                    justifyContent={"center"}
                    _selected={{
                      color: "black",
                    }}
                  >
                    <BiBarChart size={24} />
                    Analytics
                  </Tabs.Trigger>
                  <Tabs.Indicator rounded="l2" bgColor={"gray.200"} />
                </Tabs.List>
                <Tabs.Content
                  value="automate"
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                  }}
                >
                  <InstagramMediaAutomateTab />
                </Tabs.Content>
                <Tabs.Content
                  value="analytics"
                  _open={{
                    animationName: "fade-in, scale-in",
                    animationDuration: "300ms",
                  }}
                  _closed={{
                    animationName: "fade-out, scale-out",
                    animationDuration: "120ms",
                  }}
                >
                  <InstagramMediaAnalyticsTab />
                </Tabs.Content>
              </Tabs.Root>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default InstagramMediaDetailPage;
