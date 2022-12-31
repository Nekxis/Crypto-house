import React from "react";
import Nav from "../src/nav/Nav";
import {useGetStatsByNameQuery} from "../store";
import CardComponent from "../src/cardComponent/CardComponent";
import {Box, Heading, SimpleGrid} from "@chakra-ui/react";

export default function Home() {

    const {data} = useGetStatsByNameQuery()

    return (
        <>
            {/*{JSON.stringify(data)}*/}
            <Nav/>
            <Box m='1rem'>
                <Heading size='lg' py='2'>Top Crypto</Heading>
            <SimpleGrid columns={2} spacing={5}>
                <>
                {data?.data.coins.map(({uuid,symbol,name,iconUrl}) => {
                   return <CardComponent key={uuid} uuid={uuid} symbol={symbol} name={name} iconUrl={iconUrl}/>
                })}
                </>
            </SimpleGrid>
            </Box>
        </>
    )
}
