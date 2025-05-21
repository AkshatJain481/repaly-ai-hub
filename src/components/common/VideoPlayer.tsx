import { useState } from "react";

const VideoPlayer = ({
  media_url,
  thumbnail_url,
  unattendedComments,
}: {
  media_url: string;
  thumbnail_url: string;
  unattendedComments: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/5] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video Element */}
      <video
        src={media_url}
        controls
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.3s ease-in-out",
          opacity: hovered ? 1 : 0, // Reveal video on hover
          pointerEvents: hovered ? "auto" : "none", // Prevent accidental clicks when not hovered
        }}
      />

      {/* Thumbnail (Only visible when not hovered) */}
      {!hovered && (
        <img
          src={thumbnail_url}
          alt="Video thumbnail"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}

      {/* Unattended Comments Strip */}
      {unattendedComments > 0 && (
        <div
          style={{
            position: "absolute",
            top: "0",
            backgroundColor: "#f04f4d",
            color: "white",
            padding: "5px 10px",
            fontSize: "14px",
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          {unattendedComments} Unattended Comments
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
