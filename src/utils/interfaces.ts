export interface MediaCardProp {
  id: string;
  caption: string;
  media_type: "VIDEO" | "IMAGE";
  media_url: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  reach: number;
  shares: number;
  comments: number;
  likes: number;
  saved: number;
  thumbnail_url?: string;
  ig_reels_avg_watch_time?: number;
  ig_reels_video_view_total_time?: number;
}

export interface StoryCardProp {
  media_url: string;
  story_id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  IsActive: boolean;
  accountId: string;
  timestamp: string;
}

export interface MediaDetailsProp {
  id: string;
  caption: string;
  media_type: "VIDEO" | "IMAGE";
  media_url: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  reach: number;
  shares: number;
  comments: number;
  likes: number;
  saved: number;
  thumbnail_url?: string;
  ig_reels_avg_watch_time?: number;
  ig_reels_video_view_total_time?: number;
  accountId: string;
  ai_enabled: {
    negative_comments: {
      mode: "ai_enabled" | "leave_comment" | "custom";
      mood: string;
      value: string;
    };
    potential_buyers: {
      mode: "ai_enabled" | "leave_comment" | "custom";
      mood: string;
      value: string;
    };
    inquiries: {
      mode: "leave_comment" | "custom";
      value: {
        website_url: string;
        mobile_no: string;
        product_details: string;
      };
    };
    positive_comments: {
      mode: "ai_enabled" | "leave_comment" | "custom";
      mood: string;
      value: string;
    };
  };

  tag_and_value_pair: {
    mode: boolean;
    responseDM: string;
    responseComment: string;
    tags: string[];
  }[];
}

export interface Query {
  question: string;
  type: "single_choice_question" | "multiple_choice_question";
  answer: string | string[];
}

export interface UserBusinessDetails {
  queries: Query[];
}

export interface QuestionsType {
  question: string;
  type: string;
  options: {
    value: string;
    title: string;
    icon: string;
  }[];
  completePercentage: number;
}

export interface PlatformAccount {
  platformName: string;
  access_token: string;
  created_time: string;
  id: string;
  media_count: number;
  name: string;
  updated_time: string;
  user_id: string;
  username: string;
  profile_picture_url: string;
}
export interface UserProfile {
  id: string;
  email: string;
  picture: string;
  name: string;
}

export interface InstagramMediaAnalytics {
  comment_by_us: number;
  potential_buyers: number;
  DMs_by_us: number;
  inquiry: number;
  negative_comments: number;
  positive_comments: number;
  tagged_comment: number;
  tagged_comment_dm: number;
}

export interface TagValueProp {
  tags: string[];
  responseComment: string;
  responseDM: string;
  mode: boolean;
}

export interface AIResponseSettings {
  responseMode: "ai_enabled" | "custom" | "leave_comment";
  response: string;
}

export interface InquiryDetails {
  responseMode: "custom" | "leave_comment";
  websiteUrl: string;
  mobileNumber: string;
  productDetails: string;
}

export interface StoryDetails {
  media_url: string;
  story_id: string;
  media_type: "IMAGE" | "VIDEO";
  accountId: string;
  tag_and_value_pair: {
    category: string;
    [key: string]: string; // allows for additional key-value pairs
  };
  timestamp: string; // ISO string
  IsActive: boolean;
}

export interface AnalyticsReplyItem {
  title: string;
  subtitle: string;
  count: number;
  icon: React.ElementType;
}

export interface CommentTimeseriesResponse {
  by_10m: CommentTimeseriesPoint[];
  by_1h: CommentTimeseriesPoint[];
}

export interface CommentTimeseriesPoint {
  ts: number;
  negative: number;
  positive: number;
  potential_buyers: number;
  tagged_comment: number;
}

export interface CommentData {
  commentTimestamp: number;
  username: string;
  comment: string;
  repliedComment: string;
  repliedTimestamp: number;
}

