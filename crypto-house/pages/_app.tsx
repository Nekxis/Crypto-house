import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {ApiProvider} from "@reduxjs/toolkit/dist/query/react";
import {coinApi} from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return(
      <ApiProvider api={coinApi}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      </ApiProvider>
  )

}
