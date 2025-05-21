import { Button, Box, Stack, Flex, Text } from "@chakra-ui/react";
import { FiX, FiCheck, FiAlertTriangle } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

const ConfirmationPopup = ({
  loading = false,
  isOpen,
  onClose,
  message,
  onConfirm,
  title = "Confirm Action",
}: {
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
  title?: string;
}) => {
  if (!isOpen) return null;

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      zIndex="overlay"
      width="100vw"
      height="100vh"
      bg="blackAlpha.700"
      align="center"
      justify="center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Box
        bgColor={"white"}
        p={6}
        rounded="lg"
        shadow="lg"
        width="sm"
        borderWidth="1px"
        borderColor={"gray.200"}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.01)" }}
      >
        <Stack gap={5}>
          <Flex align="center" gap={3}>
            <Box color="orange.500">
              <FiAlertTriangle size={24} />
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              {title}
            </Text>
          </Flex>

          <Text>{message}</Text>

          <Flex justify="space-between" gap={3} pt={2}>
            <Button
              variant="outline"
              onClick={onClose}
              size="md"
              colorScheme="gray"
            >
              <FiX />
              Cancel
            </Button>
            <Button colorPalette="red" onClick={onConfirm} size="md">
              {loading ? (
                <BiLoaderAlt
                  style={{
                    animation: "spin 1s linear infinite",
                    transition: "transform 0.7s ease-in-out",
                  }}
                />
              ) : (
                <FiCheck />
              )}
              Confirm
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default ConfirmationPopup;
