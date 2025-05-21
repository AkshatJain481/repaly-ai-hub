import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegram,
  FaFacebookMessenger,
} from "react-icons/fa";
import InstagramReelIcon from "@/components/customIcons/InstagramReelIcon";
import InstagramStoryIcon from "@/components/customIcons/InstagramStoryIcon";

export const bgColor = "#f7fafc";
export const accentColor = "#c9c1f9";
export const primaryColor = "#9b87f5";
export const textColor = "#1a202c";
export const secondaryTextColor = "#6B7280";
export const socialMediaPlatforms = [
  { name: "Instagram", icon: FaInstagram, color: "#808080" },
  { name: "Facebook", icon: FaFacebookF, color: "#4267B2" },
  { name: "Messenger", icon: FaFacebookMessenger, color: "#00B2FF" },
  { name: "WhatsApp", icon: FaWhatsapp, color: "#25D366" },
  { name: "Telegram", icon: FaTelegram, color: "#0088cc" },
  { name: "Twitter", icon: FaTwitter, color: "#1DA1F2" },
  { name: "LinkedIn", icon: FaLinkedinIn, color: "#0077B5" },
];

export const Questions = [
  {
    question: "What best describes your company?",
    type: "single-choice",
    skipable: false,
    options: [
      { value: "business", title: "Business", icon: "FaUserTie" },
      { value: "influencer", title: "Influencer", icon: "RiUserVoiceFill" },
      { value: "personal use", title: "Personal Use", icon: "FaUser" },
      { value: "other", title: "Other", icon: "FaUserPlus" },
    ],
    completePercentage: 1 as number,
  },
  {
    question: "What is your company Niche or Industry?",
    type: "single-choice",
    skipable: false,
    options: [
      { value: "education", title: "Education", icon: "FaUserGraduate" },
      {
        value: "health and fitness",
        title: "Health & Fitness",
        icon: "IoFitness",
      },
      { value: "technology", title: "Technology", icon: "FaComputer" },
      { value: "fashion", title: "Fashion", icon: "GiLargeDress" },
      {
        value: "beauty and skincare",
        title: "Beauty & Skincare",
        icon: "FaSprayCanSparkles",
      },
      {
        value: "content creation and reels",
        title: "Content creation & Reels",
        icon: "BsCameraReelsFill",
      },
      {
        value: "food and beverages",
        title: "Food & Beverages",
        icon: "IoFastFood",
      },
      { value: "other", title: "Other", icon: "MdCategory" },
    ],
    completePercentage: 25 as number,
  },
  {
    question: "What social platforms does your company use?",
    type: "multiple-choice",
    skipable: false,
    options: [
      { value: "instagram", title: "Instagram", icon: "AiFillInstagram" },
      { value: "facebook", title: "Facebook", icon: "FaFacebook" },
      { value: "linkedin", title: "Linkedin", icon: "FaLinkedin" },
      { value: "whatsapp", title: "Whatsapp", icon: "IoLogoWhatsapp" },
      { value: "twitter", title: "X (Twitter)", icon: "FaSquareXTwitter" },
      { value: "telegram", title: "Telegram", icon: "FaTelegram" },
    ],
    completePercentage: 50 as number,
  },
  {
    question: "Please provide your contact details.",
    type: "multiple-choice",
    skipable: true,
    options: [
      { value: "email", title: "Email", icon: "IoMail" },
      { value: "phone", title: "Phone Number", icon: "IoCall" },
      { value: "website", title: "Website/Portfolio", icon: "FaGlobe" },
    ],
    completePercentage: 70 as number,
  },
  {
    question: "Select a preferred default mood for replies to your viewers.",
    type: "single-choice",
    skipable: false,
    options: [
      { value: "sarcastic", title: "Sarcastic", icon: "FaRegGrinSquint" },
      { value: "professional", title: "Professional", icon: "FaBriefcase" },
      { value: "humorous", title: "Humorous", icon: "FaLaughBeam" },
      { value: "friendly", title: "Friendly", icon: "FaSmile" },
      { value: "motivational", title: "Motivational", icon: "FaRocket" },
      { value: "casual", title: "Casual", icon: "FaCoffee" },
      { value: "formal", title: "Formal", icon: "FaUserTie" },
    ],
    completePercentage: 90,
  },
];

export const platformNavConfig: {
  [platform: string]: {
    label: string;
    icon: React.ElementType;
    path: string;
  }[];
} = {
  instagram: [
    {
      label: "Media",
      icon: InstagramReelIcon,
      path: "/dashboard/instagram/media",
    },
    {
      label: "Story",
      icon: InstagramStoryIcon,
      path: "/dashboard/instagram/story",
    },
  ],
};
