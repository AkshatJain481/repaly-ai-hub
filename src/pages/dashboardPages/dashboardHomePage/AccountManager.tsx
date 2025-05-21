import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Avatar,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Icon,
  Wrap,
  WrapItem,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { FaCheck, FaUsers } from "react-icons/fa";
import { getFormattedDate } from "@/utils/commonFunctions";
import { PlatformAccount } from "@/utils/interfaces";
import { getOAuthLink } from "@/apis/oauthLink";
import { useNavigate } from "react-router-dom";
import { socialMediaPlatforms } from "@/utils/constants";
import { setActiveAccount } from "@/redux/slices/user.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmationPopup from "@/components/common/ConfirmationPopup";
import { useState } from "react";
import { useDeleteInstagramAccountMutation } from "@/apis/instagram";
import { useLazyGetUserAccountsQuery } from "@/apis/user";

const AccountManager = () => {
  const userAccounts = useSelector(
    (state: RootState) => state.user.userAccounts
  );
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const [deleteAccount, { isLoading: isDeleteAccountLoading }] =
    useDeleteInstagramAccountMutation();

  const [triggerGetAccounts, { isLoading: isGetAccountsLoading }] =
    useLazyGetUserAccountsQuery();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const cardBg = "white";
  const cardShadow = "sm";
  const borderColor = "gray.200";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [accountIndex, setAccountIndex] = useState<number | null>(null);
  const OpenConfirmationPopup = (accountIndex: number) => {
    setIsOpen(true);
    setAccountIndex(accountIndex);
  };
  const ClosePopup = () => {
    setIsOpen(false);
    setAccountIndex(null);
  };
  const DeleteAccount = async () => {
    if (accountIndex === null) return;
    try {
      await deleteAccount(userAccounts[accountIndex].id);
      await triggerGetAccounts();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      ClosePopup();
    }
  };

  const handleAddAccount = (platformName: string) => {
    window.location.href = getOAuthLink(platformName.toLocaleLowerCase());
  };

  const handleSelectAccount = (account: PlatformAccount) => {
    dispatch(setActiveAccount(account));
  };

  const renderSocialMediaIcons = () => {
    return (
      <>
        {socialMediaPlatforms.map((platform) => (
          <WrapItem key={platform.name}>
            <Box
              onClick={() =>
                platform.name === "Instagram" && handleAddAccount(platform.name)
              }
              cursor="pointer"
              w="60px"
              h="60px"
              borderRadius="lg"
              bg={`rgba(${parseInt(platform.color.slice(1, 3), 16)}, ${parseInt(platform.color.slice(3, 5), 16)}, ${parseInt(platform.color.slice(5, 7), 16)}, 0.1)`}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              transition="all 0.3s"
              _hover={{
                transform: "scale(1.05)",
                bg: `rgba(${parseInt(platform.color.slice(1, 3), 16)}, ${parseInt(platform.color.slice(3, 5), 16)}, ${parseInt(platform.color.slice(5, 7), 16)}, 0.2)`,
              }}
              p={3}
            >
              <Icon
                as={platform.icon}
                color={platform.color}
                boxSize={8}
                mb={1}
                filter={platform.name === "Instagram" ? "none" : "blur(4px)"}
              />
            </Box>
          </WrapItem>
        ))}
      </>
    );
  };

  if (!userAccounts.length) {
    return (
      <Flex
        minHeight="60vh"
        alignItems="center"
        justifyContent="center"
        p={4}
        direction="column"
      >
        <Box
          p={8}
          borderRadius="xl"
          bg={cardBg}
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow={cardShadow}
          transition="all 0.3s"
        >
          <Box
            w={40}
            h={40}
            mx="auto"
            mb={6}
            borderRadius="full"
            bg="#c9c1f9"
            opacity={0.2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FaUsers size="5rem" color="#9b87f5" style={{ opacity: 0.8 }} />
          </Box>
          <Heading as="h2" size="lg" textAlign="center" mb={2}>
            Connect your accounts
          </Heading>
          <Text textAlign="center" mb={8} color="#6B7280">
            Link your social media accounts to start automating your content and
            engagement.
          </Text>

          <Wrap gap={4} justify="center" mb={6}>
            {renderSocialMediaIcons()}
          </Wrap>
        </Box>
      </Flex>
    );
  }

  return (
    <Container maxW="6xl" py={8} px={4} overflow={"auto"} maxH={"90vh"}>
      <ConfirmationPopup
        loading={isDeleteAccountLoading || isGetAccountsLoading}
        isOpen={isOpen}
        onClose={ClosePopup}
        message="Are you sure you want to delete your account?"
        onConfirm={DeleteAccount}
      />
      <Box
        mb={8}
        p={6}
        borderRadius="lg"
        bg={cardBg}
        boxShadow={cardShadow}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Wrap gap={5} justify="center">
          {renderSocialMediaIcons()}
        </Wrap>
      </Box>

      <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
        {userAccounts.map((account: PlatformAccount, index: number) => {
          const platform = socialMediaPlatforms.find(
            (p) =>
              p?.name?.toLowerCase() === account?.platformName?.toLowerCase()
          );
          return (
            <Card.Root
              key={`${account.platformName}-${account.id}`}
              position="relative"
              overflow="hidden"
              bg={cardBg}
              borderRadius="xl"
              borderWidth="2px"
              borderColor={
                activeAccount?.id === account.id ? platform?.color : borderColor
              }
              boxShadow={activeAccount?.id === account.id ? "md" : cardShadow}
              transition="all 0.3s"
              _hover={{
                boxShadow: "md",
                transform: "translateY(-4px)",
              }}
              cursor="pointer"
              onClick={() => {
                handleSelectAccount(account);

                setTimeout(() => {
                  navigate("/dashboard/instagram/media");
                }, 500);
              }}
              mb={4}
              h="100%"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="10px"
                bg={platform?.color || "#9b87f5"}
              />

              <HStack position="absolute" top={4} left={4} gap={2}>
                {platform && (
                  <Icon as={platform.icon} color={platform.color} boxSize={5} />
                )}
                <Text fontWeight="bold" color={platform?.color || "#9b87f5"}>
                  {platform?.name}
                </Text>
              </HStack>

              {activeAccount?.id === account.id && (
                <Box
                  position="absolute"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  top={4}
                  right={4}
                  bg={"blue.500"}
                  borderRadius="full"
                  p={1.5}
                  h={6}
                  w={6}
                  boxShadow="md"
                  zIndex={1}
                >
                  <Icon as={FaCheck} color="white" boxSize={3} />
                </Box>
              )}

              <CardBody pt={16} px={6} pb={3}>
                <VStack gap={3} align="center">
                  <Box
                    position="relative"
                    mt={6}
                    mx="auto"
                    w={24}
                    h={24}
                    borderRadius="full"
                    borderWidth={3}
                    borderColor="white"
                    bg="white"
                    boxShadow="md"
                    overflow="hidden"
                  >
                    <Avatar.Root size="full">
                      <Avatar.Fallback name={account?.name} />
                      <Avatar.Image src={account?.profile_picture_url} />
                    </Avatar.Root>
                  </Box>

                  <Box textAlign="center" w="full">
                    <Heading
                      as="h3"
                      size="md"
                      fontWeight="semibold"
                      lineClamp={1}
                      mb={1}
                    >
                      {account.name || account.username}
                    </Heading>
                    <Text
                      color="#6B7280"
                      fontSize="sm"
                      mb={3}
                      fontStyle="italic"
                    >
                      @{account.username}
                    </Text>
                  </Box>

                  <Separator />

                  <Flex w="full" justifyContent="space-between">
                    <Stack fontSize="xs" color="#6B7280">
                      <HStack>
                        <Text fontWeight="medium">Posts:</Text>
                        <Text>{account.media_count}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="medium">Updated:</Text>
                        <Text>{getFormattedDate(account.updated_time)}</Text>
                      </HStack>
                    </Stack>
                    <Stack onClick={(e) => e.stopPropagation()}>
                      <MdDeleteOutline
                        color="red"
                        size={26}
                        onClick={() => OpenConfirmationPopup(index)}
                      />
                    </Stack>
                  </Flex>
                </VStack>
              </CardBody>
            </Card.Root>
          );
        })}
      </Grid>
    </Container>
  );
};

export default AccountManager;
