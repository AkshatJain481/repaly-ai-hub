const backendURL = import.meta.env.VITE_BACKEND_URL;

// User-related endpoints
export const BusinessDetailsURL = `${backendURL}/user/business-details`;
export const UserProfileURL = `${backendURL}/user/profile`;
export const UserAccountsURL = `${backendURL}/account`;

// Authentication endpoints
export const GetAccessTokenURL = `${backendURL}/auth/get-access-token`;
export const ValidateTokenURL = `${backendURL}/auth/validate-token`;
export const ExchangeCodeURL = `${backendURL}/exchange-code`;

// Instagram media-related endpoints
export const InstagramMediaURL = `${backendURL}/instagram/:accountId/media`;
export const InstagramGetMediaURL = `${backendURL}/instagram/:accountId/get-media`;
export const InstagramPutMediaURL = `${backendURL}/instagram/:accountId/update-media`;
export const InstagramDeleteAccountURL = `${backendURL}/instagram/:accountId/delete-account`;
export const InstagramMediaAnalyticsURL = `${backendURL}/instagram/:mediaId/analytics-stats`;
export const InstagramMediaDetailsURL = `${backendURL}/instagram/:mediaId/media-details`;
export const InstagramGetStoriesURL = `${backendURL}/instagram/:accountId/get-story`;
export const InstagramPutStoriesURL = `${backendURL}/instagram/:accountId/update-story`;
export const InstagramGetStoryDetailsURL = `${backendURL}/instagram/:storyId/story-details`;
export const InstagramGetStoryAnalyticsURL = `${backendURL}/instagram/:storyId/story-analytics`;
export const InstagramGetMediaCommentTimeSeriesURL = `${backendURL}/instagram/:mediaId/comment-timeseries`;
export const InstagramGetMediaCommmentsURL = `${backendURL}/instagram/:mediaId/comments/:type`;

// Automation-related endpoints
export const CommentAutomationURL = `${backendURL}/comment-automation`;
export const ApplyAutomationURL = `${backendURL}/instagram/:mediaId/response-type`;
export const SuggestReplyURL = `${backendURL}/ai-services/suggest-reply`;
export const GenerateTagsURL = `${backendURL}/ai-services/generate-tags`;
export const InstagramStoryAutomationURL = `${backendURL}/instagram/:storyId/apply-automation-story`;
