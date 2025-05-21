import { Stack } from "@chakra-ui/react";
import AccountManager from "./AccountManager";

const DashboardHomePage = () => {
  return (
    <Stack gap={4} mx={"auto"} my={2}>
      <AccountManager />
    </Stack>
  );
};

export default DashboardHomePage;
