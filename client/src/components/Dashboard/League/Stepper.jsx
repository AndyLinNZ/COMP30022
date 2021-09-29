import { ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { Text, Flex, HStack, IconButton } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'

const Stepper = () => {
    const router = useRouter()

    const [selected, setSelected] = React.useState(1)
    const isDesktop = useMediaQuerySSR(600)

    const steps = [
        {
            name: 'SEASON',
            arrow: true,
        },
        {
            name: 'GRADE',
            arrow: true,
        },
        {
            name: 'ROUND',
            arrow: false,
        },
    ]

    React.useEffect(() => {
        steps.forEach(({ name }, index) => {
            if (window.location.pathname.includes(name.toLowerCase())) {
                setSelected(index)
            }
        })
    })

    return (
        <Flex
            w="100%"
            h="100px"
            bg="white"
            borderRadius="1rem"
            alignItems="center"
            justifyContent="center"
        >
            {isDesktop ? (
                <IconButton
                    icon={<ArrowBackIcon />}
                    size="md"
                    boxSize={6}
                    alignSelf="center"
                    justifySelf="center"
                    position="absolute"
                    left="0rem"
                    transform="translateX(-40%)"
                    color="white"
                    bg="greyBg"
                    onClick={() =>
                        router.push(
                            window.location.pathname
                                .split('/')
                                .slice(0, window.location.pathname.split('/').length - 2)
                                .join('/')
                        )
                    }
                />
            ) : (
                <IconButton
                    icon={<ArrowBackIcon />}
                    size="xs"
                    alignSelf="center"
                    justifySelf="center"
                    position="absolute"
                    left="0rem"
                    transform="translateX(-40%)"
                    color="white"
                    bg="greyBg"
                    onClick={() =>
                        router.push(
                            window.location.pathname
                                .split('/')
                                .slice(0, window.location.pathname.split('/').length - 2)
                                .join('/')
                        )
                    }
                />
            )}
            <HStack spacing={['1rem', '2rem']}>
                {steps.map(({ name, arrow }, index) => (
                    <HStack key={name} spacing={['0.25rem', '1rem']} fontSize={['1.25rem', '2rem']}>
                        {isDesktop && (
                            <Flex
                                bg={selected === index ? 'greyBg' : 'grey'}
                                color="white"
                                borderRadius="50%"
                                width="40px"
                                height="40px"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {index + 1}
                            </Flex>
                        )}

                        <Text color={selected === index ? 'greyBg' : 'grey'}>{name}</Text>
                        {arrow && (
                            <ChevronRightIcon
                                w={[12, 16]}
                                h={[12, 16]}
                                color={selected === index ? 'greyBg' : 'grey'}
                            />
                        )}
                    </HStack>
                ))}
            </HStack>
        </Flex>
    )
}

export default Stepper
