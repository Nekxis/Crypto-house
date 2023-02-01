import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {setFirestore} from "../store/firestoreSlice";
import {collection, getDocs, firestore, query, auth, where} from "../firebase/clientApp";
import CardComponent from "../src/cardComponent/CardComponent";
import {login, logout, selectUser} from "../store/userSlice";
import {onAuthStateChanged} from "firebase/auth";
import {coin} from "../Types";


const Favorite = () => {
    const [fav, setFav] = useState<string[]>([])
    const user = useSelector(selectUser)
    const {data} = useGetStatsByNameQuery()
    const dispatch = useDispatch()
    const apiData = data?.data.coins


    const onPageLoad = async (user: string) => {
        const db: string[] = []
        const q = query(collection(firestore, "favorites"), where('user', '==', user));
        const serverStore = await getDocs(q)
        if (serverStore) {
            serverStore.forEach((doc) => {
                // setDb(doc.data().data);
                db.push(doc.data().data)
            });
            if (db[0]) {
                console.log("test", db, db[0])
                dispatch(
                    setFirestore({
                        theFirestore: db[0]
                    })
                )
            }
        }
        if (db[0] && apiData) {
            const cleanDb = []
            cleanDb.push(db[0])
            setFav(cleanDb.map((item: string) => apiData.find((coin: coin) => item === coin.uuid)))
        }


    }

    useEffect(() => {
        if (user) {
            onPageLoad(user.uid)
                .catch(console.error)
        }
    }, [])


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
                    {fav?.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                        return <CardComponent key={uuid} uuid={uuid} symbol={symbol} name={name}
                                              iconUrl={iconUrl}
                                              price={price} change={change} sparkline={sparkline}/>
                    })}
                </SimpleGrid>
            </Box>
        </>
    )
}
export default Favorite;
