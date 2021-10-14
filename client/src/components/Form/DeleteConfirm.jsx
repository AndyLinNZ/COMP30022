import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import { FormButton } from 'components/Form'

const DeleteConfirm = ({ isOpen, onClose, onDelete, toDeleteText = '' }) => {
    const cancelRef = React.useRef()
    const { mutate: deleteFn, isLoading, isSuccess } = onDelete
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete {toDeleteText}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You cannot undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter spacing="0.5rem">
                        <FormButton onClick={onClose}>Cancel</FormButton>
                        <FormButton
                            bg="red"
                            onClick={() => deleteFn()}
                            isLoading={isLoading || isSuccess}
                            ml={3}
                        >
                            Confirm
                        </FormButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default DeleteConfirm
