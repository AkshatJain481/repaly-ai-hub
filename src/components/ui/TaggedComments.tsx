import CommentCard from "../common/CommentCard";

interface TaggedCommentsProps {
  comments: any[][];
}

const TaggedComments = ({ comments }: TaggedCommentsProps) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {comments && comments.length > 0 ? (
        comments.map((comment, idx) => (
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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 flex justify-center items-center flex-col h-[50vh] transition-colors duration-200">
          No tagged comments found
        </div>
      )}
    </div>
  );
};

export default TaggedComments;
