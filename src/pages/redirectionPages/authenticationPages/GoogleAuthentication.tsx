import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetAccessTokenQuery } from "@/apis/auth";
import { OAuthPlatform } from "@/utils/enums";
import { toast } from "react-toastify";
import Loading from "@/components/common/Loading";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/user.slice";

const GoogleAuthentication = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const { data, error } = useGetAccessTokenQuery(
    { code: code || "", platformName: OAuthPlatform.google },
    { skip: !code }
  );

  useEffect(() => {
    if (!code || error) {
      toast.error(`Error occurred: Unknown error`);
      setTimeout(() => {
      dispatch(logout());
      }, 3000);
    }
  }, [code, error, navigate]);

  useEffect(() => {
    if (data) {
      navigate(
        data?.isBusinessDetailsFilled ? "/dashboard" : "/user/business-detail"
      );
    }
  }, [data, navigate]);

  return <Loading />;
};

export default GoogleAuthentication;
