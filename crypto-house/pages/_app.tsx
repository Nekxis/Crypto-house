import React, {StrictMode} from 'react';
import {Provider} from "react-redux";
import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import {store} from "../store";

export default function App({Component, pageProps}: AppProps) {


    return (
        <Provider store={store}>
            <ChakraProvider>
                <StrictMode>
                    <Component {...pageProps} />
                </StrictMode>
            </ChakraProvider>
        </Provider>
    )

}
