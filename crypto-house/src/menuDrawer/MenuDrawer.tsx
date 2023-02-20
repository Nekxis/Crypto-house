import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Divider,
    useDisclosure,
} from '@chakra-ui/react'
import {HamburgerIcon} from "@chakra-ui/icons";
import {logout, selectUser} from "../../store/userSlice";
import {clearFirestore} from "../../store/firestoreSlice";

const MenuDrawer = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)
    const router = useRouter()

    return (
        <>
            <Button bg='purple.500' ref={btnRef} colorScheme='teal' onClick={onOpen}>
                <HamburgerIcon boxSize='8'/>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <Button variant='ghost' w='100%' justifyContent='left' size='sm' py={1} my={1}
                                onClick={() => router.push('/')}>Home</Button>
                        <Divider/>
                        {user && (
                            <>
                                <Button variant='ghost' w='100%' justifyContent='left' size='sm' py={1}
                                        my={1} onClick={() => router.push('/favorite')}>Favorites</Button>
                                <Divider/>
                            </>
                        )}
                    </DrawerBody>
                    {!user ? (
                        <DrawerFooter display='flex' flexDirection='column'>

                            <Button onClick={() => router.push('/login')} variant='ghost' w='100%' justifyContent='left'
                                    size='sm' py={1}
                                    my={1}>Login</Button>
                            <Divider/>
                            <Button onClick={() => router.push('/register')} variant='ghost' w='100%'
                                    justifyContent='left' size='sm' py={1}
                                    my={1}>Register</Button>

                        </DrawerFooter>
                    ) : (
                        <DrawerFooter display='flex' flexDirection='column'>
                            <Divider/>
                            <Button onClick={() => {
                                dispatch(logout())
                                dispatch(clearFirestore())
                            }} variant='ghost' w='100%'
                                    justifyContent='left' size='sm' py={1}
                                    my={1}>Log out</Button>

                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MenuDrawer;

