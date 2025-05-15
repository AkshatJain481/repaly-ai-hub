
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
