import { Query } from "./interfaces";
import JSON5 from "json5";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now() / 1000; // in seconds
    return decoded.exp < now;
  } catch (err) {
    console.error("Failed to decode token", err);
    return true; // if decoding fails, treat as expired
  }
};

export const safeParseJSON = (value: any) => {
  if (typeof value !== "string") return value; // Return as is if not a string

  try {
    return JSON5.parse(value);
  } catch (error) {
    console.warn("JSON parse failed:", error);
    return value; // Return the original value if parsing fails
  }
};
export const getDynamicContent = (queries: Query[]) => {
  const lastQuery = queries[queries.length - 1]; // Get last answered question

  if (!lastQuery) {
    return {
      message: "Tell Us About Your Industry",
      description:
        "Providing your company’s niche allows us to customize the comment automation, ensuring that the content is tailored, relevant, and engaging for your target audience.",
      image: "/image_8.png", // Default placeholder
    };
  }

  const contentMap: Record<
    string,
    Record<string, { message: string; description: string; image: string }>
  > = {
    "What best describes your company?": {
      business: {
        message: "Great! We'll tailor automation to suit business needs.",
        description:
          "Our tools are designed to help businesses enhance audience engagement, streamline customer interactions, and ultimately increase conversions by delivering highly relevant content automatically.",
        image: "/image_8.png",
      },
      influencer: {
        message: "Awesome! We'll focus on maximizing your influence.",
        description:
          "As an influencer, maintaining engagement is key. Our automation will help you consistently interact with your audience, increase visibility, and build stronger relationships with your followers without the manual effort.",
        image: "/image_8.png",
      },
      "personal use": {
        message: "Nice! Custom automation for personal engagement awaits.",
        description:
          "Whether you’re managing a personal brand, a blog, or simply looking to improve your digital presence, our automation tools will help you stay engaged and connected with your audience effortlessly.",
        image: "/image_8.png",
      },
      other: {
        message: "Interesting! We'll adapt based on your unique needs.",
        description:
          "No matter how unique your category is, our platform is designed to adapt and create a personalized automation experience that aligns with your specific goals and audience.",
        image: "/image_8.png",
      },
    },
    "What is your company Niche or Industry?": {
      education: {
        message: "Empowering learning through tailored automation!",
        description:
          "Enhance student engagement, provide valuable educational content, and maintain strong connections with learners through automated interactions that keep your audience informed and engaged.",
        image: "/image_8.png",
      },
      "health and fitness": {
        message: "Boosting engagement in the fitness world!",
        description:
          "Whether you're a fitness coach, gym owner, or health influencer, our automation helps you connect with your audience, provide valuable fitness insights, and promote services effectively.",
        image: "/image_8.png",
      },
      technology: {
        message: "Tech-focused automation coming your way!",
        description:
          "The tech industry moves fast, and our automation ensures you stay ahead by keeping your audience informed with the latest updates, insights, and engaging content tailored to their interests.",
        image: "/image_8.png",
      },
      fashion: {
        message: "Stylish solutions for the fashion industry!",
        description:
          "Our automation helps fashion brands stay connected with their audience, showcase new collections, and drive engagement effortlessly.",
        image: "/image_8.png",
      },
      "beauty and skincare": {
        message: "Glowing automation for beauty brands!",
        description:
          "Enhance customer engagement for beauty and skincare products with tailored automation that keeps your brand top of mind.",
        image: "/image_8.png",
      },
      "content creation and reels": {
        message: "Helping creators stand out with automation!",
        description:
          "Optimize engagement for your content and grow your audience with intelligent automation strategies.",
        image: "/image_8.png",
      },
      "food and beverages": {
        message: "Serving up automation for the food industry!",
        description:
          "Improve customer interaction, streamline marketing efforts, and grow your food brand with automation tools designed for success.",
        image: "/image_8.png",
      },
      other: {
        message: "A unique space! We’ll make automation work for you!",
        description:
          "No matter your industry, our automation tools are designed to adapt, ensuring that your brand engages with the right audience effectively and meaningfully.",
        image: "/image_8.png",
      },
    },
    "What is your primary source of revenue?": {
      "service fees": {
        message: "Let's optimize client engagement for growth!",
        description:
          "If service-based revenue is your main stream, our automation ensures you consistently engage with potential and existing clients, providing them with valuable updates and strengthening relationships for long-term business growth.",
        image: "/image_8.png",
      },
      "product sales": {
        message: "Boosting sales with strategic automation!",
        description:
          "Increase product visibility, drive conversions, and improve customer retention with automation that delivers personalized recommendations and engages shoppers at the right moment.",
        image: "/image_8.png",
      },
      subscription: {
        message: "Enhancing retention for your subscribers!",
        description:
          "Improve subscriber engagement, reduce churn, and maintain strong customer relationships with automated interactions.",
        image: "/image_8.png",
      },
      advertisements: {
        message: "Maximizing ad engagement for better ROI!",
        description:
          "Optimize your ad strategy, improve targeting, and increase conversions with automation tools built for digital marketing success.",
        image: "/image_8.png",
      },
      "commission based": {
        message: "Streamlining leads for commission growth!",
        description:
          "Generate and nurture leads more effectively with automation designed to maximize your earnings.",
        image: "/image_8.png",
      },
      other: {
        message: "Tailoring automation to your unique revenue model!",
        description:
          "Every business has its own revenue strategy, and our automation tools are designed to support your specific monetization model, ensuring sustainable growth and engagement.",
        image: "/image_8.png",
      },
    },
    "Please provide your contact details.": {
      other: {
        message:
          "Great! Sharing your contact details helps us provide personalized support and automation solutions.",
        description:
          "Whether it's via email, phone, or social media, we'll ensure you receive relevant updates, insights, and assistance to optimize your social media automation.",
        image: "/image_8.png",
      },
    },
    "Select a preferred default mood for replies to your viewers.": {
      sarcastic: {
        message: "Oh great, another reply—let’s make it interesting!",
        description:
          "Dripping with wit and just the right amount of sass. Your audience will love it... or not. Who cares?",
        image: "/image_8.png",
      },
      professional: {
        message: "Keeping it polished and precise.",
        description:
          "Clear, concise, and straight to the point. Replies that mean business without the fluff.",
        image: "/image_8.png",
      },
      humorous: {
        message: "Adding a dash of comedy to every reply!",
        description:
          "Engage your audience with witty, funny, and lighthearted responses that keep the conversation fun.",
        image: "/image_8.png",
      },
      friendly: {
        message: "Warm, welcoming, and approachable!",
        description:
          "Every reply feels like a chat with an old friend—because making connections should be easy and natural.",
        image: "/image_8.png",
      },
      motivational: {
        message: "Inspiring one reply at a time!",
        description:
          "Uplift and encourage your audience with positive, empowering messages that fuel their motivation.",
        image: "/image_8.png",
      },
      casual: {
        message: "Chill and laid-back vibes only.",
        description:
          "No stress, no pressure—just easygoing replies that keep the conversation light and relaxed.",
        image: "/image_8.png",
      },
      formal: {
        message: "Professionalism at its finest.",
        description:
          "Polite, structured, and respectful replies that maintain a formal tone while keeping it engaging.",
        image: "/image_8.png",
      },
    },
  };

  // Handle multiple-choice question (Social Platforms)
  if (lastQuery.question === "What social platforms does your company use?") {
    const selectedPlatforms = Array.isArray(lastQuery.answer)
      ? lastQuery.answer
      : [lastQuery.answer];

    const platformMessages: Record<
      string,
      { message: string; description: string; image: string }
    > = {
      instagram: {
        message: "Optimizing Instagram engagement.",
        description:
          "Leverage automation to increase your reach, engage with followers, and maintain an active presence on Instagram without manual effort.",
        image: "/image_8.png",
      },
      facebook: {
        message: "Enhancing visibility on Facebook.",
        description:
          "Engage with your audience, automate responses, and ensure that your Facebook presence remains active and interactive.",
        image: "/image_8.png",
      },
      linkedin: {
        message: "Boosting professional reach on LinkedIn.",
        description:
          "Connect with industry professionals, automate networking efforts, and enhance brand credibility with strategic LinkedIn engagement.",
        image: "/image_8.png",
      },
      whatsapp: {
        message: "Streamlining communication via WhatsApp.",
        description:
          "Automate WhatsApp interactions to manage leads, improve response times, and maintain active customer engagement.",
        image: "/image_8.png",
      },
      twitter: {
        message: "Creating impact on Twitter (X).",
        description:
          "Improve engagement, grow your audience, and maintain a strong presence on Twitter with automated strategies.",
        image: "/image_8.png",
      },
      telegram: {
        message: "Enhancing Telegram outreach.",
        description:
          "Increase engagement in your Telegram community with automated messaging, updates, and community management tools.",
        image: "/image_8.png",
      },
    };

    return {
      message:
        selectedPlatforms
          .map((platform) => platformMessages[platform]?.message)
          .join(" ") || "Connecting your brand across multiple platforms!",
      description:
        selectedPlatforms
          .map((platform) => platformMessages[platform]?.description)
          .join(" ") ||
        "Leverage multiple platforms to expand your reach efficiently.",
      image:
        selectedPlatforms.length === 1
          ? platformMessages[selectedPlatforms[0]]?.image
          : "/image_8.png",
    };
  }

  return (
    contentMap[lastQuery.question]?.[lastQuery.answer as string] ||
    contentMap[lastQuery.question]?.other || {
      message: "Let's move forward!",
      description: "Continue answering to get a personalized experience.",
      image: "/image_8.png",
    }
  );
};

export const toQueryParams = (
  params: Record<string, string | number | boolean>
): string => {
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

export const getFormattedDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "Unknown date";
  }
};

export const replaceUrlParams = (
  url: string,
  params: Record<string, string>
): string => {
  return url.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => params[key] || `:${key}`);
};
