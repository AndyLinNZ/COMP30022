import { useMutation } from 'react-query'
import { createTeam } from 'api'

const useCreateTeam = (options = {}) => {
    return useMutation(createTeam, options)
}

export default useCreateTeam
