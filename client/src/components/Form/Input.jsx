import React from 'react'
import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input as ChakraInput,
} from '@chakra-ui/react'

const Input = ({
    placeholder = 'Enter input',
    label = '',
    type = undefined,
    help = '',
    isDisabled = false,
    ...props
}) => {
    return (
        <FormControl>
            <FormLabel fontSize="1.25rem">{label}</FormLabel>
            <ChakraInput
                // maxW="320px"
                w="320px"
                size="lg"
                bg="white"
                borderRadius="1rem"
                placeholder={placeholder}
                label={label}
                isDisabled={isDisabled}
                type={type}
                color="black"
                {...props}
            />
            <FormHelperText>{help}</FormHelperText>
        </FormControl>
    )
}

export default Input
