import { Flex, Stack, Button, Image } from "@chakra-ui/react";
import MenuText from "./NavText";
import LoginDrawer from "@/components/common/LoginDrawer";
import { primaryColor } from "@/utils/constants";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const pages = [
    { name: "Product", section: "product" },
    { name: "Features", section: "features" },
    { name: "Pricing", section: "pricing" },
    { name: "About Us", section: "about" },
  ];

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    scroll.scrollToTop({ duration: 500 });
  };

  return (
    <Flex
      height="70px"
      bg="white"
      px={{ base: 6, sm: 12, md: 24 }}
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray.100"
      alignItems="center"
      position="sticky"
      top={0}
      justify="space-between"
      zIndex={100}
    >
      {/* Logo Section */}
      <Flex alignItems="center" justifyContent="flex-start">
        <Stack onClick={handleLogoClick} cursor={"pointer"}>
          <Image
            src="/repaly-logo.png"
            alt="Logo"
            width={{ base: "100px", md: "120px", lg: "200px" }}
            borderRadius={"full"}
          />
        </Stack>
      </Flex>

      {/* Menu Items */}
      <Flex
        justifyContent="center"
        gap={{ base: 4, md: 12 }}
        display={{ base: "none", lg: "flex" }}
      >
        {pages.map((page) => (
          <ScrollLink
            key={page.name}
            to={page.section}
            smooth={true}
            duration={500}
            offset={-70} // Optional for header offset
          >
            <MenuText name={page.name} />
          </ScrollLink>
        ))}
      </Flex>

      {/* Login Button */}
      <Flex alignItems="center" justifyContent="flex-end">
        <LoginDrawer
          triggerButton={
            <Button
              bg={primaryColor}
              color="white"
              size={{ base: "sm", xl: "lg" }}
              px={{ base: 4, xl: 8 }}
              py={4}
              borderRadius="full"
              fontWeight="bold"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: `0 10px 15px -3px ${primaryColor}20`,
              }}
              transition="all 0.3s"
            >
              Get Started
            </Button>
          }
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
