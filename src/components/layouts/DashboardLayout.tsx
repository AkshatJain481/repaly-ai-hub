import { Box, HStack, Tabs } from "@chakra-ui/react";
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
    <HStack height={"100vh"} gap={0} overflow="hidden">
      <DashboardSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Box height={"100vh"} flex={1} bgColor={bgColor}>
        <Tabs.Root defaultValue="grid" variant="plain">
          <DashboardNavbar onOpen={() => setIsOpen(true)} />
          <Outlet />
        </Tabs.Root>
      </Box>
    </HStack>
  );
};

export default DashboardLayout;
