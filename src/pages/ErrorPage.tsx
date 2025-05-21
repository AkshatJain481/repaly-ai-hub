import { Box, Heading, Stack, Text, Button, Icon } from "@chakra-ui/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      flex="1"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, purple.500, purple.700)"
      color="black"
      textAlign="center"
      px={4}
    >
      <Stack gap={6} align="center">
        {/* Error Heading */}
        <Heading size="2xl" fontWeight="bold">
          Oops!! 404 - Page Not Found
        </Heading>

        {/* Error Description */}
        <Text fontSize="lg" maxW="600px">
          Sorry, we couldn't find what you're looking for. Please check the URL
          or head back home!
        </Text>

        {/* Action Buttons */}
        <Stack direction="row" gap={4}>
          <Button
            colorScheme="purple"
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <Icon as={FaArrowLeft} />
            Go Back
          </Button>
          <Button colorPalette="purple" size="lg" onClick={() => navigate("/")}>
            <Icon as={FaHome} />
            Go Home
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ErrorPage;
