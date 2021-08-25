import { Button } from '@chakra-ui/react'
import React from 'react'

const defaultColorScheme = {
    bg: 'greyText.500',
    color: 'white',
}

const inverseColorScheme = {
    bg: 'white',
    color: 'greyText.500',
}

const FormButton = ({ inverse = false, onClick, children }) => {
    const colorScheme = inverse ? inverseColorScheme : defaultColorScheme
    return (
        // adding a width to buttons is generally bad practice
        // but with chakra-ui you can't use padding on buttons
        <Button
            borderRadius="999px"
            width="150px"
            height="30px"
            letterSpacing="1px"
            fontWeight="light"
            _hover={{ opacity: 0.95 }}
            {...colorScheme}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default FormButton
