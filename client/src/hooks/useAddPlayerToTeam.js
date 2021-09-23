import { useMutation } from 'react-query'
import { addPlayerToTeam } from 'api'

const useAddPlayerToTeam = (options = {}) => {
    return useMutation(addPlayerToTeam, options)
}

export default useAddPlayerToTeam
