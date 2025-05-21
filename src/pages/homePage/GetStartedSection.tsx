import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  VStack,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { primaryColor } from "@/utils/constants";
import LoginDrawer from "@/components/common/LoginDrawer";

const GetStartedSection = () => {
  return (
    <Box
      w="100%"
      py={{ base: 10, md: 20 }}
      bg={primaryColor}
      color={"white"}
      px={1}
    >
      <Container maxW="container.md">
        <VStack gap={6} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            lineHeight={"1.2"}
          >
            Try Repaly for Free
          </Heading>

          <Text fontSize="lg" fontWeight={"bold"} maxW="xl" mx="auto">
            Transform your social media interactions with AI-powered replies!
            Start automating your engagement today.
          </Text>

          <LoginDrawer
            triggerButton={
              <Button
                bg={"white"}
                color={primaryColor}
                size="lg"
                px={6}
                py={6}
                borderRadius="full"
                fontWeight="bold"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: `0 10px 15px -3px #ffffff20`,
                }}
                transition="all 0.3s"
              >
                Get Started for Free
                <FiArrowRight />
              </Button>
            }
          />

          <Text fontSize="md" mt={2}>
            No credit card required. Free plan available.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default GetStartedSection;
