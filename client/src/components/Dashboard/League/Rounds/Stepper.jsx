import React from 'react'
import { Text, Flex, HStack } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'

const Stepper = () => {
    const [selected, setSelected] = React.useState(1)
    const isDesktop = useMediaQuerySSR(600)

    const steps = [
        {
            name: 'Assign Teams',
        },
        {
            name: 'Provide slots',
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
            <HStack spacing={['1rem', '2rem']}>
                {steps.map(({ name }, index) => (
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
                    </HStack>
                ))}
            </HStack>
        </Flex>
    )
}

export default Stepper
