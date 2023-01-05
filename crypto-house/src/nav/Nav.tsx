import {Flex, Center, Text, Spacer, Avatar, Heading, Button} from '@chakra-ui/react'
import React from "react";
import {useSelector} from 'react-redux';
import MenuDrawer from "../menuDrawer/MenuDrawer";
import {selectUser} from "../../store/userSlice";

const Nav = () => {
    const user = useSelector(selectUser);

    return (
        <Flex h='5rem'>
            <Center w='7rem' display='flex' flexFlow='column'>
                <Avatar/>
                {user && (
                    <Heading size='xs'>{user.email}</Heading>
                )}
            </Center>
            <Spacer/>
            <Center w='30rem'>
                <Text color='purple.500' fontSize='5xl' fontWeight='700'>Crypto House</Text>
            </Center>
            <Spacer/>
            <Center w='7rem'>
                <Text fontSize='xl'><MenuDrawer/></Text>
            </Center>
        </Flex>
    )
}

export default Nav;
