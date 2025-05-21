import { Button, Stack, Box, Flex } from "@chakra-ui/react";
import { HiOutlineLightningBolt } from "react-icons/hi";
import TagManagement from "./TagManagment";
import AIEnabledInteractions from "./AISettings";
import {
  usePutAutomationMutation,
  useTurnOffAutomationMutation,
} from "../../apis/automation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MdOutlineDangerous } from "react-icons/md";
import ConfirmationPopup from "../common/ConfirmationPopup";
import { useState } from "react";
import { useLazyGetMediaDetailsQuery } from "@/apis/instagram";

const InstagramMediaAutomateTab = () => {
  const [putAutomation, { isLoading: isApplyAutomationLoading }] =
    usePutAutomationMutation();
  const [turnOffAutomation, { isLoading: isTurnOffAutomationLoading }] =
    useTurnOffAutomationMutation();
  const [triggerGetMediaDetails, { isLoading: isMediaDetailsLoading }] =
    useLazyGetMediaDetailsQuery();
  const { mediaDetails } = useSelector((state: RootState) => state.automation);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleTurnOff = async () => {
    try {
      await turnOffAutomation({ mediaId: mediaDetails?.id || "" }).unwrap();
      await triggerGetMediaDetails(mediaDetails?.id || "").unwrap();
      toast.success("Automation turned off!");
    } catch (err) {
      console.error("Failed to turn off automation:", err);
      toast.error(
        "Failed to turn of automation! Please try again after some time."
      );
    } finally {
      setIsPopupOpen(false);
    }
  };

  const applyAutomation = async () => {
    const { error } = await putAutomation({
      mediaId: mediaDetails?.id || "",
    });

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
      <ConfirmationPopup
        message="This action will result in DELETION of ALL automation settings, still want to proceed?"
        isOpen={isPopupOpen}
        onConfirm={handleTurnOff}
        loading={isTurnOffAutomationLoading || isMediaDetailsLoading}
        title="Turn Off Automation?"
        onClose={() => setIsPopupOpen(false)}
      />
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

        <Flex
          fontSize={"3xl"}
          fontWeight={"bold"}
          alignItems={"center"}
          flexDir={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
        >
          <p className="bg-gradient-to-r from-[#9b87f5] to-[#3e83f6] bg-clip-text text-transparent">
            Response Settings
          </p>
          <Button
            bgColor={"red.500"}
            fontWeight={"bold"}
            fontSize={"sm"}
            color={"white"}
            onClick={() => setIsPopupOpen(true)}
          >
            <MdOutlineDangerous />
            Turn Off Automation
          </Button>
        </Flex>

        {/* Main Content */}
        <TagManagement />
        <AIEnabledInteractions />
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
          loading={isApplyAutomationLoading}
        >
          <HiOutlineLightningBolt size={20} />
          Apply Automation
        </Button>
      </Flex>
    </Box>
  );
};

export default InstagramMediaAutomateTab;
