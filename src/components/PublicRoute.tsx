import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  // Only render the outlet (public page) if the user is not logged in
  return !isLoading && !user ? <Outlet /> : null;
};

export default PublicRoute;
