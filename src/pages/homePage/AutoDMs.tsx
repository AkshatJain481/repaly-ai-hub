import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  Flex,
  VStack,
  Stack,
  HStack,
  Button,
  Image,
  Icon,
} from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import {
  accentColor,
  primaryColor,
  textColor,
  secondaryTextColor,
  bgColor,
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

const AutoDMs = () => {
  // List of features for the section
  const featuresList = [
    "Automaically send price lists, menus, or catalogs",
    "Include images, videos, or documents in auto-responses",
    "Trigger different messages based on specific keywords",
    "Track conversion rates from automated DMs",
  ];

  return (
    <Box
      position="relative"
      py={{ base: 10, md: 20 }}
      overflow="hidden"
      bgColor={bgColor}
      px={1}
    >
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={20}
        >
          {/* Right side: Image (should be on top in column mode) */}
          <Box
            flex={{ lg: "1" }}
            w="full"
            order={{ base: -1, lg: 1 }} // Moves image above text in column layout
          >
            <Image
              src="/autoDMsSection.png" // Update this with your actual image path
              alt="Smart Auto-Replies Dashboard"
              w="full"
            />
          </Box>

          {/* Left side: Content */}
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
              Custom Auto-DMs
            </Badge>

            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color={textColor}
              lineHeight={"1.2"}
            >
              Media-Based Custom Responses for Direct Messages
            </Heading>

            <Text fontSize="lg" color={secondaryTextColor} maxW="lg">
              Empower your brand to create highly personalized DMs with media
              attachments, custom details, and tailored messaging that convert
              followers into customers.
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
                  px={8}
                  borderRadius="full"
                  fontWeight={"bold"}
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

export default AutoDMs;
