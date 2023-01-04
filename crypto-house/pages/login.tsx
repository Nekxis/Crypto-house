import {
    Box,
    Button,
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
import * as React from 'react'
import { GitHubIcon } from "../src/loginComponents/IconProvider";
import { PasswordField } from "../src/loginComponents/PasswordField";

export const login = () => (
    <Container maxW="lg" h='100vh' display='flex' py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack w='100%' spacing="8" alignSelf='center'>
            <Stack spacing="6">
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size='lg'>
                        Log in to your account
                    </Heading>
                    <HStack spacing="1" justify="center">
                        <Text color="muted">Don&apos;t have an account?</Text>
                        <Button variant="link" colorScheme="purple">
                            Sign up
                        </Button>
                    </HStack>
                </Stack>
            </Stack>
            <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={{ base: 'transparent', sm: 'bg-surface' }}
                boxShadow={{
                    base: 'none',
                    sm: useColorModeValue('md', 'md-dark')
                }}
                borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Stack spacing="6">
                    <Stack spacing="5">
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" type="email" />
                        </FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <PasswordField />
                    </Stack>
                    <HStack justify="space-between">
                        <Spacer />
                        <Button variant="link" colorScheme="purple" size="sm">
                            Forgot password?
                        </Button>
                    </HStack>
                    <Stack spacing="6">
                        <Button variant='solid' bg='purple.500' color='white'>Sign in</Button>
                        <HStack>
                            <Divider />
                            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                                or continue with
                            </Text>
                            <Divider />
                        </HStack>
                        <Button width="full">
                            <VisuallyHidden>Sign in with GitHub</VisuallyHidden>
                            <GitHubIcon />
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>
)
export default login;
