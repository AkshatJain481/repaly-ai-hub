
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthDrawer from "./components/AuthDrawer";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AccountsPage from "./pages/dashboard/AccountsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import InstagramPostsPage from "./pages/dashboard/instagram/InstagramPostsPage";
import InstagramStoriesPage from "./pages/dashboard/instagram/InstagramStoriesPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Protected Dashboard Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="accounts" element={<AccountsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="instagram/:id/posts" element={<InstagramPostsPage />} />
                  <Route path="instagram/:id/stories" element={<InstagramStoriesPage />} />
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AuthDrawer />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
