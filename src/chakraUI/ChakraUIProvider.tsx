
"use client";

import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";
import ColorModeProvider, { type ColorModeProviderProps } from "./ColorMode";

// Create a base theme with minimal configuration
const theme = extendBaseTheme({
  components: {},
});

export default function ChakraUIProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
