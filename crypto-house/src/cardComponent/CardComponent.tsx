import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Img,
    Flex,
    Spacer,
    Button,
    useToast,
    SimpleGrid,
    Center, IconButton,
} from '@chakra-ui/react'
// @ts-ignore
import {Sparklines, SparklinesBars, SparklinesLine} from 'react-sparklines';
import {StarIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/userSlice";
import {firestore, collection, setDoc, doc} from "../../firebase/clientApp";
import {addItem, removeItem, selectFirestore, setFirestore} from "../../store/firestoreSlice";
import {useCollection} from "react-firebase-hooks/firestore";


const CardComponent: React.FC<{ sv: boolean, uuid: string, symbol: string, name: string, iconUrl: string, price: string, change: string, sparkline: string[] }> = (props) => {
    const {sv, uuid, symbol, name, iconUrl, price, change, sparkline} = props
    const [star, setStar] = useState(false)
    const dispatch = useDispatch()
    const sFirestore = useSelector(selectFirestore)
    const user = useSelector(selectUser);
    const favoritesRef = collection(firestore, '/favorites')
    const toast = useToast()
    const [favorites] = useCollection(
        collection(firestore, '/favorites'), {}
    )

    const updatePath = favorites?.docs.map((doc) => doc.data().data.theFirestore)
    const serverStore = favorites?.docs.map((doc) => doc.data().data.theFirestore[0])
    // @ts-ignore
    const reduxStore = sFirestore.theFirestore
    const starred = reduxStore.filter((item: { uuid: string; }) => item.uuid === uuid)

    useEffect(() => {
        if (user !== null && sv) {
            const dbPost = async () => {
                await setDoc(doc(favoritesRef, user.uid), {
                    data: sFirestore
                })
            }
            dbPost()
                .catch(console.error)
        }
        if (starred.length > 0) {
            setStar(true)
        }
    }, [sFirestore])

    const addFavoriteDocument = (uuid: string,) => {
        if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath && user) {
            dispatch(
                setFirestore({
                    theFirestore: updatePath
                })
            )
            dispatch(
                addItem({
                    uuid: uuid
                })
            )
            setStar(true)

        } else {
            dispatch(
                addItem({
                    uuid: uuid
                })
            )
            setStar(true)
        }
    }
    const removeFavoriteDocument = (uuid: string) => {
        if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath && user) {
            dispatch(
                setFirestore({
                    theFirestore: updatePath
                })
            )
            dispatch(
                removeItem({
                    uuid: uuid
                })
            )
            setStar(false)
        } else {
            dispatch(
                removeItem({
                    uuid: uuid
                })
            )
            setStar(false)
        }
    };

    function ParseFloat(price: string) {
        price = price.slice(0, (price.indexOf(".")) + 5);
        return Number(price);
    }

    return (
        <Card variant='elevated'>
            <CardHeader>
                <SimpleGrid columns={3}>
                    <Flex>
                        <Center>
                            <Img src={iconUrl} h={7}></Img>
                            <Heading size='md' ml={2} noOfLines={[1, 2]}> {name} </Heading>
                        </Center>
                    </Flex>
                    <Center>
                        <Heading size='sm'> {ParseFloat(price)} </Heading>
                    </Center>

                    <Flex>
                        <Center mx='3'>
                            <Heading size='xs'> {change} </Heading>
                        </Center>
                        <Spacer/>
                        <Sparklines data={sparkline}>
                            <SparklinesBars style={{stroke: "white", fill: "#805AD5", fillOpacity: ".25"}}/>
                            <SparklinesLine style={{stroke: "#805AD5", fill: "none"}}/>
                        </Sparklines>
                    </Flex>
                </SimpleGrid>
            </CardHeader>
            <CardBody>
                <Flex>
                    <Text>{symbol}</Text>
                    <Spacer/>
                    {user && (
                        <Center>
                            <IconButton onClick={() =>{star ? (removeFavoriteDocument(uuid)):(addFavoriteDocument(uuid))}} size='sm' aria-label='Star ctypto'
                                        mx='.5em' style={{backgroundColor: star ? '#ECC94B':''}} icon={<StarIcon/>}/>
                        </Center>
                    )}
                    <Button size='sm' onClick={() => {
                        navigator.clipboard.writeText(uuid),
                            toast({
                                title: `Successfully copied!`,
                                status: 'success',
                                position: 'bottom-right',
                                isClosable: true,
                            })
                    }}>Copy UUID</Button>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default CardComponent;





