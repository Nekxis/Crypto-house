import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import CardComponent from "../src/cardComponent/CardComponent";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, collection, firestore, getDocs, query} from "../firebase/clientApp";
import {login, logout} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";

export default function Home() {
    const [sv, setSv] = useState(false)
    const sFirestore = useSelector(selectFirestore)
    const dispatch = useDispatch()
    const reduxStore = sFirestore.theFirestore
    const {data} = useGetStatsByNameQuery()

    const q = query(collection(firestore, "/favorites"));

    const onPageLoad = async () => {

        const db: any[] = [];
        const serverStore = await getDocs(q);
        serverStore.forEach((doc) => {
            db.push(doc.data().data.theFirestore)
        });

        if (JSON.stringify(db[0]) !== JSON.stringify(reduxStore) && serverStore) {
            dispatch(
                setFirestore({
                    theFirestore: db
                })
            )

        }
        setSv(true)
        return (db)
    }

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
               onPageLoad()
            } else {
                dispatch(logout());
            }
        });
        onPageLoad()
    }, []);

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
