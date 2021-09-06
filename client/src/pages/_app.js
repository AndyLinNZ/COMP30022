import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { theme } from 'theme'
import ProtectedRoute from 'components/ProtectedRoute'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
            </ChakraProvider>
        </QueryClientProvider>
    )
}

export default MyApp
