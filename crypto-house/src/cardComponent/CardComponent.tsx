import React from "react";
import {Card, CardHeader, CardBody, Heading, Text, Img, Flex} from '@chakra-ui/react'

const CardComponent: React.FC<{uuid: string, symbol: string, name: string, iconUrl:string}> = (props) => {
const {uuid, symbol, name, iconUrl} = props
    return (
        <Card variant='elevated'>
            <CardHeader>
                <Flex>
                <Img src={iconUrl} h={7}></Img>
                <Heading size='md' ml={2}> {name} </Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>{symbol}</Text>
            </CardBody>
        </Card>
    )
}

export default CardComponent;





