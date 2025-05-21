import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Avatar,
  Separator,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { secondaryTextColor, primaryColor } from "@/utils/constants";
import { logout } from "@/redux/slices/user.slice";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { platformNavConfig } from "@/utils/constants";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
  isActive: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const NavItem = ({
  icon,
  label,
  isExpanded,
  onClick,
  isActive,
}: NavItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <Flex
      ref={itemRef}
      align="center"
      p={2}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      position="relative"
      _hover={{ bg: "gray.100" }}
      onClick={onClick}
    >
      {isActive && (
        <Box
          position="absolute"
          left="0"
          height="0"
          width="4px"
          bg={primaryColor}
          borderRadius="full"
          animation={isActive ? "expandVertical 0.3s forwards" : "none"}
        />
      )}
      <Icon
        as={icon}
        boxSize={8}
        color={isActive ? primaryColor : secondaryTextColor}
      />
      <Text
        ml={4}
        fontWeight={isActive ? "bold" : "normal"}
        color={isActive ? primaryColor : secondaryTextColor}
        opacity={isExpanded ? 1 : 0}
        transition="all 0.3s ease"
        width={isExpanded ? "400px" : "0"}
        overflow="hidden"
        whiteSpace="nowrap"
        fontSize={"lg"}
      >
        {label}
      </Text>
    </Flex>
  );
};

const DashboardSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { activeAccount, userProfile } = useSelector(
    (state: RootState) => state.user
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const renderDynamicNavItems = (isMobile: boolean) => {
    if (!activeAccount?.platformName) return null;

    const platformKey = activeAccount.platformName.toLowerCase();
    const config = platformNavConfig[platformKey];

    if (!config) return null;

    return config.map(({ label, icon, path }, index) => {
      return (
        <NavItem
          key={`${label}-${index}`}
          icon={icon}
          label={label}
          isExpanded={isMobile || isExpanded}
          isActive={isActive(path)}
          onClick={() => navigate(path)}
        />
      );
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar Container For Desktop*/}
      <Box
        h="100vh"
        bg="white"
        borderRight="2px"
        borderColor="gray.200"
        borderStyle="solid"
        display={{ base: "none", md: "block" }}
        width={isExpanded ? "16rem" : "5rem"}
        transition="width 0.3s ease"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        position="relative"
      >
        <Flex direction="column" h="full" p={4} gap={8}>
          {/* Profile Section */}
          <Link to={"/dashboard"}>
            {isExpanded ? (
              <Image src="/repaly-logo.png" borderRadius={"full"} />
            ) : (
              <Image src="/logo.png" borderRadius={"full"} h={50} />
            )}
          </Link>
          <Flex
            alignItems={"center"}
            justifyContent={isExpanded ? "none" : "center"}
            gap={3}
          >
            <Avatar.Root size="md">
              <Avatar.Fallback name={userProfile?.name} />
              <Avatar.Image src={userProfile?.picture} />
            </Avatar.Root>
            {isExpanded && (
              <Stack gap={0}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.700"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  transition="all 0.3s ease"
                >
                  {userProfile?.name || "UserName"}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color="gray.500"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  transition="all 0.3s ease"
                >
                  {userProfile?.email || "username@email.com"}
                </Text>
              </Stack>
            )}
          </Flex>
          <Separator />

          {/* Navigation Items */}
          <VStack gap={4} align="stretch" position={"relative"}>
            {/* Remove global sliding active bar since we're adding individual ones */}
            <NavItem
              icon={AiFillHome}
              label="Home"
              isExpanded={isExpanded}
              isActive={isActive("/dashboard")}
              onClick={() => navigate("/dashboard")}
            />
            {renderDynamicNavItems(false)}
          </VStack>
          {/* Logout Button */}

          <Flex flexGrow={1} />

          <Button
            onClick={() => dispatch(logout())}
            colorPalette={"purple"}
            variant={"solid"}
            fontWeight={"bold"}
          >
            <Icon as={IoLogOutOutline} boxSize={6} /> {/* Forces size */}
            {isExpanded && "Logout"}
          </Button>
        </Flex>
      </Box>

      {/* Sidebar Container For Mobile*/}
      {isOpen && (
        <Box
          position="fixed"
          display={{ base: "block", md: "none" }}
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          zIndex={99}
          opacity={isOpen ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          onClick={onClose} // Close drawer when clicking outside
        />
      )}
      <Box
        position="fixed"
        top={0}
        right={isOpen ? "0" : "-16rem"} /* Slide in & out */
        h="100vh"
        bg="white"
        borderLeft="2px solid gray.200"
        width="16rem"
        zIndex={100}
        transition="right 0.3s ease-in-out"
        display={{ base: "block", md: "none" }}
      >
        <Flex direction="column" h="full" p={4} gap={8}>
          {/* Profile Section */}
          <Link to={"/dashboard"}>
            <Image src="/repaly-logo.png" borderRadius={"full"} />
          </Link>
          <Flex alignItems={"center"} gap={3}>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={userProfile?.name} />
              <Avatar.Image src={userProfile?.picture} />
            </Avatar.Root>
            <Stack gap={0}>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
                overflow="hidden"
                whiteSpace="nowrap"
                transition="all 0.3s ease"
              >
                {userProfile?.name || "User Name"}
              </Text>
              <Text
                fontSize="xs"
                fontWeight="medium"
                color="gray.500"
                overflow="hidden"
                whiteSpace="nowrap"
                transition="all 0.3s ease"
              >
                {userProfile?.email || "username@email.com"}
              </Text>
            </Stack>
          </Flex>
          <Separator />

          {/* Navigation Items */}
          <VStack gap={4} align="stretch" position={"relative"}>
            <NavItem
              icon={AiFillHome}
              label="Home"
              isExpanded={true}
              isActive={isActive("/dashboard")}
              onClick={() => navigate("/dashboard")}
            />
            {renderDynamicNavItems(true)}
          </VStack>
          {/* Logout Button */}

          <Flex flexGrow={1} />
          <Button
            onClick={() => dispatch(logout())}
            colorPalette={"purple"}
            variant={"solid"}
            fontWeight={"bold"}
          >
            <Icon as={IoLogOutOutline} boxSize={6} /> {/* Forces size */}
            Logout
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default DashboardSidebar;
