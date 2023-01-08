import React, {useEffect, useState} from "react";
import Nav from "../src/nav/Nav";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";
import {useGetStatsByNameQuery} from "../store/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, firestore} from "../firebase/clientApp";
import CardComponent from "../src/cardComponent/CardComponent";


const Favorite = () => {
    const [fav, setFav] = useState()
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



    useEffect(() => {
        const onPageLoad = () => {

            if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath) {
                dispatch(
                    setFirestore({
                        theFirestore: updatePath
                    })
                )
                const favoriteList = favorite.map((item: string) => {
                    data?.data.coins.filter((coin) => {
                        if (item === coin.uuid) {
                            return coin
                        } else {
                            console.log('err')
                        }
                    })
                })
                setFav(favoriteList)
                console.log(favoriteList)

            } else {
                console.log('err')
            }
        }
        onPageLoad()
    }, [])
    return (
        <>
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Favorite Crypto</Heading>
                <SimpleGrid columns={{md: 2, sm: 1}} spacing={5}>

                </SimpleGrid>
            </Box>
        </>
    )
}
export default Favorite;
