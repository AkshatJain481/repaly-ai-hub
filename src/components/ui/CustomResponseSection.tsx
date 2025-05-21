import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  Switch,
  Tooltip,
  useTooltip,
} from "@chakra-ui/react";
import { FaWandMagicSparkles, FaRegFaceSmileBeam } from "react-icons/fa6";
import { RiEditBoxLine, RiBriefcase2Fill } from "react-icons/ri";
import { ImScissors } from "react-icons/im";
import { FaRegLaughSquint } from "react-icons/fa";
import { AIResponseSettings } from "@/utils/interfaces";
import { FiInfo } from "react-icons/fi";

const RESPONSE_MODES = [
  {
    key: "ai_enabled",
    label: "AI Response",
    icon: <FaWandMagicSparkles />,
    color: "purple",
  },
  {
    key: "custom",
    label: "Custom",
    icon: <RiEditBoxLine />,
    color: "blue",
  },
];

const TONES = [
  { key: "friendly", label: "Friendly", icon: <FaRegFaceSmileBeam /> },
  { key: "professional", label: "Professional", icon: <RiBriefcase2Fill /> },
  { key: "humorous", label: "Humorous", icon: <FaRegLaughSquint /> },
  { key: "concise", label: "Concise", icon: <ImScissors /> },
];

const EXAMPLE_RESPONSES: Record<string, Record<string, string>> = {
  "Positive Comments": {
    friendly:
      "Thank you so much for your kind words! We are thrilled to hear you had a great experience.",
    professional:
      "Thank you for your positive feedback. We truly appreciate your support.",
    humorous:
      "You're making us blush! Thanks for the awesome feedback. We'll keep the good vibes coming!",
    concise: "Thanks for the love! We really appreciate it!",
  },
  "Negative Comments": {
    friendly:
      "We're sorry to hear you had a less-than-ideal experience. We appreciate your feedback and will work to improve.",
    professional:
      "Thank you for your constructive feedback. We take all comments seriously and will make necessary improvements.",
    humorous:
      "Oops, looks like we missed the mark. Don't worry, we're working on it! Thanks for your feedback!",
    concise: "We hear you! Thanks for letting us know.",
  },
  "Leads / Potential Buyers": {
    friendly:
      "Thanks for your interest! We're excited to assist you further and explore how we can meet your needs.",
    professional:
      "We appreciate your interest and look forward to discussing how we can best serve your business needs.",
    humorous:
      "Looking to take the next step? We’d love to chat and help you get closer to making your dream purchase!",
    concise:
      "Thanks for your inquiry! We’ll get back to you soon with more details.",
  },
};

const ModeButton = ({
  isActive,
  label,
  icon,
  color,
  onClick,
}: {
  isActive: boolean;
  label: string;
  icon: React.ReactElement;
  color: string;
  onClick: () => void;
}) => (
  <Button
    bgColor={isActive ? `${color}.200` : "transparent"}
    color={isActive ? `${color}.600` : "gray.600"}
    border="1px solid"
    borderColor="gray.200"
    fontWeight="bold"
    px={4}
    borderRadius="lg"
    _hover={{ bgColor: isActive ? `${color}.100` : "gray.100" }}
    onClick={onClick}
  >
    {icon} {label}
  </Button>
);

const ToneButton = ({
  isActive,
  label,
  icon,
  onClick,
}: {
  isActive: boolean;
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
}) => (
  <Button
    mt={4}
    bgColor={isActive ? "gray.100" : "transparent"}
    color="gray.600"
    fontWeight="bold"
    px={4}
    borderRadius="lg"
    _hover={{ bgColor: "gray.100" }}
    onClick={onClick}
  >
    {icon} {label}
  </Button>
);

const ExampleResponse = ({
  response,
  color,
  title,
}: {
  response: string;
  color: string;
  title: string;
}) => (
  <Text
    color={`${color}.500`}
    fontSize="md"
    mt={2}
    p={3}
    borderRadius="md"
    bgColor={`${color}.50`}
  >
    {EXAMPLE_RESPONSES[title][response] || response}
  </Text>
);

const CustomResponseSection = ({
  icon,
  title,
  mode,
  setMode,
  color,
}: {
  icon: React.ReactElement;
  title: string;
  mode: AIResponseSettings;
  setMode: (mode: AIResponseSettings) => void;
  color: string;
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const isOpen = mode.responseMode !== "leave_comment";
  const tooltip = useTooltip();
  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      mb={4}
      border={1}
      borderStyle={"solid"}
      borderColor={`${color}.200`}
    >
      <Flex alignItems="center" justifyContent={"space-between"} mb={4}>
        <Text
          fontWeight="bold"
          color={`${color}.600`}
          display={"flex"}
          alignItems={"center"}
        >
          <Box mr={2} color={`${color}.500`}>
            {icon}
          </Box>
          {title}
        </Text>
        <Switch.Root colorPalette={color} size={"lg"} checked={isOpen}>
          <Switch.HiddenInput />
          <Switch.Control
            onClick={() => {
              const newMode =
                mode.responseMode === "leave_comment"
                  ? "ai_enabled"
                  : "leave_comment";

              setMode({
                responseMode: newMode,
                response: newMode === "ai_enabled" ? "friendly" : "",
              });
            }}
          />
          <Switch.Label />
        </Switch.Root>
      </Flex>

      <Flex
        gap={4}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "none", sm: "center" }}
      >
        {mode.responseMode !== "leave_comment" &&
          RESPONSE_MODES.map(({ key, label, icon, color }) => (
            <ModeButton
              key={key}
              isActive={mode.responseMode === key}
              label={label}
              icon={icon}
              color={color}
              onClick={() =>
                setMode({
                  responseMode: key as any,
                  response: key === "ai_enabled" ? "friendly" : "",
                })
              }
            />
          ))}
      </Flex>

      {mode.responseMode === "ai_enabled" && (
        <>
          <Text color="gray.600" mt={4}>
            Response Tone :
          </Text>
          <Flex gap={4} flexWrap="wrap">
            {TONES.map(({ key, label, icon }) => (
              <ToneButton
                key={key}
                isActive={mode.response === key}
                label={label}
                icon={icon}
                onClick={() => setMode({ ...mode, response: key })}
              />
            ))}
          </Flex>

          <Text mt={4} display={"flex"} alignItems="center" gap={2}>
            <Tooltip.RootProvider value={tooltip}>
              <Tooltip.Trigger asChild cursor={"pointer"}>
                <FiInfo />
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content>
                  This response will be different for each comment and will be
                  AI generated
                </Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip.RootProvider>
            Example Response:
          </Text>
          <ExampleResponse
            response={mode.response}
            color={color}
            title={title}
          />
        </>
      )}

      {mode.responseMode === "custom" && (
        <>
          <Button
            mt={4}
            bg="transparent"
            color="gray.600"
            border="1px solid"
            borderColor="gray.200"
            fontWeight="bold"
            px={4}
            borderRadius="lg"
            _hover={{ bgColor: "gray.100" }}
            onClick={() => setIsEditable(!isEditable)}
          >
            <RiEditBoxLine />
            {isEditable ? "Done" : "Edit"}
          </Button>

          {isEditable ? (
            <Textarea
              mt={4}
              size="sm"
              placeholder={`Enter your custom response for ${title}`}
              value={mode.response}
              onChange={(e) => setMode({ ...mode, response: e.target.value })}
              minH="80px"
              resize="vertical"
              borderRadius="md"
            />
          ) : (
            <ExampleResponse
              response={
                mode.response || `Enter your custom response for ${title}`
              }
              title={title}
              color={color}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default CustomResponseSection;
