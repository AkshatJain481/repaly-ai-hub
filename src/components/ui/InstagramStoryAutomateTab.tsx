import { Button, Stack, Box, Flex } from "@chakra-ui/react";
import { HiOutlineLightningBolt } from "react-icons/hi";
import StoryTagManagement from "./StoryTagManagement";
import { useStoryAutomationMutation } from "../../apis/automation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const InstagramStoryAutomateTab = () => {
  const [storyAutomation, { isLoading }] = useStoryAutomationMutation();
  const { storyDetails } = useSelector(
    (state: RootState) => state.storyAutomation
  );
  const applyAutomation = async () => {
    const { error } = await storyAutomation(storyDetails?.story_id || "");

    if (error) {
      const errorMessage =
        "data" in error
          ? (error.data as any) || "Failed to update automation settings"
          : "Failed to update automation settings";

      toast.error(errorMessage);
      return;
    }

    toast.success("Automation settings updated successfully");
  };

  return (
    <Box position="relative">
      {/* Add padding at the bottom to prevent content from being hidden under sticky button */}
      <Stack
        bgColor={"white"}
        p={4}
        border={"2px"}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        rounded={"xl"}
        gap={4}
      >
        {/* Tabs List positioned at the top right */}

        <Stack fontSize={"3xl"} fontWeight={"bold"}>
          <p className="bg-gradient-to-r from-[#9b87f5] to-[#3e83f6] bg-clip-text text-transparent">
            Response Settings
          </p>
        </Stack>
        {/* Main Content */}
        <StoryTagManagement />
      </Stack>
      {/* Sticky Button Container */}
      <Flex
        position="fixed"
        bottom={"3%"}
        right={"10%"}
        justifyContent="center"
        zIndex="999"
        pointerEvents="none" // This ensures the container doesn't block clicks on underlying elements
      >
        <Button
          width="auto"
          minW="200px"
          bg="purple.600"
          color="white"
          px={4}
          py={2}
          rounded="4px"
          border="2px"
          borderStyle="solid"
          fontWeight={550}
          borderColor="purple.600"
          _hover={{ bg: "purple.400" }}
          onClick={applyAutomation}
          boxShadow="lg"
          pointerEvents="auto" // Make sure the button itself can be clicked
          loadingText="Applying..."
          loading={isLoading}
        >
          <HiOutlineLightningBolt size={20} />
          Apply Automation
        </Button>
      </Flex>
    </Box>
  );
};

export default InstagramStoryAutomateTab;
