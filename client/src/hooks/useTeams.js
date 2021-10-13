import { useQuery } from 'react-query'
import { getAllTeams } from 'api'
import { extractData } from 'utils'

const useTeams = (gradeId = null, options = {}) => {
    const { data, isLoading, error } = useQuery(['teams', gradeId], getAllTeams, {
        ...options,
        enabled: !!gradeId,
    })
    const teams = extractData(data)
    return { teams, isLoading, error }
}

export default useTeams