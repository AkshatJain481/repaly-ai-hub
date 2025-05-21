
import CommentCard from "../common/CommentCard";

interface TaggedCommentsProps {
  comments: any[][];
}

const TaggedComments = ({ comments }: TaggedCommentsProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
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
        <div className="bg-white rounded-md p-4 shadow-sm text-center text-lg text-gray-500 font-bold flex justify-center items-center flex-col h-[50vh]">
          No tagged comments found.
        </div>
      )}
    </div>
  );
};

export default TaggedComments;
