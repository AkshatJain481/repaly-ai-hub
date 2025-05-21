import {
  Box,
  Text,
  Flex,
  Heading,
  VStack,
  HStack,
  Separator,
  Icon,
  Container,
} from "@chakra-ui/react";
import { FiMessageSquare } from "react-icons/fi";
import { AnalyticsReplyItem } from "@/utils/interfaces";

const InstagramMediaReplyAnalytics = ({
  totalReplies,
  replyItems,
}: {
  totalReplies: number;
  replyItems: AnalyticsReplyItem[];
}) => {
  return (
    <Container
      w={{ base: "full", md: "1/2" }}
      maxW="container.md"
      p={6}
      borderWidth={2}
      borderRadius="lg"
      boxShadow="sm"
      bg="white"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="2xl">
          Automated Replies Overview
        </Heading>
        <Icon as={FiMessageSquare} boxSize={6} color="gray.400" />
      </Flex>

      <Box mb={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Heading as="h3" size="xl">
              Total Automated Replies
            </Heading>
            <Text color="gray.500">Comments automatically responded to</Text>
          </Box>
          <Text fontSize="3xl" fontWeight="bold">
            {totalReplies}
          </Text>
        </Flex>
      </Box>

      <Separator mb={6} />

      <Box>
        <Heading as="h3" size="md" mb={4}>
          Replies Breakdown
        </Heading>
        <VStack gap={6} align="stretch">
          {replyItems.map((item, index) => (
            <Flex
              key={index}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack gap={3}>
                <Icon as={item.icon} boxSize={5} color="blue.500" />
                <Box>
                  <Text fontWeight="semibold">{item.title}</Text>
                  <Text color="gray.500" fontSize="sm">
                    {item.subtitle}
                  </Text>
                </Box>
              </HStack>
              <Text fontSize="xl" fontWeight="bold">
                {item.count}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default InstagramMediaReplyAnalytics;
