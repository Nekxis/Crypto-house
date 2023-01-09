import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import {collection, getDocs, firestore, query, auth} from "../firebase/clientApp";
import CardComponent from "../src/cardComponent/CardComponent";
import {login, logout, selectUser} from "../store/userSlice";
import {onAuthStateChanged} from "firebase/auth";


const Favorite = () => {
    const sv = true
    const [fav, setFav] = useState([])
    const user = useSelector(selectUser)
    const {data} = useGetStatsByNameQuery()
    const dispatch = useDispatch()
    const sFirestore = useSelector(selectFirestore)
    const reduxStore = sFirestore.theFirestore
    const apiData = data?.data.coins


    const onPageLoad = async () => {
        const q = query(collection(firestore, "favorites"));
        const db: string[] | any = [];
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
        let favoriteList = db[0].map((item: { uuid: string; }) => apiData?.find((coin) => item.uuid === coin.uuid))
        setFav(favoriteList)

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
        if (user){
        onPageLoad()
        }
    }, [sFirestore])

    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Favorite Crypto</Heading>
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>
                    {fav?.map(({uuid, symbol, name, iconUrl, price, change, sparkline}) => {
                        return <CardComponent key={uuid} sv={sv} uuid={uuid} symbol={symbol} name={name}
                                              iconUrl={iconUrl}
                                              price={price} change={change} sparkline={sparkline}/>
                    })}
                </SimpleGrid>
            </Box>
        </>
    )
}
export default Favorite;
