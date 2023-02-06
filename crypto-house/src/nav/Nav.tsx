import {Flex, Center, Text, Spacer, Avatar, Heading} from '@chakra-ui/react'
import React from "react";
import {useSelector} from 'react-redux';
import MenuDrawer from "../menuDrawer/MenuDrawer";
import {selectUser} from "../../store/userSlice";
import {useRouter} from "next/navigation";

const Nav = () => {
    const user = useSelector(selectUser);
    const router = useRouter()
    return (
        <Flex h='5rem'>
            <Center onClick={() => {
                !user ? (router.push('/login')) : (router.push('/'))
            }} w='7rem' display='flex' flexFlow='column'>
                <Avatar/>
                {user && (
                    <Heading noOfLines={[1]} maxWidth='24' size='xs'>{user.email}</Heading>
                )}
            </Center>
            <Spacer/>
            <Center w={{base: "30%", md: '30rem'}}>
                <Text color='purple.500' fontSize={{ base: '22px', md: '5xl' }} textAlign='center' fontWeight='700'>Crypto House</Text>
            </Center>
            <Spacer/>
            <Center w='7rem'>
                <Text fontSize='xl'><MenuDrawer/></Text>
            </Center>
        </Flex>
    )
    // {{md: '5xl', sm: '3xl'}}
}

export default Nav;
