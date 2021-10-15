import { useQuery } from 'react-query'
import { getAllleagues } from 'api'
import { extractData } from 'utils'

const useLeagues = (options = {}) => {
    const { data, isLoading, error } = useQuery(['leagues'], getAllleagues, options)
    const leagues = extractData(data)
    return { leagues, isLoading, error }
}

export default useLeagues
