import { primaryColor } from "@/utils/constants";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaReply, FaRegCommentAlt } from "react-icons/fa";

const CommentCard = ({
  username = "user311",
  timestamp = "",
  question = "Does this come in other colors?",
  replyText = "Thanks for your question! We'll get back to you shortly.",
  isReplySent = true,
  replyTimestamp = "Apr 19, 1:30 PM",
}: {
  username?: string;
  timestamp?: string;
  question?: string;
  replyText?: string;
  isReplySent?: boolean;
  replyTimestamp?: string;
}) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="sm">
      <Flex alignItems="center" mb={2}>
        <Icon as={FaRegCommentAlt} color={primaryColor} mr={4} boxSize={6} />
        <Text fontWeight="medium" color="gray.700">
          @{username}
        </Text>
        {timestamp && (
          <Text ml="auto" fontSize="sm" color="gray.500">
            {timestamp}
          </Text>
        )}
      </Flex>

      <Text mb={3} color="gray.800">
        {question}
      </Text>

      {isReplySent && (
        <Box
          borderRadius="md"
          bg="gray.50"
          p={3}
          borderLeftWidth="4px"
          borderLeftColor={primaryColor}
        >
          <Flex alignItems="center" mb={2} justifyContent={"space-between"}>
            <Flex alignItems="center">
              <Icon as={FaReply} color={primaryColor} mr={3} />
              <Text fontSize="sm" color={primaryColor}>
                Reply sent
              </Text>
            </Flex>
            <Text fontSize="xs" color="gray.500">
              {replyTimestamp}
            </Text>
          </Flex>

          <Text color="gray.700">{replyText}</Text>
        </Box>
      )}
    </Box>
  );
};

export default CommentCard;
