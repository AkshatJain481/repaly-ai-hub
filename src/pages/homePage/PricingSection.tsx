import { Box, Heading, Text, Badge, VStack } from "@chakra-ui/react";
import PricingCard from "../../components/common/PricingCard";
import {
  textColor,
  secondaryTextColor,
  primaryColor,
  accentColor,
} from "../../utils/constants";

const PricingSection = () => {
  return (
    <Box position="relative" py={{ base: 10, md: 20 }} overflow="hidden" px={1}>
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
          Pricing
        </Badge>

        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={textColor}
          lineHeight={"1.2"}
        >
          Plans That Scale With Your Growth
        </Heading>

        <Text fontSize="lg" color={secondaryTextColor} maxW="3xl">
          Choose the perfect plan for your social media needs. All plans include
          core features with different limits.
        </Text>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)" // Adjust the number of columns as needed
          gap={8}
          overflowX="auto" // Enable horizontal scrolling
          maxWidth={"100%"}
          p={4}
        >
          <PricingCard
            title="Free Plan"
            price="0"
            description="Perfect for creators just getting started on their journey."
            buttonText="Get Started"
            features={[
              { text: "Free Forever" },
              { text: "Comment Reply Automation" },
              { text: "50 Media per month" },
            ]}
          />
          <PricingCard
            title="Premium Plan"
            price="19"
            isPopular={true}
            description="Perfect for creators ready to take things to the next level."
            buttonText="Get Started"
            features={[
              { text: "Everything in free plan" },
              { text: "Comment Reply Automation" },
              { text: "DM automations" },
              { text: "200 Media per month" },
              { text: "Basic Analytics Dashboard" },
            ]}
          />
          <PricingCard
            title="Enterprise Plan"
            price="Custom"
            description="For brands and professional influencers with high-volume needs."
            buttonText="Contact Sales"
            features={[
              { text: "Everything in premium plan" },
              { text: "Comment Reply Automation" },
              { text: "DM automations" },
              { text: "Custom Media per month" },
              { text: "Advanced Analytics & Reporting" },
              { text: "Dedicated Account Manager" },
            ]}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default PricingSection;
