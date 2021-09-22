import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'

import ErrorIcon from 'components/svg/ErrorIcon'

const Icon = ({ type }) => {
    if(type == 'error') {
        return <ErrorIcon />
    }

    return <Box> ? </Box>
}

const Toast = ({ title, type }) => {
    return (
        <Box p="20px 12px" borderRadius="6px" borderLeft="6px solid red" bg="white">
            <HStack>
                <Icon type={type} />
                <Text color="black" pl="10px" pr="16px">
                    {title}
                </Text>
            </HStack>
        </Box>
    )
}

export default Toast
