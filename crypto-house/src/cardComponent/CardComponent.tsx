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
    Center,
} from '@chakra-ui/react'
import { Sparklines, SparklinesBars } from 'react-sparklines';



const CardComponent: React.FC<{ uuid: string, symbol: string, name: string, iconUrl: string, price: string }> = (props) => {
    const {uuid, symbol, name, iconUrl, price} = props
    const toast = useToast()

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
                        <Heading size='sm' ml={2}> {ParseFloat(price)} </Heading>
                    </Center>
                    <Flex>
                        <Sparklines data={sampleData}>
                            <SparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} />
                            <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
                        </Sparklines>
                    </Flex>
                </SimpleGrid>
            </CardHeader>
            <CardBody>
                <Flex>
                    <Text>{symbol}</Text>
                    <Spacer/>
                    <Button onClick={() => {
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





