import { useQuery } from 'react-query'
import { getAllTeams } from 'api'
import { extractData } from 'utils'

const useLeagues = (options = {}) => {
    const { data, isLoading, error } = useQuery(['teams'], getAllTeams, options)
    const teams = extractData(data)
    return { teams, isLoading, error }
}

export default useLeagues
