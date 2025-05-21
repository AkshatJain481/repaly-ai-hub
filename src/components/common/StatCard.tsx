import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { primaryColor, secondaryTextColor } from "@/utils/constants";

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactElement;
  valueColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  valueColor = primaryColor,
}) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      textAlign="center"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "md",
      }}
    >
      <VStack gap={2}>
        {icon && (
          <Box color={primaryColor} mb={2}>
            {icon}
          </Box>
        )}
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color={valueColor}
          lineHeight="1"
        >
          {value}
        </Text>
        <Text fontSize="md" color={secondaryTextColor}>
          {label}
        </Text>
      </VStack>
    </Box>
  );
};

export default StatCard;
