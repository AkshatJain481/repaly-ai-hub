import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AIResponseSettings } from "@/utils/interfaces";
import { FaWandMagicSparkles, FaRegFaceSmileBeam } from "react-icons/fa6";
import { RiEditBoxLine, RiBriefcase2Fill } from "react-icons/ri";
import { ImScissors } from "react-icons/im";
import { FaRegLaughSquint } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { cn } from "@/lib/utils";

const RESPONSE_MODES = [
  {
    key: "ai_enabled",
    label: "AI Response",
    icon: <FaWandMagicSparkles className="w-4 h-4" />,
    color: "purple",
  },
  {
    key: "custom",
    label: "Custom",
    icon: <RiEditBoxLine className="w-4 h-4" />,
    color: "purple",
  },
];

const TONES = [
  {
    key: "friendly",
    label: "Friendly",
    icon: <FaRegFaceSmileBeam className="w-4 h-4" />,
  },
  {
    key: "professional",
    label: "Professional",
    icon: <RiBriefcase2Fill className="w-4 h-4" />,
  },
  {
    key: "humorous",
    label: "Humorous",
    icon: <FaRegLaughSquint className="w-4 h-4" />,
  },
  {
    key: "concise",
    label: "Concise",
    icon: <ImScissors className="w-4 h-4" />,
  },
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
      px-4 py-2 text-sm font-medium rounded-lg transition-colors
      ${isActive ? `bg-${color}-100 dark:bg-${color}-900/50 text-${color}-600 dark:text-${color}-300 border-${color}-300 dark:border-${color}-600` : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"}
      border hover:bg-${color}-200 dark:hover:bg-${color}-800/50
    `}
    onClick={onClick}
  >
    <span className="flex items-center gap-2">
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
      px-4 py-2 text-sm font-medium rounded-lg transition-colors
      ${isActive ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" : "bg-transparent text-gray-600 dark:text-gray-300"}
      hover:bg-gray-200 dark:hover:bg-gray-600
    `}
    onClick={onClick}
  >
    <span className="flex items-center gap-2">
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
      text-${color}-600 dark:text-${color}-300 text-sm p-3 rounded-lg bg-${color}-50 dark:bg-${color}-900/30
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

  return (
    <div
      className={cn(`p-6 bg-white dark:bg-gray-800 rounded-xl border-solid shadow-lg border border-${color}-200 dark:border-${color}-700 transition-colors duration-200 mb-6`)}
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={`text-lg font-semibold text-${color}-600 dark:text-${color}-300 flex items-center gap-2`}
        >
          {icon}
          {title}
        </div>
        <Switch.Root
          checked={isOpen}
          onCheckedChange={() => {
            const newMode =
              mode.responseMode === "leave_comment"
                ? "ai_enabled"
                : "leave_comment";
            setMode({
              responseMode: newMode,
              response: newMode === "ai_enabled" ? "friendly" : "",
            });
          }}
          className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative data-[state=checked]:bg-purple-600 dark:data-[state=checked]:bg-purple-500 transition-colors duration-200"
        >
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-6" />
        </Switch.Root>
      </div>

      {isOpen && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            {RESPONSE_MODES.map(({ key, label, icon, color }) => (
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
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Response Tone:
              </p>
              <div className="flex flex-wrap gap-3">
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

              <div className="flex items-center gap-2">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <FiInfo className="w-4 h-4" />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-gray-800 dark:bg-gray-900 text-white text-xs p-2 rounded-md shadow-lg max-w-xs"
                        side="top"
                        sideOffset={4}
                      >
                        This response will be different for each comment and
                        will be AI-generated.
                        <Tooltip.Arrow className="fill-gray-800 dark:fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Example Response:
                </span>
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors"
                onClick={() => setIsEditable(!isEditable)}
              >
                <RiEditBoxLine className="w-4 h-4" />
                {isEditable ? "Done" : "Edit"}
              </button>

              {isEditable ? (
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors resize-y min-h-[80px] text-sm"
                  placeholder={`Enter your custom response for ${title}`}
                  value={mode.response}
                  onChange={(e) =>
                    setMode({ ...mode, response: e.target.value })
                  }
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
      )}
    </div>
  );
};

export default CustomResponseSection;
