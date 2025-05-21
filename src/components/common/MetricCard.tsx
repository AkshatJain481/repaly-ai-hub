import { Box, Flex, Text } from "@chakra-ui/react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const MetricCard = ({
  title,
  value,
  percentChange,
  isPositive,
  iconBgColor,
  icon,
}: {
  title: string;
  value?: number;
  percentChange?: number;
  isPositive?: boolean;
  iconBgColor: string;
  icon: any;
}) => {
  // Determine if we should show percentage change
  const showPercentage = percentChange !== undefined;

  return (
    <Box
      bg="white"
      shadow={"xs"}
      borderRadius="lg"
      p={4}
      height="full"
      width="full"
    >
      <Flex gap={4}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Box
            bg={iconBgColor}
            borderRadius="full"
            p={2}
            color="white"
            fontSize="3xl"
          >
            {icon}
          </Box>
        </Box>
        <Box p={0}>
          <Text color="gray.500" fontSize="md" fontWeight={"bold"}>
            {title}
          </Text>
          <Flex alignItems="center">
            <Text fontSize="4xl" fontWeight="bold" mr={2}>
              {value ?? "No Data"}
            </Text>

            {showPercentage && (
              <Flex
                alignItems="center"
                fontSize="sm"
                color={isPositive ? "green.500" : "red.500"}
              >
                {isPositive ? (
                  <FiArrowUp className="mr-1" />
                ) : (
                  <FiArrowDown className="mr-1" />
                )}
                <Text>{Math.abs(percentChange)}%</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default MetricCard;
