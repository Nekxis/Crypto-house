import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import {collection, getDocs, firestore, query, auth, where, setDoc, doc} from "../firebase/clientApp";
import CardComponent from "../src/cardComponent/CardComponent";
import {login, logout, selectUser} from "../store/userSlice";
import {onAuthStateChanged} from "firebase/auth";
import {coin} from "../Types";


const Favorite = () => {
    const [sv, setSv] = useState(false)
    const [fav, setFav] = useState()
    const sFirestore = useSelector(selectFirestore)
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
        if (db[0] && apiData) {
            const cleanDb = db.map((item) => item.theFirestore)
            setFav(cleanDb[0].map((item: { uuid: string }) => apiData.find((coin: coin) => item.uuid === coin.uuid)))
        }
        setSv(true)

    }

    useEffect(() => {
        if (user) {
            onPageLoad(user.uid)
                .catch(console.error)
        }
    }, [])

    useEffect(() => {
        if (user !== null && sv) {
            const dbPost = async () => {
                await setDoc(doc(firestore, 'favorites', user.uid), {
                    data: sFirestore, //data: sFirestore, -> sFirestore.theFirestore | remove data from db, simplify reducer
                    user: user.uid
                })
            }
            dbPost()
                .catch(console.error)
        }
    }, [sFirestore])

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
