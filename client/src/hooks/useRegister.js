import { useMutation } from 'react-query'
import { registerUser } from 'api'

const useRegister = (options = {}) => {
    return useMutation(registerUser, options)
}

export default useRegister
