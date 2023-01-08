import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, doc, getDoc, firestore} from "../firebase/clientApp";
import CardComponent from "../src/cardComponent/CardComponent";


const Favorite = () => {
    const [fav, setFav] = useState([])
    const {data} = useGetStatsByNameQuery()
    const dispatch = useDispatch()
    const sFirestore = useSelector(selectFirestore)
    const [favorites] = useCollection(
        collection(firestore, '/favorites'), {}
    )

    const updatePath = favorites?.docs.map((doc) => doc.data().data.theFirestore)
    const serverStore = favorites?.docs.map((doc) => doc.data().data.theFirestore[0])
    const reduxStore = sFirestore.theFirestore
    const favorite = reduxStore?.map((item: { uuid: string; }) => item.uuid)
    const apiData = data?.data.coins
    const onPageLoad = () => {
        if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath) {
            dispatch(
                setFirestore({
                    theFirestore: updatePath
                })
            )

        }
        let favoriteList = favorite.map((item: string) => apiData?.find((coin) => item === coin.uuid))
        setFav(favoriteList)
    }





    useEffect( () => {
        onPageLoad()
    }, [])
    console.log(sFirestore)
    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Favorite Crypto</Heading>
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>
                    {fav?.map(({uuid , symbol, name, iconUrl, price, change, sparkline}) => {
                        return <CardComponent key={uuid} uuid={uuid} symbol={symbol} name={name} iconUrl={iconUrl}
                        price={price} change={change} sparkline={sparkline}/>
                    })}
                </SimpleGrid>
            </Box>
        </>
    )
}
export default Favorite;
