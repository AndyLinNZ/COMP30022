import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import '@fontsource/roboto-condensed'
import { theme } from '../theme'

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
