import {
    Alert, AlertIcon, AlertTitle,
    Box,
    Button,
    Checkbox, CloseButton,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input, Spacer,
    Stack,
    Text,
    useColorModeValue, useToast,
    VisuallyHidden,
} from '@chakra-ui/react'
import {
    auth, collection,
    createUserWithEmailAndPassword, firestore,
} from '../firebase/clientApp';
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/userSlice';
import {PasswordField} from "../src/loginComponents/PasswordField";
import {GitHubIcon} from "../src/loginComponents/IconProvider";
import {useRouter} from "next/navigation";
import {useDisclosure} from "@chakra-ui/react-use-disclosure";
import {useCollection} from "react-firebase-hooks/firestore";
import {selectFirestore, setFirestore} from "../store/firestoreSlice";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState(' ');
    const sFirestore = useSelector(selectFirestore)
    const dispatch = useDispatch();
    const router = useRouter()
    const toast = useToast()

    const [favorites] = useCollection(
        collection(firestore, '/favorites'), {}
    )

    const updatePath = favorites?.docs.map((doc) => doc.data().data.theFirestore)
    const serverStore = favorites?.docs.map((doc) => doc.data().data.theFirestore[0])
    // @ts-ignore
    const reduxStore = sFirestore.theFirestore

    const register = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === repeatPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userAuth) => {
                    dispatch(
                        login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                        })
                    )
                    router.push('/')
                })
                .catch((err) => {
                    alert(err);
                });
            if (JSON.stringify(serverStore) !== JSON.stringify(reduxStore) && updatePath) {
                dispatch(
                    setFirestore({
                        theFirestore: updatePath
                    })
                )
            } else {
                toast({
                    title: ` Error`,
                    status: 'error',
                    position: 'top-right',
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: ` Error`,
                status: 'error',
                position: 'top-right',
                isClosable: true,
            })
            return
        }
    };

    return (
        <>
            <CloseButton onClick={() => router.push('/')} mx='1rem' mt='1rem' size='lg'/>
            <Container maxW="lg" h='100vh' display='flex' py={{base: '12', md: '24'}} px={{base: '0', sm: '8'}}>
                <Stack w='100%' spacing="8" alignSelf='center'>
                    <Stack spacing="6">
                        <Stack spacing={{base: '2', md: '3'}} textAlign="center">
                            <Heading size='lg'>
                                Create your account
                            </Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Have an account?</Text>
                                <Button onClick={() => router.push('/login')} variant="link" colorScheme="purple">
                                    Sign in
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>
                    <Box
                        py={{base: '0', sm: '8'}}
                        px={{base: '4', sm: '10'}}
                        bg={{base: 'transparent', sm: 'bg-surface'}}
                        boxShadow={{base: 'none', sm: useColorModeValue('md', 'md-dark')}}
                        borderRadius={{base: 'none', sm: 'xl'}}
                    >
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl isRequired>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email"
                                           type="email"/>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <PasswordField value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel htmlFor="password">Repeat Password</FormLabel>
                                    <PasswordField value={repeatPassword}
                                                   onChange={(e) => setRepeatPassword(e.target.value)}/>
                                </FormControl>
                            </Stack>
                            <HStack>
                                <Checkbox defaultChecked colorScheme='purple'>Agree to Terms and Conditions</Checkbox>
                                <Spacer/>
                            </HStack>
                            <Stack spacing="6">
                                <Button type='submit' onClick={register} variant="solid" bg='purple.500' color='white'>Sign
                                    up</Button>
                                <HStack>
                                    <Divider/>
                                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                        or continue with
                                    </Text>
                                    <Divider/>
                                </HStack>
                                <Button width="full">
                                    <VisuallyHidden>Sign in with GitHub</VisuallyHidden>
                                    <GitHubIcon/>
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default Register;
