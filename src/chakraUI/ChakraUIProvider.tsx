
"use client";

import { ChakraProvider, createMultiStyleConfig } from "@chakra-ui/react";
import ColorModeProvider, { type ColorModeProviderProps } from "./ColorMode";

// Create a base theme with minimal configuration
const theme = {
  components: {
    // Example of how to create component styles in v3
    Button: createMultiStyleConfig({
      baseStyle: {
        fontWeight: "medium",
      }
    })
  }
};

export default function ChakraUIProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
