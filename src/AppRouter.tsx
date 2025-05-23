import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstagramExchangeCode from "@/pages/redirectionPages/exchangeCodePages/InstagramExchangeCode";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import HomePage from "@/pages/homePage/HomePage";
import GoogleAuthentication from "./pages/redirectionPages/authenticationPages/GoogleAuthentication";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardHomePage from "./pages/dashboardPages/dashboardHomePage/DashboardHomePage";
import ErrorPage from "./pages/ErrorPage";
import BusinessDetailsFormPage from "./pages/businessDetailsFormPage/BusinessDetailsFormPage";
import DemoPage from "./pages/demoPage/DemoPage";
import InstagramMediaDetailPage from "./pages/dashboardPages/instagramMediaPage/InstagramMediaDetailPage";
import InstagramMediaPage from "./pages/dashboardPages/instagramMediaPage/InstagramMediaPage";
import InstagramStoryPage from "./pages/dashboardPages/instagramStoryPage/InstagramStoryPage";
import InstagramStoryDetailPage from "./pages/dashboardPages/instagramStoryPage/InstagramStoryDetailPage";
import AuthProtectedRoute from "./pages/protectedRoutes/AuthProtectedRoute";
import { TokenExpiryWatcher } from "./hooks/useTokenExpiryWatcher";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import FacebookAuthentication from "./pages/redirectionPages/authenticationPages/FacebookAuthentication";
import MindMapPage from "./pages/mindMapPage/MindMapPage";

const AppRouter = () => {
  return (
    <Router>
      <TokenExpiryWatcher />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="auth/google" element={<GoogleAuthentication />} />
          <Route path="auth/facebook" element={<FacebookAuthentication />} />
          <Route
            path="exchange-code/instagram"
            element={<InstagramExchangeCode />}
          />
          <Route path="demo" element={<DemoPage />} />
        </Route>

        <Route path="dashboard" element={<AuthProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="instagram">
              <Route path="media" element={<InstagramMediaPage />} />
              <Route path="story" element={<InstagramStoryPage />} />
              <Route path="mind-maps" element={<MindMapPage />} />
            </Route>
          </Route>

          <Route path="instagram">
            <Route
              path="media/:mediaId"
              element={<InstagramMediaDetailPage />}
            />
            <Route
              path="story/:storyId"
              element={<InstagramStoryDetailPage />}
            />
          </Route>
        </Route>

        <Route path="user" element={<AuthProtectedRoute />}>
          <Route path="business-detail" element={<BusinessDetailsFormPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
