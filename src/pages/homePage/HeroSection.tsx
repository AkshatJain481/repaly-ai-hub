import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
  Stack,
  Image,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import {
  accentColor,
  primaryColor,
  textColor,
  secondaryTextColor,
  bgColor,
} from "@/utils/constants";
import { FiArrowRight } from "react-icons/fi";
import LoginDrawer from "@/components/common/LoginDrawer";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box position="relative" overflow="hidden" bgColor={bgColor} px={1}>
      <Container py={12} zIndex={10} position="relative">
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align="center"
          gap={12}
        >
          {/* Left column: Text content */}
          <Stack gap={8} align="flex-start" maxW={{ lg: "50%" }}>
            <Badge
              bg={`${accentColor}20`}
              color={primaryColor}
              fontSize="sm"
              fontWeight="bold"
              p={3}
              borderRadius="full"
            >
              Your Social Media Manager
            </Badge>

            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="bold"
              color={textColor}
              lineHeight={"1.2"}
            >
              Your{" "}
                <p className="bg-gradient-to-r from-[#9b87f5] to-[#3e83f6] bg-clip-text text-transparent">
                  AI Assistant
                </p>
              for Social Media
            </Heading>

            <Text fontSize="lg" color={secondaryTextColor} maxW="xl">
              Instant AI-Powered Replies for Comments & DMs – Boost Engagement,
              Increase Conversions, and Save Hours of Manual Work.
            </Text>

            <Flex flexWrap="wrap" gap={4}>
              <LoginDrawer
                triggerButton={
                  <Button
                    bg={primaryColor}
                    color="white"
                    size="lg"
                    px={6}
                    py={6}
                    borderRadius="full"
                    fontWeight="bold"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: `0 10px 15px -3px ${primaryColor}20`,
                    }}
                    transition="all 0.3s"
                  >
                    Get Started for Free
                    <FiArrowRight />
                  </Button>
                }
              />
              <Link to="/demo">
                <Button
                  bg="white"
                  color={primaryColor}
                  size="lg"
                  px={6}
                  py={6}
                  borderRadius="full"
                  fontWeight="bold"
                  border="1px"
                  borderStyle={"solid"}
                  borderColor={primaryColor}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                  transition="all 0.3s"
                >
                  Watch Demo
                </Button>
              </Link>
            </Flex>

            <Flex align="center" gap={3} pt={4}>
              <AvatarGroup>
                <Avatar.Root size={"lg"}>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
                <Avatar.Root size={"lg"}>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
                <Avatar.Root size={"lg"}>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
              </AvatarGroup>
              <Box>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={secondaryTextColor}
                >
                  Trusted by 2,000+ creators
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  Join them today
                </Text>
              </Box>
            </Flex>
          </Stack>

          {/* Right column: App preview image */}
          <Box maxW={{ lg: "50%" }} position="relative">
            <Box position="relative" overflow="hidden">
              <Image
                src="/heroSection.png"
                alt="Social Media Management Dashboard"
                borderRadius="lg"
                w="full"
                h="auto"
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
