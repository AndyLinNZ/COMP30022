import { EditIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

const EditButton = ({ name }) => {
    const router = useRouter()
    return (
        <IconButton
            icon={<EditIcon />}
            size="lg"
            alignSelf="center"
            justifySelf="center"
            cursor="pointer"
            onClick={() => router.push(`${window.location.pathname}/${name}/edit`)}
            marginLeft="1rem"
        />
    )
}

export default EditButton