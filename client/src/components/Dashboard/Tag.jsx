import { Box } from '@chakra-ui/react'
import React from 'react'

const style = {
    players: {
        color: 'white',
        bg: 'greyText.500',
    },
    upcoming: {
        color: '#f57405',
        bg: '#fff4dd',
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

const Tag = ({ type, text }) => {
    return (
        <Box borderRadius="4px" p="0.25rem 1rem" fontSize={['0.675rem', '0.9rem']} {...style[type]}>
            {text.toUpperCase()}
        </Box>
    )
}

export default Tag
