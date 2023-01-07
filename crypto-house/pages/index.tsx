import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import CardComponent from "../src/cardComponent/CardComponent";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, collection, firestore} from "../firebase/clientApp";
import {login, logout, selectUser} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useCollection} from "react-firebase-hooks/firestore";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";

export default function Home() {
    const [sv, setSv] = useState(false)
    const user = useSelector(selectUser)
    const sFirestore = useSelector(selectFirestore)
    const dispatch = useDispatch()
    const [favorites] = useCollection(
        collection(firestore, '/favorites'), {}
    )

    const updatePath = favorites?.docs.map((doc) => doc.data().data.theFirestore)
    const serverStore =  favorites?.docs.map((doc) => doc.data().data.theFirestore[0])
    const reduxStore = sFirestore.theFirestore
    const {data} = useGetStatsByNameQuery()
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
                if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath ) {
                    dispatch(
                        setFirestore({
                            theFirestore: updatePath
                        })
                    )
                    setSv(true)
                } else {
                    setSv(true)
                }
            } else {
                dispatch(logout());
            }
        });
    }, []);

    useEffect(()=>{
        const onPageLoad = () => {

            if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath && user) {
                dispatch(
                    setFirestore({
                        theFirestore: updatePath
                    })
                )
                setSv(true)
            } else {
                setSv(true)
            }
        }
        onPageLoad()
    }, [])

    console.log(updatePath, sFirestore)
    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Top Crypto</Heading>
                <SimpleGrid columns={{ md:2, sm:1}} spacing={5}>
                    <>
                        {data?.data.coins.map(({uuid , symbol, name, iconUrl, price, change, sparkline}) => {
                            return <CardComponent key={uuid} sv={sv} uuid={uuid} symbol={symbol} name={name} iconUrl={iconUrl}
                                                  price={price} change={change} sparkline={sparkline}/>
                        })}
                    </>
                </SimpleGrid>
            </Box>
        </>
    )
}
