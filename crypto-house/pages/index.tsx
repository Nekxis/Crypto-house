import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, collection, doc, firestore, getDocs, query, setDoc, where} from "../firebase/clientApp";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {login, logout, selectUser} from "../store/userSlice";
import CardComponent from "../src/cardComponent/CardComponent";
import Nav from "../src/nav/Nav";

export default function Home() {
    const [overrideProtection, setOverrideProtection] = useState(false)
    const user = useSelector(selectUser)
    const firestoreDataStore = useSelector(selectFirestore)
    const dispatch = useDispatch()
    const {data} = useGetStatsByNameQuery()

    const onPageLoad = async (user: string) => {
        const db: string[] = []
        const q = query(collection(firestore, "favorites"), where('user', '==', user));
        const serverStore = await getDocs(q)
        if (serverStore) {
            serverStore.forEach((doc) => {
                db.push(doc.data().data)
            });
            if (db[0]) {
                dispatch(
                    setFirestore({
                        theFirestore: db[0]
                    })
                )
            }
            setOverrideProtection(true)
        }
    }

    useEffect(() => {
        if (user) {
            onPageLoad(user.uid)
                .catch(console.error)
        }
    }, [])

    useEffect(() => {
        if (user !== null && overrideProtection) {
            const dbPost = async () => {
                await setDoc(doc(firestore, 'favorites', user.uid), {
                    data: firestoreDataStore,
                    user: user.uid
                })
            }
            dbPost()
                .catch(console.error)
        }
    }, [firestoreDataStore])

    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        photoUrl: userAuth.photoURL,
                    })
                );
                onPageLoad(userAuth.uid)
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
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>
                    <>
                        {data?.data.coins.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                            return <CardComponent key={uuid} uuid={uuid} symbol={symbol} name={name}
                                                  iconUrl={iconUrl}
                                                  price={price} change={change} sparkline={sparkline}/>
                        })}
                    </>
                </SimpleGrid>
            </Box>
        </>
    )
}
