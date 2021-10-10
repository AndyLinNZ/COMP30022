import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'

import ErrorIcon from 'components/svg/ErrorIcon'
import SuccessIcon from 'components/svg/SuccessIcon'

const Icon = ({ type }) => {
    if (type == 'error') {
        return <ErrorIcon />
    }
    if (type == 'success') {
        return <SuccessIcon />
    }

    return <Box> ? </Box>
}

const Toast = ({ title, type }) => {
    const col = {
        'error': 'red',
        'success': 'green',
    }[type]
    return (
        <Box p="20px 12px" borderRadius="6px" borderLeft={`6px solid ${col}`} bg="white">
            <HStack>
                <Icon type={type} />
                <Text color="black" pl="10px" pr="16px">
                    {title}
                </Text>
            </HStack>
        </Box>
    )
}

Toast.displayName = 'Toast'
Icon.displayName = 'ToastIcon'

export default Toast
