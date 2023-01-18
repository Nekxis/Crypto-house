import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import {collection, getDocs, firestore, query, auth, where} from "../firebase/clientApp";
import CardComponent from "../src/cardComponent/CardComponent";
import {login, logout, selectUser} from "../store/userSlice";
import {onAuthStateChanged} from "firebase/auth";
import {coin, uuid} from "../Types";


const Favorite = () => {
    const sv = true
    const [fav, setFav] = useState([])
    const [db, setDb] = useState<string[]>([])
    const user = useSelector(selectUser)
    const {data} = useGetStatsByNameQuery()
    const dispatch = useDispatch()
    const sFirestore = useSelector(selectFirestore)
    const apiData = data?.data.coins


    const onPageLoad = async () => {
        setDb([])
        const q = query(collection(firestore, "favorites"), where('user', '==', user.uid));
        const serverStore = await getDocs(q);
        serverStore.forEach((doc) => {
            setDb((prevState) => [...prevState, doc.data().data.theFirestore])
        });

        dispatch(
            setFirestore({
                theFirestore: db
            })
        )


        setFav(db?.map((item: uuid[]) => apiData?.find((coin: coin[] | undefined) => item.uuid === coin.uuid)))

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
            } else {
                dispatch(logout());
            }
        });
        if (user) {
            onPageLoad()
        }
    }, [])

    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Favorite Crypto</Heading>
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>
                    {fav?.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                        return <CardComponent key={uuid} db={db} uuid={uuid} symbol={symbol} name={name}
                                              iconUrl={iconUrl}
                                              price={price} change={change} sparkline={sparkline}/>
                    })}
                </SimpleGrid>
            </Box>
        </>
    )
}
export default Favorite;
