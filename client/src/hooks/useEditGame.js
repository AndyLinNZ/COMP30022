import { useMutation } from 'react-query'
import { editGame } from 'api'

const useEditGame = (options = {}) => {
    return useMutation((data) => editGame(data, data._id), options)
}

export default useEditGame
