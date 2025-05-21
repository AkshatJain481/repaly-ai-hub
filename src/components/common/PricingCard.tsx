import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import {
  primaryColor,
  textColor,
  secondaryTextColor,
} from "@/utils/constants";
import LoginDrawer from "./LoginDrawer";

interface FeatureItem {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: FeatureItem[];
  buttonText: string;
  isPopular?: boolean;
  onClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period = "/month",
  features,
  buttonText,
  isPopular = false,
  onClick,
}) => {
  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      borderWidth={"2px"}
      borderColor={isPopular ? primaryColor : "gray.100"}
      p={8}
      position="relative"
      bg="white"
      height="full"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
      }}
      width={"sm"}
      filter="blur(4px)" // Apply blur effect
      pointerEvents="none" // Prevent interactions if needed
      opacity="0.7"
    >
      {isPopular && (
        <Badge
          position="absolute"
          top={3}
          right={3}
          bg={primaryColor}
          color="white"
          fontWeight="extrabold"
          borderRadius="full"
          px={3}
          py={1}
        >
          POPULAR
        </Badge>
      )}

      <VStack align="flex-start" gap={3} mb={6}>
        <Heading as="h3" fontSize="2xl" fontWeight="bold" color={textColor}>
          {title}
        </Heading>
        <Text
          color={secondaryTextColor}
          fontSize={"lg"}
          textAlign={"left"}
          maxW={"11/12"}
        >
          {description}
        </Text>
      </VStack>

      <Flex align="baseline" mb={6}>
        <Heading as="h2" fontSize="4xl" fontWeight="bold" color={textColor}>
          {price !== "Custom" && "₹"} {price}
        </Heading>
        {price !== "Custom" && (
          <Text
            fontSize="lg"
            fontWeight={"medium"}
            color={secondaryTextColor}
            ml={1}
          >
            {period}
          </Text>
        )}
      </Flex>

      <LoginDrawer
        triggerButton={
          <Button
            width="full"
            bg={primaryColor}
            color="white"
            borderRadius="lg"
            fontWeight={"bold"}
            py={4}
            _hover={{
              bg: `${primaryColor}90`,
            }}
            mb={6}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        }
      />

      <VStack align="stretch" gap={3}>
        {features.map((feature, index) => (
          <Flex key={index} align="center" gap={3}>
            <Box color={primaryColor}>
              <BsCheckCircle size={20} />
            </Box>
            <Text fontSize="md">{feature.text}</Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default PricingCard;
