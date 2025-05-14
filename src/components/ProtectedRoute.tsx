
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
