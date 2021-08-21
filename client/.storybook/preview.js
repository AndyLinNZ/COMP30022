import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import React from 'react'
import { theme } from '../theme'

export const parameters = {
    controls: { expanded: true },
    layout: 'centered',
}

const withChakra = (storyFn) => (
    <ChakraProvider theme={theme}>
        <CSSReset />
        {storyFn()}
    </ChakraProvider>
)

export const decorators = [withChakra]
