import {
  Menu,
  Portal,
  Stack,
  Text,
  Icon,
  Button,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { socialMediaPlatforms } from "@/utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveAccount } from "@/redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { PiUserCircleDuotone } from "react-icons/pi";

const AccountDropdown = () => {
  const dispatch = useDispatch();
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const userAccounts = useSelector(
    (state: RootState) => state.user.userAccounts
  );

  const socialMedia = (platformName: string | undefined) => {
    switch (platformName) {
      case "instagram":
        return socialMediaPlatforms[0];
      default:
        return socialMediaPlatforms[0];
    }
  };

  if (userAccounts.length === 0) return null;

  return (
    <Stack>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            border={"solid"}
            borderWidth={"1px"}
            borderColor={"gray.200"}
            cursor={"pointer"}
            variant={"subtle"}
            p={4}
            _focus={{ outline: "none" }}
            h={"55px"}
            w={"full"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={3}
            bg={"white"}
            boxShadow={"sm"}
            borderRadius={"md"}
            _hover={{
              bg: "gray.50",
              boxShadow: "md",
            }}
            transition={"all 0.2s ease"}
          >
            {" "}
            <HStack>
              <Avatar.Root size="xl">
                <Avatar.Fallback boxSize={12} as={PiUserCircleDuotone} />
                <Avatar.Image src={activeAccount?.profile_picture_url} />
              </Avatar.Root>
              <Stack gap={0} textAlign={"left"}>
                <Text fontWeight={"semibold"} color={"gray.800"}>
                  {activeAccount?.name || "Full Name"}
                </Text>
                <Text color={"gray.500"} fontSize={"sm"}>
                  {activeAccount?.username || "Username"}
                </Text>
              </Stack>{" "}
            </HStack>
            <Icon
              as={socialMedia(activeAccount?.platformName)?.icon}
              color={socialMedia(activeAccount?.platformName)?.color}
              boxSize={6}
            />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content
              borderRadius={"md"}
              boxShadow={"lg"}
              border={"1px solid"}
              borderColor={"gray.100"}
              bg={"white"}
              p={1}
            >
              {userAccounts.map((account, index) => (
                <Menu.Item
                  key={index}
                  value={account.id}
                  onClick={() => dispatch(setActiveAccount(account))}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={3}
                  px={3}
                  py={2}
                  borderRadius={"sm"}
                  _hover={{
                    bg: "gray.100",
                    cursor: "pointer",
                  }}
                  transition={"all 0.2s ease"}
                >
                  <HStack>
                    <Avatar.Root size="xl">
                      <Avatar.Fallback boxSize={12} as={PiUserCircleDuotone} />
                      <Avatar.Image src={account?.profile_picture_url} />
                    </Avatar.Root>
                    <Stack textAlign={"left"} gap={0}>
                      <Text fontWeight={"medium"} color={"gray.800"}>
                        {account?.name}
                      </Text>
                      <Text color={"gray.500"} fontSize={"sm"}>
                        {account?.username}
                      </Text>
                    </Stack>
                  </HStack>
                  <Icon
                    as={socialMedia(account.platformName)?.icon}
                    color={socialMedia(account.platformName)?.color}
                    boxSize={6}
                  />
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Stack>
  );
};

export default AccountDropdown;
