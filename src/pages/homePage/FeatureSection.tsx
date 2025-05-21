import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Center,
  VStack,
} from "@chakra-ui/react";
import { BsChatDots, BsAt, BsBarChart } from "react-icons/bs";
import {
  bgColor,
  accentColor,
  primaryColor,
  textColor,
  secondaryTextColor,
} from "@/utils/constants";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={8}
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
        cursor: "pointer",
      }}
    >
      <Center mb={4} w={12} h={12} borderRadius="md" bg={`${accentColor}20`}>
        {icon}
      </Center>
      <Heading as="h3" fontSize="xl" fontWeight="bold" mb={3}>
        {title}
      </Heading>
      <Text color={secondaryTextColor} fontSize="lg">
        {description}
      </Text>
    </Box>
  );
};

const FeaturesSection = () => {
  // Feature data
  const features = [
    {
      icon: <BsChatDots color={primaryColor} size={24} />,
      title: "Smart Auto-Replies",
      description:
        "AI-powered responses for comments that keep your engagement high and save hours of manual work.",
    },
    {
      icon: <BsAt color={primaryColor} size={24} />,
      title: "Custom DM Automation",
      description:
        "Create personalized direct messages based on user inquiries, complete with media and your brand voice.",
    },
    {
      icon: <BsBarChart color={primaryColor} size={24} />,
      title: "Media Analytics",
      description:
        "Track engagement, analyze comments, and boost your social media growth with AI-powered insights.",
    },
  ];

  return (
    <Box
      position="relative"
      py={{ base: 10, md: 20 }}
      overflow="hidden"
      bgColor={bgColor}
      px={1}
    >
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="60%"
          left="10%"
          w="40"
          h="40"
          borderRadius="full"
          bg={`${accentColor}10`}
          filter="blur(60px)"
        />
        <Box
          position="absolute"
          top="20%"
          right="10%"
          w="64"
          h="64"
          borderRadius="full"
          bg={`${primaryColor}10`}
          filter="blur(70px)"
        />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack gap={6} mb={16} textAlign="center">
          <Badge
            bg={`${accentColor}20`}
            color={primaryColor}
            fontSize="sm"
            fontWeight="bold"
            py={2}
            px={4}
            borderRadius="full"
          >
            Features
          </Badge>

          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color={textColor}
            lineHeight={"1.2"}
          >
            Everything You Need to Elevate Your Social Media
          </Heading>

          <Text fontSize="lg" color={secondaryTextColor} maxW="3xl">
            Designed for creators, influencers, and brands who want to scale
            their online presence without hiring a team
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
