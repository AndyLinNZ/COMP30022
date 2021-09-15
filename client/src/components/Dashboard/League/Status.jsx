import { Box } from '@chakra-ui/react'
import React from 'react'

const statusConfig = {
    upcoming: {
        color: 'grey',
        bg: 'greyBg',
    },
    active: {
        color: '#00845E',
        bg: '#ECFFF7',
    },
    completed: {
        color: '#004784',
        bg: '#ECF3FF',
    },
}

const Status = ({ status }) => {
    const config = statusConfig[status]
    return (
        <Box p="0.25rem 1rem" fontSize={['0.875rem', '1rem']} {...config}>
            {status.toUpperCase()}
        </Box>
    )
}

export default Status
