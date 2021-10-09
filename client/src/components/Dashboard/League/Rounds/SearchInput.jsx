import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React from 'react'

const SearchInput = ({ value, onChange, placeholder }) => {
    return (
        <Box width="100%">
            <InputGroup>
                <InputLeftElement top="50%" transform="translateY(-50%)">
                    <SearchIcon color="greyText" />
                </InputLeftElement>
                <Input
                    placeholder={placeholder}
                    _placeholder={{ color: 'greyText' }}
                    borderWidth="3px"
                    minW="320px"
                    size="lg"
                    bg="white"
                    borderRadius="1rem"
                    color="black"
                    value={value}
                    onChange={(event) => onChange(event.currentTarget.value)}
                />
            </InputGroup>
        </Box>
    )
}

export default SearchInput
