import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

const DatePicker = ({
    control,
    label,
    isRequired,
    name = 'DatePicker',
    placeHolder = 'DD/MM/YYYY',
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                return (
                    <FormControl isRequired={isRequired} isInvalid={error} pos="relative">
                        <FormLabel fontSize="1.25rem">{label}</FormLabel>
                        <ReactDatePicker
                            popperProps={{
                                positionFixed: true,
                            }}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            placeholderText={placeHolder}
                            dateFormat="dd/MM/yyyy"
                        />
                        <FormErrorMessage pos="absolute" fontSize="0.75rem" color="greyText.500">
                            {error?.message}
                        </FormErrorMessage>
                    </FormControl>
                )
            }}
        />
    )
}

export default DatePicker
