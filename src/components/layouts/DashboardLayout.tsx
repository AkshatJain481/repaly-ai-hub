
import DashboardSidebar from "../ui/DashboardSidebar";
import { Outlet } from "react-router-dom";
import { bgColor } from "@/utils/constants";
import { useState } from "react";
import { useGetUserAccountsQuery, useGetUserProfileQuery } from "@/apis/user";
import Loading from "../common/Loading";
import DashboardNavbar from "../ui/DashboardNavbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isLoading: accountsLoading } = useGetUserAccountsQuery();
  const { isLoading: profileLoading } = useGetUserProfileQuery();

  if (accountsLoading || profileLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="h-screen flex-1" style={{backgroundColor: bgColor}}>
        <div>
          <DashboardNavbar onOpen={() => setIsOpen(true)} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
