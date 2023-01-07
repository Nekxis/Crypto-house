import React from "react";
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
import firebase from "@firebase/app-compat";
// @ts-ignore
import {Sparklines, SparklinesBars, SparklinesLine} from 'react-sparklines';
import {StarIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/userSlice";
import {useCollection} from "react-firebase-hooks/firestore";
import {firestore, collection, setDoc, doc} from "../../firebase/clientApp";
import {setFirestorm, addItem, removeItem, selectFirestore} from "../../store/firestoreSlice";


const CardComponent: React.FC<{ uuid: string, symbol: string, name: string, iconUrl: string, price: string, change: string, sparkline: string[] }> = (props) => {
    const {uuid, symbol, name, iconUrl, price, change, sparkline} = props
    const dispatch = useDispatch()
    const toast = useToast()
    const sFirestore = useSelector(selectFirestore)
    const user = useSelector(selectUser);
    const favoritesRef = collection(firestore, '/favorites')

    const addFavoriteDocument = async (sf: string[], uuid: string, ) => {
        // dispatch(
        //     setFirestorm({
        //
        //     })
        // )
       await dispatch(
            addItem({
                uuid: uuid
            })
        )
        await setDoc(doc(favoritesRef, user.uid), {
             data: sf
        })
    }
    const removeFavoriteDocument = async (sf: string[], uuid: string) => {
       await dispatch(
            removeItem({
                 uuid: uuid
            })
        )
        await setDoc(doc(favoritesRef, user.uid), {
            data: sf
        })
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
                            <Heading size='md' ml={2}> {name} </Heading>
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
                        <IconButton onClick={() => addFavoriteDocument(sFirestore,uuid)} size='sm' aria-label='Star ctypto'
                                    mx='.5em' icon={<StarIcon/>}/>
                        <IconButton onClick={() => removeFavoriteDocument(sFirestore,uuid)} size='md' aria-label='Star ctypto'
                        mx='.5em' icon={<StarIcon/>}/>
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





