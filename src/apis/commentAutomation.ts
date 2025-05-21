import axios from "axios";
import { CommentAutomationURL } from "@/utils/backend_urls";

interface CommentRequest {
  post_id: string;
  user_id: string;
  username: string;
  comment_text: string;
  timestamp: string;
  response_style: "friendly" | "professional" | "humorous" | "concise";
  when_to_respond: "All Comments" | "Questions Only" | "Keywords" | "Manual";
  keywords?: Array<{
    tag: string;
    value: string;
  }>;
}

interface SuggestedResponse {
  text: string;
  emoji?: string;
}

interface CommentResponse {
  success: boolean;
  message: string;
  suggested_responses?: SuggestedResponse[];
  automated_response?: string;
}

const submitComment = async (commentData: CommentRequest): Promise<CommentResponse> => {
  try {
    const response = await axios.post(CommentAutomationURL, commentData);
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

const getSuggestedResponses = async (commentData: CommentRequest): Promise<CommentResponse> => {
  try {
    const response = await axios.post(`${CommentAutomationURL}/suggest`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error getting suggested responses:", error);
    throw error;
  }
};

const commentAutomationAPI = {
  submitComment,
  getSuggestedResponses,
};

export default commentAutomationAPI; 