import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from "next/navigation";
import {
    Flex,
    Center,
    Text,
    Spacer,
    Avatar,
    Heading,
    Popover,
    PopoverHeader,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody,
    PopoverArrow,
    PopoverTrigger,
    Button, Divider
} from '@chakra-ui/react'
import MenuDrawer from "../menuDrawer/MenuDrawer";
import {logout, selectUser} from "../../store/userSlice";
import {userData} from "../../Types";

const Nav = () => {
    const user: userData = useSelector(selectUser);
    const router = useRouter()
    const dispatch = useDispatch()

    return (
        <Flex h='5rem'>
            {user ? (
                <Popover placement='bottom-start'>
                    <PopoverTrigger>
                        <Center w='7rem' display='flex' flexFlow='column'>
                            <Avatar/>
                            {user && (
                                <Heading noOfLines={[1]} maxWidth='24'
                                         size='xs'>{user.email?.substring(0, user.email?.lastIndexOf("@"))}</Heading>
                            )}
                        </Center>
                    </PopoverTrigger>
                    <PopoverContent m='2'>
                        <PopoverArrow/>
                        <PopoverCloseButton/>
                        <PopoverHeader>Your account</PopoverHeader>
                        <PopoverBody px='4' py='0'>
                            {user && (
                                <Text my='2'> Email: {user.email}</Text>
                            )}
                            <Divider/>
                            <Button onClick={() => dispatch(logout())} variant='solid' w='33%'
                                    size='sm' py={1}
                                    my='2'>Log out</Button>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            ) : (
                <Center onClick={() => {
                    !user ? (router.push('/login')) : (router.push('/'))
                }} w='7rem' display='flex' flexFlow='column'>
                    <Avatar/>
                    {user && (
                        // @ts-ignore
                        <Heading noOfLines={[1]} maxWidth='24' size='xs'>{user.email}</Heading>
                    )}
                </Center>)}

            <Spacer/>
            <Center w={{base: "30%", md: '30rem'}}>
                <Text color='purple.500' fontSize={{base: '22px', md: '5xl'}} textAlign='center' fontWeight='700'>Crypto
                    House</Text>
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
