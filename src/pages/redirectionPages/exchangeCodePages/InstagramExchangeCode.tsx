import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { useExchangeCodeForTokenMutation } from "@/apis/auth";
import { OAuthPlatform } from "@/utils/enums";
import { toast } from "react-toastify";

const InstagramExchangeCode = () => {
  const [exchangeToken] = useExchangeCodeForTokenMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchAccessToken = async () => {
    const error = searchParams.get("error");
    const errorReason = searchParams.get("error_reason");

    // Handle denial case
    if (error && errorReason === "user_denied") {
      toast.info(
        "You denied access to Instagram. Please connect again if you'd like to proceed."
      );
      navigate("/");
      return;
    }

    const code = searchParams.get("code");

    if (!code) {
      console.error("No code received from Instagram");
      toast.error("An unexpected error occurred. Please try again.");
      navigate("/");
      return;
    }

    try {
      await exchangeToken({
        platformName: OAuthPlatform.instagram,
        code,
      }).unwrap();
      navigate("/dashboard/instagram/media");
    } catch (error: any) {
      console.error("Error fetching access token:", error);
      toast.error(
        `${error?.data?.message || "An unexpected error occurred. Please try again."}`
      );
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return <Loading />;
};

export default InstagramExchangeCode;
