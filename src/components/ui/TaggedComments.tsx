import { Stack } from "@chakra-ui/react";
import CommentCard from "../common/CommentCard";

const TaggedComments = ({ comments }: { comments: any[][] }) => {
  return (
    <Stack gap={4} mt={4}>
      {comments && comments.length > 0 ? (
        comments?.map((comment, idx) => (
          <CommentCard
            key={idx}
            username={comment[0]}
            question={comment[1]}
            replyText={comment[2]}
            isReplySent={true}
            replyTimestamp={comment[3]}
          />
        ))
      ) : (
        <Stack
          bg="white"
          borderRadius="md"
          p={4}
          boxShadow="sm"
          textAlign="center"
          fontSize="lg"
          color="gray.500"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          No tagged comments found.
        </Stack>
      )}
    </Stack>
  );
};

export default TaggedComments;
