import { ChevronRightIcon } from '@chakra-ui/icons'
import { Text, Flex, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const Stepper = () => {
    const [selected, setSelected] = React.useState(1)

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
            <HStack spacing="2rem">
                {steps.map(({ name, arrow }, index) => (
                    <HStack key={name} spacing="1rem">
                        <Flex
                            bg={selected === index ? 'greyBg' : 'grey'}
                            color="white"
                            borderRadius="50%"
                            width="40px"
                            height="40px"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="2rem"
                        >
                            {index + 1}
                        </Flex>
                        <Text fontSize="2rem" color={selected === index ? 'greyBg' : 'grey'}>
                            {name}
                        </Text>
                        {arrow && (
                            <ChevronRightIcon
                                w={16}
                                h={16}
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
