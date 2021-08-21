import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'
import React from 'react'

export const parameters = {
    controls: { expanded: true },
    layout: 'centered',
}

const theme = extendTheme({
    fonts: {
        body: 'Roboto Condensed',
        heading: 'Roboto Condensed',
    },
    colors: {
        grey: '#EBEBEB',
        white: '#fff',
        activeSeasonBg: '#FFF4DD',
        inactiveSeasonBg: '#707070',
        activeSeasonColor: '#F57405',
        inactiveSeasonColor: 'white',
        // had to add 500 for checkbox
        greyText: {
            500: '#3E3D3D',
        },
        black: {
            500: '#000',
        },
        orange: '#FFBD2D',
        heading: '#15110D',
    },
    breakpoints: ['600px', '1024px', '1440px'],
})

const withChakra = (storyFn) => (
    <ChakraProvider theme={theme}>
        <CSSReset />
        {storyFn()}
    </ChakraProvider>
)

export const decorators = [withChakra]
