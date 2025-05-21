import { Box } from "@chakra-ui/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { primaryColor } from "@/utils/constants";

const Loading = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <PropagateLoader size={26} color={primaryColor} />
    </Box>
  );
};

export default Loading;
