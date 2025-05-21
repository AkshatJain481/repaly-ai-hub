import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/user.slice";
import { isTokenExpired } from "@/utils/commonFunctions";

const AuthProtectedRoute = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("user-token");

  if (!token || isTokenExpired(token)) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
