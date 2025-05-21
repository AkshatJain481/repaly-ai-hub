import {
  VStack,
  Badge,
  Heading,
  Text,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  accentColor,
  primaryColor,
  textColor,
  secondaryTextColor,
  bgColor,
} from "@/utils/constants";
import StatCard from "../../components/common/StatCard";

const TestimonialSection = () => {
  return (
    <Stack py={{ base: 10, md: 20 }} bgColor={bgColor} px={1}>
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
          Testimonials
        </Badge>

        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={textColor}
          lineHeight={"1.2"}
        >
          Loved by Creators and Brands
        </Heading>

        <Text fontSize="lg" color={secondaryTextColor} maxW="3xl">
          See what our users have to say about how repaly has transformed their
          social media presence
        </Text>
      </VStack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        gap={8}
        maxW="7xl"
        width={"100%"}
        mx="auto"
        px={4}
        textAlign="center"
      >
        {[
          { value: "2,000+", label: "Active Users" },
          { value: "5M+", label: "Comments Managed" },
          { value: "42%", label: "Avg. Engagement Increase" },
        ].map((stat, index) => (
          <StatCard key={index} value={stat.value} label={stat.label} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default TestimonialSection;
