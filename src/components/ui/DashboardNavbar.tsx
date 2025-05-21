import { Box, Flex, Icon } from "@chakra-ui/react";
import { secondaryTextColor } from "@/utils/constants";
import { GoBell } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";

const DashboardNavbar = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Box
      bg={"white"}
      px={4}
      py={3}
      borderBottom={"2px"}
      borderStyle={"solid"}
      borderColor={"gray.200"}
    >
      <Flex
        alignItems="center"
        justifyContent={{ base: "space-between", md: "end" }}
        gap={0}
      >
        <GoBell size={26} color={secondaryTextColor} />
        <Icon
          onClick={onOpen}
          cursor="pointer"
          boxSize={26}
          as={GiHamburgerMenu}
          display={{ base: "block", md: "none" }}
        />
      </Flex>
    </Box>
  );
};

export default DashboardNavbar;
