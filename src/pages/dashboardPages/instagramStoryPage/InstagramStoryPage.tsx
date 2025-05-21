import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import { StoryCardProp } from "@/utils/interfaces";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AccountDropdown from "@/components/ui/AccountDropdown";
import { BiRefresh } from "react-icons/bi";
import { useGetRecentStoriesQuery } from "@/apis/instagram";
import StoryCard from "@/components/instagramComponents/StoryCard";
import { Navigate } from "react-router-dom";

const InstagramStoryPage = () => {
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const {
    data: storyData = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetRecentStoriesQuery(activeAccount?.id || "", {
    skip: !activeAccount?.id,
  });

  if (!activeAccount && !isLoading) {
    return <Navigate to={"/dashboard"} />;
  }

  const renderMedia = () => {
    return (
      <>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          wrap={"wrap"}
          gap={4}
        >
          <Stack gap={0}>
            <Text fontSize={30} fontWeight={700}>
              Instagram Stories
            </Text>
            <Text color={"gray.500"}>
              Automate your Instagram stories with ease
            </Text>
          </Stack>
          <Flex
            alignItems={{ sm: "end" }}
            flexDir={{ base: "column", sm: "row" }}
            gap={4}
            width={{ base: "100%", sm: "auto" }}
          >
            <Button
              aria-label="Refresh"
              onClick={() => refetch()}
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
                  animation: isFetching ? "spin 1s linear infinite" : "none",
                  transition: "transform 0.7s ease-in-out",
                  height: "30px",
                  width: "30px",
                }}
              />
              Refresh
            </Button>
            <AccountDropdown />
          </Flex>
        </Flex>
        {isLoading ? (
          <Loading />
        ) : storyData.length === 0 ? (
          <Flex alignItems={"center"} justifyContent={"center"} h={"70vh"}>
            <Text
              textAlign="center"
              mt={6}
              color="gray.500"
              fontSize="4xl"
              fontWeight="semibold"
            >
              No Stories Available!
            </Text>
          </Flex>
        ) : (
          <Stack
            display={"grid"}
            gridTemplateColumns={{
              base: "repeat(auto-fit, minmax(250px, 400px))",
              lg: "repeat(auto-fit, minmax(300px, 350px))",
            }}
            gap={4}
            overflow={"auto"}
            className="hide-scrollbar"
          >
            {storyData?.map((data: StoryCardProp) => (
              <StoryCard key={data.story_id} storyData={data} />
            ))}
          </Stack>
        )}
      </>
    );
  };

  return (
    <Stack
      p={2}
      gap={6}
      height="90vh"
      overflow={"hidden"}
      className="hide-scrollbar"
    >
      {renderMedia()}
    </Stack>
  );
};

export default InstagramStoryPage;
