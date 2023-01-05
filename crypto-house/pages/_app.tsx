import React, {useEffect} from 'react';
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {ApiProvider} from "@reduxjs/toolkit/dist/query/react";
import {coinApi, store} from "../store";
import {login, logout, selectUser} from "../store/userSlice"
import {Provider, useDispatch, useSelector} from "react-redux";
import {auth, onAuthStateChanged} from "../firebase/clientApp";


export default function App({Component, pageProps}: AppProps) {
    // const user = useSelector(selectUser);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     onAuthStateChanged(auth, (userAuth) => {
    //         if (userAuth) {
    //             dispatch(
    //                 login({
    //                     email: userAuth.email,
    //                     uid: userAuth.uid,
    //                     displayName: userAuth.displayName,
    //                     photoUrl: userAuth.photoURL,
    //                 })
    //             );
    //         } else {
    //             dispatch(logout());
    //         }
    //     });
    // }, []);

    return (
        <Provider store={store}>
            <ApiProvider api={coinApi}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </ApiProvider>
        </Provider>
    )

}
