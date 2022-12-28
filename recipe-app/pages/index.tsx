import { Flex, Center, Text, Spacer, Avatar } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Home() {
  return (
    <>
    <main>
      <Flex h='5rem'>
        <Center w='7rem'>
          <Text><Avatar /></Text>
        </Center>
        <Spacer />
        <Center w='30rem'>
          <Text color='green.400' fontSize='5xl' fontWeight='700'>Recipe app</Text>
        </Center>
        <Spacer />
        <Center w='7rem'>
          <Text fontSize='xl'><HamburgerIcon boxSize='8' /></Text>
        </Center>
      </Flex>
    </main>
    </>
  )
}
