
"use client";

import { ChakraProvider, theme as baseTheme } from "@chakra-ui/react";
import ColorModeProvider, { type ColorModeProviderProps } from "./ColorMode";

// Create a base theme with minimal configuration
const theme = {
  ...baseTheme,
  components: {},
};

export default function ChakraUIProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
