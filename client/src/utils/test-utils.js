import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'

const Providers = ({ children }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

export const customRender = (ui, options) =>
    render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
