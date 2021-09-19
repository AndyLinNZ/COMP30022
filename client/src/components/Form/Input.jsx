import React from 'react'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    Select,
} from '@chakra-ui/react'

const RenderInput = React.forwardRef(({ type, placeholder, label, children, ...props }, ref) => {
    if (type === 'select') {
        return (
            <Select placeholder={placeholder} label={label} type={type} ref={ref} {...props}>
                {children}
            </Select>
        )
    }

    return <ChakraInput placeholder={placeholder} label={label} type={type} ref={ref} {...props} />
})

const Input = React.forwardRef(
    (
        {
            placeholder = 'Enter input',
            label = '',
            type = 'text',
            error = '',
            isDisabled = false,
            isRequired = false,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <FormControl isRequired={isRequired} isDisabled={isDisabled} isInvalid={error}>
                <FormLabel fontSize="1.25rem">{label}</FormLabel>
                <RenderInput
                    minW="320px"
                    size="lg"
                    bg="white"
                    borderRadius="1rem"
                    placeholder={placeholder}
                    label={label}
                    type={type}
                    color="black"
                    ref={ref}
                    {...props}
                >
                    {children}
                </RenderInput>
                <FormErrorMessage fontSize="0.75rem" color="greyText.500">
                    {error}
                </FormErrorMessage>
            </FormControl>
        )
    }
)

Input.displayName = 'Input'
RenderInput.displayName = 'RenderInput'

export default Input
