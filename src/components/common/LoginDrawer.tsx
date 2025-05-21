import { useState, useEffect } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { Button, VStack, Heading, Text } from "@chakra-ui/react";
import { OAuthPlatform } from "@/utils/enums";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getOAuthLink } from "@/apis/oauthLink";

const LoginDrawer = ({ triggerButton }: { triggerButton: any }) => {
  // OAuth login handler
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const oauthLink = (provider: string) => {
    window.location.href = getOAuthLink(provider);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user-token"); // Adjust key as needed
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleTriggerClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect if authenticated
    }
  };

  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild onClick={handleTriggerClick}>
        {triggerButton}
      </DrawerTrigger>
      <DrawerContent overflow="hidden" maxWidth="400px">
        <DrawerHeader bg="gray.50" py={6} display={"block"}>
          <Heading size="xl" textAlign={"center"} color="gray.800" mb={2}>
            Welcome Back
          </Heading>
          <Text color="gray.500" fontSize="md" textAlign={"center"}>
            Sign in to continue to your account
          </Text>
        </DrawerHeader>
        <DrawerBody bg="white" p={8} display={"flex"} alignItems={"center"}>
          <VStack gap={4} width="full">
            <Button
              variant="outline"
              bgColor={"red.500"}
              colorScheme="gray"
              size="lg"
              width="full"
              borderWidth={2}
              borderColor="red.500"
              color="white"
              fontWeight="semibold"
              py={6}
              _hover={{
                bg: "red.400",
                borderColor: "red.400",
                transform: "scale(1.02)",
              }}
              transition="all 0.2s ease"
              onClick={() => oauthLink(OAuthPlatform.google)}
            >
              <FaGoogle />
              Sign In with Google
            </Button>
            <Button
              variant="outline"
              bgColor={"blue.500"}
              colorScheme="gray"
              size="lg"
              width="full"
              borderWidth={2}
              borderColor="blue.500"
              color="white"
              fontWeight="semibold"
              py={6}
              _hover={{
                bg: "blue.400",
                borderColor: "blue.400",
                transform: "scale(1.02)",
              }}
              transition="all 0.2s ease"
              onClick={() => oauthLink(OAuthPlatform.facebook)}
            >
              <FaFacebook />
              Sign In with Facebook
            </Button>
            <Text color="gray.500" textAlign="center" fontSize="sm" px={4}>
              By continuing, you agree to our{" "}
              <Text
                as="span"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                as="span"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                Privacy Policy
              </Text>
            </Text>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default LoginDrawer;
