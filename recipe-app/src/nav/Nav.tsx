import {Flex, Center, Text, Spacer, Avatar} from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
import React from "react";

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
                <Text fontSize='xl'><HamburgerIcon boxSize='8'/></Text>
            </Center>
        </Flex>
    )
}

export default Nav;
