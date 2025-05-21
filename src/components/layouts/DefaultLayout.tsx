import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const DefaultLayout = () => {
  return (
    <Stack
      minHeight={"100vh"}
      gap={0}
      bg="white"
      justifyContent={"space-between"}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default DefaultLayout;
