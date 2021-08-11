import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React from 'react'

const AssociationSearch = () => {
    return (
        <Box as="form" width="100%" px={['10%', '20%']} onSubmit={() => {}}>
            <InputGroup>
                <InputLeftElement top="50%" transform="translateY(-50%)">
                    <SearchIcon color="white" />
                </InputLeftElement>
                <Input
                    color="white"
                    height="60px"
                    placeholder="Looking for a basketball league?"
                    borderWidth="3px"
                    _placeholder={{ color: 'white' }}
                    _focus={{}}
                />
            </InputGroup>
        </Box>
    )
}

export default AssociationSearch
