import {Flex, Center, Text, Spacer, Avatar} from '@chakra-ui/react'
import React from "react";
import MenuDrawer from "../menuDrawer/MenuDrawer";

const Nav = () => {
    return (
        <Flex h='5rem'>
            <Center w='7rem'>
                <Text><Avatar/></Text>
            </Center>
            <Spacer/>
            <Center w='30rem'>
                <Text color='green.400' fontSize='5xl' fontWeight='700'>Recipe app</Text>
            </Center>
            <Spacer/>
            <Center w='7rem'>
                <Text fontSize='xl'><MenuDrawer /></Text>
            </Center>
        </Flex>
    )
}

export default Nav;
