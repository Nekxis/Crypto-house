import React, {useEffect} from "react";
import Nav from "../src/nav/Nav";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import CardComponent from "../src/cardComponent/CardComponent";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/clientApp";
import {login, logout} from "../store/userSlice";
import {useDispatch} from "react-redux";

export default function Home() {

    const {data} = useGetStatsByNameQuery()
    const dispatch = useDispatch()
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                // user is logged in, send the user's details to redux, store the current user in the state
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        photoUrl: userAuth.photoURL,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, []);

    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Top Crypto</Heading>
                <SimpleGrid columns={2} spacing={5}>
                    <>
                        {data?.data.coins.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                            return <CardComponent key={uuid} uuid={uuid} symbol={symbol} name={name} iconUrl={iconUrl}
                                                  price={price} change={change} sparkline={sparkline}/>
                        })}
                    </>
                </SimpleGrid>
            </Box>
        </>
    )
}
