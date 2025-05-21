import { Stack, Button, Flex, Tabs, Box } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { secondaryTextColor } from "@/utils/constants";
import { BsLightning } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { useParams, Link, useSearchParams } from "react-router-dom";
import PhoneContainer from "@/components/common/PhoneContainer";
import InstagramStoryAutomateTab from "@/components/ui/InstagramStoryAutomateTab";
import InstagramPhoneStoryContent from "@/components/ui/InstagramPhoneStoryContent";
import { useGetStoryDetailsQuery } from "@/apis/instagram";
import Loading from "@/components/common/Loading";
import InstagramStoryAnalyticsTab from "@/components/ui/InstagramStoryAnalyticsTab";

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
    <Stack gap={0} height={"100%"} p={2}>
      {/* Back button */}
      <Link to={"/dashboard/instagram/story"}>
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

      <Stack overflow={"auto"} mx={{ base: "none", xl: "5%" }}>
        <Flex direction={{ base: "column", lg: "row" }} gap={32} width={"100%"}>
          {/* Left column - Post image and engagement */}
          <Box mx={{ base: "none", xl: "3%" }} my={"5%"}>
            <PhoneContainer>
              <InstagramPhoneStoryContent />
            </PhoneContainer>
          </Box>
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
                  <InstagramStoryAutomateTab />
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
                  <InstagramStoryAnalyticsTab />
                </Tabs.Content>
              </Tabs.Root>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default InstagramStoryDetailPage;
