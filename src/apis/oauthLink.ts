// utils/getOAuthLink.ts
import { OAuthPlatform } from "@/utils/enums";

export function getOAuthLink(provider: string): string {
  if (provider === OAuthPlatform.google) return getGoogleAuthLink();
  if (provider === OAuthPlatform.facebook) return getFacebookAuthLink();
  if (provider === OAuthPlatform.instagram) return getInstagramAuthLink();
  return getTwitterAuthLink();
}

function getInstagramAuthLink() {
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
    redirect_uri: `${window.location.origin}/exchange-code/instagram`,
    response_type: "code",
    scope:
      "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments",
  });
  return `https://api.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&${params.toString()}`;
}

function getGoogleAuthLink() {
  const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirect_uri = `${window.location.origin}/auth/google`;
  const scope = "email profile openid";
  return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=state_parameter_passthrough_value`;
}

function getFacebookAuthLink() {
  const client_id = "476469342032707";
  const redirect_uri = `${window.location.origin}/auth/facebook`;
  const display = "page";
  const response_type = "code";
  const scope = encodeURIComponent(
    "email,instagram_basic,pages_show_list,pages_read_engagement"
  );

  const extras = encodeURIComponent(
    JSON.stringify({
      setup: { config_id: "1117094546845705" },
    })
  );

  const queryString =
    `client_id=${client_id}` +
    `&display=${display}` +
    `&redirect_uri=${redirect_uri}` +
    `&response_type=${response_type}` +
    `&scope=${scope}` +
    `&extras=${extras}`;

  return `https://www.facebook.com/v21.0/dialog/oauth?${queryString}`;
}

function getTwitterAuthLink() {
  const client_id = "temp";
  const redirect_uri = `${window.location.origin}/auth/twitter`;
  const scope = "email profile openid";
  return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=state_parameter_passthrough_value`;
}
