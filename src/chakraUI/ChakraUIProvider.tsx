
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ColorModeProvider, { type ColorModeProviderProps } from "./ColorMode";

// Create a base theme with minimal configuration
const theme = extendTheme({
  components: {},
});

export default function ChakraUIProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
