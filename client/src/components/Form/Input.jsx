import React from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
} from '@chakra-ui/react'

const Input = React.forwardRef(
    (
        {
            placeholder = 'Enter input',
            label = '',
            type = undefined,
            error = '',
            isDisabled = false,
            isRequired = false,
            ...props
        },
        ref
    ) => {
        return (
            <FormControl
                isRequired={isRequired}
                isDisabled={isDisabled}
                isInvalid={error}
            >
                <FormLabel fontSize="1.25rem">{label}</FormLabel>
                <ChakraInput
                    // maxW="320px"
                    w="320px"
                    size="lg"
                    bg="white"
                    borderRadius="1rem"
                    placeholder={placeholder}
                    label={label}
                    type={type}
                    color="black"
                    ref={ref}
                    {...props}
                />
                <FormErrorMessage fontSize="0.75rem" color="greyText.500">
                    {error}
                </FormErrorMessage>
            </FormControl>
        )
    }
)

Input.displayName = 'Input'

export default Input
