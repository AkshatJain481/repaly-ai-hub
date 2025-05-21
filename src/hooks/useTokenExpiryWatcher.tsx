import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/user.slice";
import { toast } from "react-toastify";

const useTokenExpiryWatcher = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("user-token");
      if (!token) return;
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp) {
          const expiryTime = decoded.exp * 1000; // to milliseconds
          const currentTime = Date.now();

          if (currentTime >= expiryTime) {
            toast.info("Session Expired! Login again.");
            dispatch(logout());
          }
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        toast.info("Session Expired! Login again.");
        dispatch(logout());
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useTokenExpiryWatcher;
