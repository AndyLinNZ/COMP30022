import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex, Box, Textarea, Button, VStack, FormLabel, useToast } from '@chakra-ui/react'
import { Input, FormButton } from 'components/Form'
import { useMediaQuerySSR } from 'hooks'
import { appPaths } from 'utils/constants'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import UserHeader from 'components/Header/UserHeader'
import Toast from 'components/Toast'

const contactSchema = yup.object().shape({
    email: yup.string().email('Incorrect email format').required('Email is required'),
    message: yup.string().default(null).required('Message body is required'),
})

const index = ({ w = ['95%', '75%'] }) => {
    const router = useRouter()
    const toast = useToast()
    const isDesktop = useMediaQuerySSR(940)

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(contactSchema),
    })

    const onSubmit = (data) => {
        // TODO: Send Email
        toast({
            render: () => (
                <Toast
                    title="Enquiry successfully sent. We will get back to you shortly."
                    type="success"
                />
            ),
            position: 'top',
            duration: 5000,
        })
    }

    return (
        <Flex
            maxW="100vw"
            h="100vh"
            flexDir="column"
            justifyContent="flex-start"
            bg="grey"
            overflow="hidden"
        >
            <Head>
                <title> Dribblr | Contact Us </title>
            </Head>
            {isDesktop ? <HeroBackDrop /> : <HeroBackDropMobile />}
            <UserHeader />
            <VStack
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={w}
                spacing="0.75rem"
            >
                <VStack spacing="0.25rem" alignSelf="flex-start">
                    <Box fontSize="3rem" lineHeight="1">
                        CONTACT US
                    </Box>
                    <Button
                        alignSelf="flex-start"
                        fontWeight="normal"
                        color="white"
                        bg="greyText.500"
                        px="4"
                        borderRadius="0.75rem"
                        transition="background 0.5s ease, color 0.5s ease"
                        _hover={{ color: 'greyText.500', bg: 'white' }}
                        onClick={() => router.push(appPaths.HOME_PATH)}
                    >
                        GO BACK HOME
                    </Button>
                </VStack>
                <VStack
                    w="100%"
                    h="100%"
                    bg="white"
                    borderRadius="1rem"
                    boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
                    padding="1rem"
                    minH="375px"
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Email Address"
                        placeholder="Email Address"
                        minW="350px"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                    <FormLabel fontSize="1.25rem" alignSelf="flex-start">
                        Message
                    </FormLabel>
                    <Textarea
                        minH="180px"
                        maxH="250px"
                        size="lg"
                        bg="white"
                        borderRadius="1rem"
                        placeholder="Your message..."
                        error={errors.message?.message}
                        {...register('message')}
                    />
                    <FormButton type="submit" color="black" bg="orange">
                        Submit
                    </FormButton>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default index
