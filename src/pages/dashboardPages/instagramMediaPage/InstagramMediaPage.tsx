import { useMemo } from "react";
import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import MediaCardGrid from "@/components/common/MediaCardGrid";
import { MediaCardProp } from "@/utils/interfaces";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AccountDropdown from "@/components/ui/AccountDropdown";
import { BiRefresh } from "react-icons/bi";
import { useGetRecentMediaQuery } from "@/apis/instagram";
import { Navigate } from "react-router-dom";

const InstagramMediaPage = () => {
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const {
    data = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetRecentMediaQuery(activeAccount?.id || "", {
    skip: !activeAccount,
  });

  const mediaData = useMemo(() => {
    return [...data].sort(
      (a: MediaCardProp, b: MediaCardProp) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [data]);

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
              Instagram Posts
            </Text>
            <Text color={"gray.500"}>
              Automate your Instagram posts with ease
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
        ) : (
          <Stack
            display={"grid"}
            gridTemplateColumns={{
              base: "repeat(auto-fit, minmax(250px, 400px))", // Auto-adjusting columns
              lg: "repeat(auto-fit, minmax(300px, 350px))", // Larger min-size on large screens
            }}
            gap={4}
            overflow={"auto"}
            className="hide-scrollbar"
          >
            {mediaData
              ?.slice(0)
              .map((data: MediaCardProp) => (
                <MediaCardGrid
                  key={data.id}
                  mediaData={data}
                  unattendedComments={0}
                />
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

export default InstagramMediaPage;
