import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ChakraBaseProvider,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { MainDataProvider } from "@/hooks/MainDataProvider";
export const theme = extendTheme({
  colors: {
    brand: {
      prizepoker_background: "#131312",
      prizepoker_white: "#f5f5f5",
      prizepoker_black: "#121212",
    },
  },
  fonts: {
    heading: "Azeret Mono, monospace",
    body: "Azeret Mono, monospace",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MainDataProvider>
        <Component {...pageProps} />
      </MainDataProvider>
    </ChakraProvider>
  );
}
