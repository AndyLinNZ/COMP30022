import { useMutation } from 'react-query'
import { editGameStats } from 'api'

const useEditGameStats = (options = {}) => {
    return useMutation((data) => editGameStats(data, data._id), options)
}

export default useEditGameStats
