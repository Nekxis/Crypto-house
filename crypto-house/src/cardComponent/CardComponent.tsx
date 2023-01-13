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
import {firestore, collection, setDoc, doc, query, getDocs, where} from "../../firebase/clientApp";
import {addItem, removeItem, selectFirestore, setFirestore} from "../../store/firestoreSlice";
import {useCollection} from "react-firebase-hooks/firestore";


const CardComponent: React.FC<{ sv: boolean, uuid: string, symbol: string, name: string, iconUrl: string, price: string, change: string, sparkline: string[] }> = (props) => {
    const {sv, uuid, symbol, name, iconUrl, price, change, sparkline} = props
    const [star, setStar] = useState(false)
    const dispatch = useDispatch()
    const sFirestore = useSelector(selectFirestore)
    const user = useSelector(selectUser);

    const toast = useToast()

    const [reduxStore, setReduxStore] = useState([])
    const starred = reduxStore?.filter((item: { uuid: string; }) => item.uuid === uuid)
    const [db, setDb] = useState<string[]>([])

    const onPageLoad = async () => {
        setDb([])
        if (sFirestore.theFirestore !== undefined){
            setReduxStore(sFirestore.theFirestore)
        }
        const q = query(collection(firestore, "favorites"), where('user', '==', user.uid));
        const serverStore = await getDocs(q);
        serverStore.forEach((doc) => {
            setDb((prevState) => [...prevState, doc.data().data.theFirestore])
        });
        console.log(db)
        if (JSON.stringify(db[0]) !== JSON.stringify(reduxStore) && serverStore && db) {
            dispatch(
                setFirestore({
                    theFirestore: db
                })
            )

        }

    }
    console.log(db)


    useEffect(() => {
        if (user !== null) {
            const dbPost = async () => {
                await setDoc(doc(firestore,'favorites', user.uid), {
                    data: sFirestore,
                    user: user.uid
                })
            }
            dbPost()
                .catch(console.error)
        }
        if (starred?.length > 0) {
            setStar(true)
        }
    }, [sFirestore])

    useEffect(()=>{
        if (user){
            onPageLoad()
        }
    }, [])
    console.log(sFirestore)
    const addFavoriteDocument = (uuid: string) => {
            // dispatch(
            //     setFirestore({
            //         theFirestore: db
            //     })
            // )
            dispatch(
                addItem({
                    uuid: uuid
                })
            )
        console.log(db, uuid)
            setStar(true)

    }
    const removeFavoriteDocument = (uuid: string) => {
            // dispatch(
            //     setFirestore({
            //         theFirestore: db
            //     })
            // )
            console.log(db)
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





