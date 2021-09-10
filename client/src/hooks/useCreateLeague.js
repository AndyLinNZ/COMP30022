import { useMutation } from 'react-query'
import { createLeague } from 'api'

const useCreateLeague = (options = {}) => {
    return useMutation(createLeague, options)
}

export default useCreateLeague
