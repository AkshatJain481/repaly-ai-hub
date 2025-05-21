const UnattendedCommentsBadge: React.FC<{ unattendedComments: number }> = ({
  unattendedComments,
}) => (
  <div
    style={{
      position: "absolute",
      top: "0",
      backgroundColor: "#f04f4d",
      color: "white",
      padding: "5px 10px",
      fontSize: "14px",
      textAlign: "center",
      width: "100%",
      fontWeight: "bold",
      zIndex: 10,
    }}
  >
    {unattendedComments} Unattended Comments
  </div>
);

export default UnattendedCommentsBadge;
