import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,

    useDisclosure, Heading, Divider
} from '@chakra-ui/react'
import {HamburgerIcon} from "@chakra-ui/icons";



const MenuDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<any>()

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
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <Button variant='ghost' w='100%' justifyContent='left' size='sm' py={1} my={1}>Home</Button>
                        <Divider />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MenuDrawer;

