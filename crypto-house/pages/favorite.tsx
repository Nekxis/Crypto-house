import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {collection, getDocs, firestore, query, auth, where, setDoc, doc} from "../firebase/clientApp";
import {onAuthStateChanged} from "firebase/auth";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {login, logout, selectUser} from "../store/userSlice";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import CardComponent from "../src/cardComponent/CardComponent";
import Nav from "../src/nav/Nav";
import {coin, Firestore, uuid} from "../Types";

const Favorite = () => {
    const [overrideProtection, setOverrideProtection] = useState(false)
    const [fav, setFav] = useState<(coin | undefined)[]>([])
    const firestoreDataStore = useSelector(selectFirestore)
    const user = useSelector(selectUser)
    const {data} = useGetStatsByNameQuery()
    const dispatch = useDispatch()
    const apiData: coin[] | undefined = data?.data.coins

    const onPageLoad = async (user: string) => {
        const db: Firestore[] = []
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
        }


        const cleanDb: uuid[][] = db.map((item: Firestore) => item.theFirestore)
        setFav(cleanDb[0].map((item: uuid) => apiData?.find((coin: coin) => item.uuid === coin.uuid)).filter(coin => coin !== undefined))
        setOverrideProtection(true)
    }

    useEffect(() => {
        if (user) {
            onPageLoad(user.uid)
                .catch(console.error)
        }
    }, [user])

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
            } else {
                dispatch(logout());
            }
        });
    }, [])

    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Favorite Crypto</Heading>
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>
                    {
                        // @ts-ignore
                        fav.length >= 0 && fav.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                            return <CardComponent key={uuid} uuid={uuid} symbol={symbol} name={name} iconUrl={iconUrl}
                                                  price={price} change={change} sparkline={sparkline}/>
                        })}
                </SimpleGrid>
            </Box>
        </>
    )
}

export default Favorite;
