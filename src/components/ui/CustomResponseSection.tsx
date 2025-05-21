
import { useState } from "react";
import { AIResponseSettings } from "@/utils/interfaces";
import { FaWandMagicSparkles, FaRegFaceSmileBeam } from "react-icons/fa6";
import { RiEditBoxLine, RiBriefcase2Fill } from "react-icons/ri";
import { ImScissors } from "react-icons/im";
import { FaRegLaughSquint } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

const RESPONSE_MODES = [
  {
    key: "ai_enabled",
    label: "AI Response",
    icon: <FaWandMagicSparkles />,
    color: "purple",
  },
  {
    key: "custom",
    label: "Custom",
    icon: <RiEditBoxLine />,
    color: "blue",
  },
];

const TONES = [
  { key: "friendly", label: "Friendly", icon: <FaRegFaceSmileBeam /> },
  { key: "professional", label: "Professional", icon: <RiBriefcase2Fill /> },
  { key: "humorous", label: "Humorous", icon: <FaRegLaughSquint /> },
  { key: "concise", label: "Concise", icon: <ImScissors /> },
];

const EXAMPLE_RESPONSES: Record<string, Record<string, string>> = {
  "Positive Comments": {
    friendly:
      "Thank you so much for your kind words! We are thrilled to hear you had a great experience.",
    professional:
      "Thank you for your positive feedback. We truly appreciate your support.",
    humorous:
      "You're making us blush! Thanks for the awesome feedback. We'll keep the good vibes coming!",
    concise: "Thanks for the love! We really appreciate it!",
  },
  "Negative Comments": {
    friendly:
      "We're sorry to hear you had a less-than-ideal experience. We appreciate your feedback and will work to improve.",
    professional:
      "Thank you for your constructive feedback. We take all comments seriously and will make necessary improvements.",
    humorous:
      "Oops, looks like we missed the mark. Don't worry, we're working on it! Thanks for your feedback!",
    concise: "We hear you! Thanks for letting us know.",
  },
  "Leads / Potential Buyers": {
    friendly:
      "Thanks for your interest! We're excited to assist you further and explore how we can meet your needs.",
    professional:
      "We appreciate your interest and look forward to discussing how we can best serve your business needs.",
    humorous:
      "Looking to take the next step? We'd love to chat and help you get closer to making your dream purchase!",
    concise:
      "Thanks for your inquiry! We'll get back to you soon with more details.",
  },
};

const ModeButton = ({
  isActive,
  label,
  icon,
  color,
  onClick,
}: {
  isActive: boolean;
  label: string;
  icon: React.ReactElement;
  color: string;
  onClick: () => void;
}) => (
  <button
    className={`
      px-4 py-2 font-bold rounded-lg transition-colors
      ${isActive ? `bg-${color}-200 text-${color}-600` : 'bg-transparent text-gray-600'}
      border border-gray-200
      hover:${isActive ? `bg-${color}-100` : 'bg-gray-100'}
    `}
    onClick={onClick}
  >
    <span className="flex items-center gap-1">
      {icon} {label}
    </span>
  </button>
);

const ToneButton = ({
  isActive,
  label,
  icon,
  onClick,
}: {
  isActive: boolean;
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
}) => (
  <button
    className={`
      mt-4 px-4 py-2 font-bold rounded-lg transition-colors
      ${isActive ? 'bg-gray-100' : 'bg-transparent'} text-gray-600
      hover:bg-gray-100
    `}
    onClick={onClick}
  >
    <span className="flex items-center gap-1">
      {icon} {label}
    </span>
  </button>
);

const ExampleResponse = ({
  response,
  color,
  title,
}: {
  response: string;
  color: string;
  title: string;
}) => (
  <p
    className={`
      text-${color}-500 text-md mt-2 p-3 rounded-md bg-${color}-50
    `}
  >
    {EXAMPLE_RESPONSES[title][response] || response}
  </p>
);

const CustomResponseSection = ({
  icon,
  title,
  mode,
  setMode,
  color,
}: {
  icon: React.ReactElement;
  title: string;
  mode: AIResponseSettings;
  setMode: (mode: AIResponseSettings) => void;
  color: string;
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const isOpen = mode.responseMode !== "leave_comment";
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  return (
    <div className={`p-4 bg-white rounded-md shadow-sm mb-4 border border-${color}-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`font-bold text-${color}-600 flex items-center`}>
          <span className={`mr-2 text-${color}-500`}>{icon}</span>
          {title}
        </div>
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={() => {
              const newMode =
                mode.responseMode === "leave_comment"
                  ? "ai_enabled"
                  : "leave_comment";

              setMode({
                responseMode: newMode,
                response: newMode === "ai_enabled" ? "friendly" : "",
              });
            }}
            className="sr-only"
          />
          <div
            className={`block w-14 h-8 rounded-full ${
              isOpen ? `bg-${color}-600` : "bg-gray-300"
            } transition-colors duration-200`}
          >
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                isOpen ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row sm:items-center">
        {mode.responseMode !== "leave_comment" &&
          RESPONSE_MODES.map(({ key, label, icon, color }) => (
            <ModeButton
              key={key}
              isActive={mode.responseMode === key}
              label={label}
              icon={icon}
              color={color}
              onClick={() =>
                setMode({
                  responseMode: key as any,
                  response: key === "ai_enabled" ? "friendly" : "",
                })
              }
            />
          ))}
      </div>

      {mode.responseMode === "ai_enabled" && (
        <>
          <p className="text-gray-600 mt-4">Response Tone :</p>
          <div className="flex gap-4 flex-wrap">
            {TONES.map(({ key, label, icon }) => (
              <ToneButton
                key={key}
                isActive={mode.response === key}
                label={label}
                icon={icon}
                onClick={() => setMode({ ...mode, response: key })}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="relative">
              <FiInfo 
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                className="cursor-pointer"
              />
              {tooltipVisible && (
                <div className="absolute bottom-full mb-2 left-0 bg-black text-white text-xs p-2 rounded whitespace-nowrap">
                  This response will be different for each comment and will be AI generated
                </div>
              )}
            </div>
            <span>Example Response:</span>
          </div>
          <ExampleResponse
            response={mode.response}
            color={color}
            title={title}
          />
        </>
      )}

      {mode.responseMode === "custom" && (
        <>
          <button
            className="mt-4 bg-transparent text-gray-600 border border-gray-200 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1"
            onClick={() => setIsEditable(!isEditable)}
          >
            <RiEditBoxLine />
            {isEditable ? "Done" : "Edit"}
          </button>

          {isEditable ? (
            <textarea
              className="mt-4 w-full p-2 border border-gray-300 rounded-md text-sm min-h-[80px] resize-y"
              placeholder={`Enter your custom response for ${title}`}
              value={mode.response}
              onChange={(e) => setMode({ ...mode, response: e.target.value })}
            />
          ) : (
            <ExampleResponse
              response={
                mode.response || `Enter your custom response for ${title}`
              }
              title={title}
              color={color}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomResponseSection;
