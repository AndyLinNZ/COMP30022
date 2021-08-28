import { useMutation } from 'react-query'
import { login } from 'api'

const useLogin = (options = {}) => {
    return useMutation(login, options)
}

export default useLogin
