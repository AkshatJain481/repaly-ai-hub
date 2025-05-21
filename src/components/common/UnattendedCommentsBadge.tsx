
const UnattendedCommentsBadge: React.FC<{ unattendedComments: number }> = ({
  unattendedComments,
}) => (
  <div
    className="absolute top-0 bg-destructive text-white py-1 px-2 text-sm text-center w-full font-bold z-10"
  >
    {unattendedComments} Unattended Comments
  </div>
);

export default UnattendedCommentsBadge;
