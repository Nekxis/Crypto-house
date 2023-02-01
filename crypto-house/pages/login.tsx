import {
    Box,
    Button, CloseButton,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import React, {useState} from 'react';
import {
    auth,
    signInWithEmailAndPassword,
} from '../firebase/clientApp';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/userSlice';
import {GitHubIcon} from "../src/loginComponents/IconProvider";
import {PasswordField} from "../src/loginComponents/PasswordField";
import {useRouter} from "next/navigation";
import {selectFirestore} from "../store/firestoreSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const sFirestore = useSelector(selectFirestore)
    const dispatch = useDispatch();
    const router = useRouter()

    const loginToApp = (e: React.FormEvent) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                    })
                );
                console.log(userAuth)
                router.push('/')
            })
            .catch((err) => {
                alert(err);
            });

    };

    return (
        <>
            <CloseButton onClick={() => router.push('/')} mx='1rem' mt='1rem' size='lg'/>
            <Container maxW="lg" h='100vh' display='flex' py={{base: '12', md: '24'}} px={{base: '0', sm: '8'}}>
                <Stack w='100%' spacing="8" alignSelf='center'>
                    <Stack spacing="6">
                        <Stack spacing={{base: '2', md: '3'}} textAlign="center">
                            <Heading size='lg'>
                                Log in to your account
                            </Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Don&apos;t have an account?</Text>
                                <Button onClick={() => router.push('/register')} variant="link" colorScheme="purple">
                                    Sign up
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>
                    <Box
                        py={{base: '0', sm: '8'}}
                        px={{base: '4', sm: '10'}}
                        bg={{base: 'transparent', sm: 'bg-surface'}}
                        boxShadow={{
                            base: 'none',
                            sm: useColorModeValue('md', 'md-dark')
                        }}
                        borderRadius={{base: 'none', sm: 'xl'}}
                    >
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email"
                                           type="email"/>
                                </FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <PasswordField value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </Stack>
                            <HStack justify="space-between">
                                <Spacer/>
                                <Button variant="link" colorScheme="purple" size="sm">
                                    Forgot password?
                                </Button>
                            </HStack>
                            <Stack spacing="6">
                                <Button onClick={loginToApp} type='submit' variant='solid' bg='purple.500'
                                        color='white'>Sign in</Button>
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
export default Login;
