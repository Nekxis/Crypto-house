import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {StarIcon} from "@chakra-ui/icons";
import {selectUser} from "../../store/userSlice";
import {addItem, removeItem, selectFirestore} from "../../store/firestoreSlice";
// @ts-ignore
import {Sparklines, SparklinesBars, SparklinesLine} from 'react-sparklines';


const CardComponent: React.FC<{ uuid: string, symbol: string, name: string, iconUrl: string, price: string, change: string, sparkline: string[] }> = (props) => {
    const {uuid, symbol, name, iconUrl, price, change, sparkline} = props
    const [star, setStar] = useState(false)
    const dispatch = useDispatch()
    const sFirestore = useSelector(selectFirestore)
    const user = useSelector(selectUser);
    const toast = useToast()
    const reduxStore = sFirestore.theFirestore
    const starred = reduxStore?.filter((item: { uuid: string; }) => item.uuid === uuid)
    useEffect(() => {
        if (starred?.length > 0) {
            setStar(true)
        }
    }, [sFirestore])

    const addFavoriteDocument = (uuid: string) => {
        dispatch(
            addItem({
                uuid: uuid
            })
        )
        setStar(true)
    }

    const removeFavoriteDocument = (uuid: string) => {
        dispatch(
            removeItem({
                uuid: uuid
            })
        )
        setStar(false)
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
                            <IconButton onClick={() => {
                                star ? (removeFavoriteDocument(uuid)) : (addFavoriteDocument(uuid))
                            }} size='sm' aria-label='Star ctypto'
                                        mx='.5em' style={{backgroundColor: star ? '#ECC94B' : ''}} icon={<StarIcon/>}/>
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





