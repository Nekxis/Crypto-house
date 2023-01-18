import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import CardComponent from "../src/cardComponent/CardComponent";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, collection, doc, firestore, getDocs, onSnapshot, query, setDoc, where} from "../firebase/clientApp";
import {login, logout, selectUser} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import favorite from "./favorite";


export default function Home() {
    const [sv, setSv] = useState(false)
    const [db, setDb] = useState<string[]>([])
    const user = useSelector(selectUser)
    const sFirestore = useSelector(selectFirestore)
    const dispatch = useDispatch()
    const {data} = useGetStatsByNameQuery()


    const onPageLoad = async () => {
        const q = query(collection(firestore, "favorites"), where('user', '==', user.uid));
        const serverStore = await getDocs(q);
        serverStore.forEach((doc) => {
            setDb((prevState) => [...prevState, doc.data().data.theFirestore])
        });
        console.log(db)
        if (db !== undefined){
        // dispatch(
        //     setFirestore({
        //         theFirestore: db
        //     })
        // )
        }
        setSv(true)
    }
    useEffect(() => {
        if (user) {
            onPageLoad()
        }
    }, [user])

    useEffect(() => {
        if (user !== null && sv) {
            const dbPost = async () => {
                await setDoc(doc(firestore, 'favorites', user.uid), {
                    data: sFirestore,
                    user: user.uid
                })
            }
            dbPost()
                .catch(console.error)
        }
        console.log(sFirestore)
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
        console.log(user)
        if (user) {
            onPageLoad()
        }
    }, []);

    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Top Crypto</Heading>
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>
                    <>
                        {data?.data.coins.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                            return <CardComponent key={uuid} db={db} uuid={uuid} symbol={symbol} name={name}
                                                  iconUrl={iconUrl}
                                                  price={price} change={change} sparkline={sparkline}/>
                        })}
                    </>
                </SimpleGrid>
            </Box>
        </>
    )
}
