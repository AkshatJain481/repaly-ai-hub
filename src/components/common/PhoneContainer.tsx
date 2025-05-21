import { useEffect, useState } from "react";
import { Box, Flex, Text, Icon , Stack} from "@chakra-ui/react";
import { BsBatteryFull, BsReception4 } from "react-icons/bs";
import { FaRegSquare } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const PhoneContainer = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack minW={"340px"}>
      <Box position="relative" w="340px" mx="auto">
        {/* Volume up button */}
        <Box
          position="absolute"
          left="-8px"
          w="4px"
          h="30px"
          bg="#374151"
          borderTopLeftRadius="2px"
          borderBottomLeftRadius="2px"
          zIndex="20"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          top="100px"
        />

        {/* Volume down button */}
        <Box
          position="absolute"
          left="-8px"
          w="4px"
          h="30px"
          bg="#374151"
          borderTopLeftRadius="2px"
          borderBottomLeftRadius="2px"
          zIndex="20"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
          top="140px"
        />

        {/* Power button */}
        <Box
          position="absolute"
          right="-8px"
          top="120px"
          w="4px"
          h="40px"
          bg="#374151"
          borderTopRightRadius="2px"
          borderBottomRightRadius="2px"
          zIndex="20"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
        />

        <Box
          border="8px solid black"
          borderRadius="40px"
          w="340px"
          p="1px"
          bg="black"
          position="relative"
          overflow="hidden"
          boxShadow="0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 15px -2px rgba(0, 0, 0, 0.1)"
        >
          {/* Phone Notch */}
          <Box
            position="absolute"
            top="0"
            left="50%"
            transform="translateX(-50%)"
            w="40%"
            h="25px"
            bg="black"
            borderBottomLeftRadius="12px"
            borderBottomRightRadius="12px"
            zIndex="30"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="8px"
              h="8px"
              borderRadius="50%"
              bg="#374151"
            />
          </Box>

          <Box bg="white" overflow="hidden" h="650px">
            {/* Phone Status bar */}
            <Flex
              bg="gray.900"
              px="3"
              pt="1.5"
              align="center"
              justify="space-between"
              fontSize="xs"
              color="white"
            >
              <Text>{time}</Text>

              <Flex align="center" gap="1">
                <Flex align="center" gap="1">
                  <BsReception4 size={14} opacity={0.6} />
                </Flex>

                <Flex align="center" gap="1">
                  <Text>100%</Text>
                  <BsBatteryFull size={20} opacity={0.8} />
                </Flex>
              </Flex>
            </Flex>

            {/* Phone Content */}
            <Box>{children}</Box>
            <Flex
              justify="space-around"
              align="center"
              px={6}
              py={3}
              bottom={0}
              left={0}
              right={0}
              bg="gray.900"
              color="white"
              position={"absolute"}
              zIndex={20}
              borderTop="1px solid rgba(255,255,255,0.1)"
            >
              <Icon as={RxHamburgerMenu} aria-label="More" color="white" />
              <Icon
                as={FaRegSquare}
                aria-label="Home"
                color="white"
                boxSize={3}
              />
              <Icon as={IoChevronBack} aria-label="Back" color="white" />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default PhoneContainer;
