import { useMutation } from 'react-query'
import { updateUserDetails } from 'api'

const useUpdateUserDetails = (options = {}) => {
    return useMutation(updateUserDetails, options)
}

export default useUpdateUserDetails
