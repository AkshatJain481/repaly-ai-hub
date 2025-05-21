import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  Flex,
  VStack,
  HStack,
  Button,
  Image,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import {
  accentColor,
  primaryColor,
  textColor,
  secondaryTextColor,
} from "@/utils/constants";
import { FiArrowRight } from "react-icons/fi";
import LoginDrawer from "@/components/common/LoginDrawer";
// Feature list item component
const FeatureListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack gap={3} align="flex-start">
      <Flex
        minW="24px"
        h="24px"
        bg={`${primaryColor}20`}
        color={primaryColor}
        borderRadius="full"
        justify="center"
        align="center"
      >
        <Icon as={BsCheckCircle} boxSize={3} />
      </Flex>
      <Text fontSize="lg" color={textColor}>
        {children}
      </Text>
    </HStack>
  );
};

const AutoRepliesSection = () => {
  // List of features for the section
  const featuresList = [
    "Set up automatic replies to common questions",
    "Customize response tone and style to match your brand",
    "Handle customer inquiries while you sleep",
    "Increase engagement rates with timely responses",
  ];

  return (
    <Box position="relative" py={{ base: 10, md: 20 }} overflow="hidden" px={1}>
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={20}
        >
          {/* Left side: Image */}
          <Box flex={{ lg: "1" }} w="full">
            <Image
              src="/automationSection.png" // Update this with your actual image path
              alt="Smart Auto-Replies Dashboard"
              w="full"
            />
          </Box>

          {/* Right side: Content */}
          <VStack
            flex={{ lg: "1" }}
            align={{ base: "center", lg: "flex-start" }}
            gap={6}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Badge
              bg={`${accentColor}20`}
              color={primaryColor}
              fontSize="sm"
              fontWeight="bold"
              py={2}
              px={4}
              borderRadius="full"
            >
              Smart Auto-Replies
            </Badge>

            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color={textColor}
              lineHeight={"1.2"}
            >
              Let AI Handle Your Comments While You Create
            </Heading>

            <Text fontSize="lg" color={secondaryTextColor} maxW="lg">
              Stop spending hours responding to the same questions. Repaly's AI
              analyzes each comment and crafts personalized responses based on
              your preferences and brand voice.
            </Text>

            <Stack gap={4}>
              {featuresList.map((feature, index) => (
                <FeatureListItem key={index}>{feature}</FeatureListItem>
              ))}
            </Stack>

            <LoginDrawer
              triggerButton={
                <Button
                  mt={2}
                  bg={primaryColor}
                  color="white"
                  size="lg"
                  fontWeight={"bold"}
                  px={8}
                  borderRadius="full"
                  _hover={{
                    bg: `${primaryColor}90`,
                    transform: "translateY(-2px)",
                  }}
                >
                  Learn More
                  <FiArrowRight />
                </Button>
              }
            />
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default AutoRepliesSection;
