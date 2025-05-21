import { Text } from "@chakra-ui/react";
import { secondaryTextColor, primaryColor } from "@/utils/constants";

const NavText = ({ name }: { name: string }) => {
  return (
    <Text
      color={secondaryTextColor}
      className="cursor-pointer"
      fontWeight="bold"
      position="relative"
      transition="all 0.2s ease-in-out"
      _hover={{
        color: primaryColor, // Border color on hover
        _after: {
          width: "100%", // Expands fully on hover
        },
      }}
      _after={{
        content: '""',
        position: "absolute",
        left: 0,
        bottom: "-2px", // Adjust the distance from text
        width: "0%", // Start with no width
        height: "2px", // Border height
        backgroundColor: primaryColor, // Border color
        transition: "width 0.3s ease-in-out", // Smooth expansion
      }}
    >
      {name}
    </Text>
  );
};

export default NavText;
