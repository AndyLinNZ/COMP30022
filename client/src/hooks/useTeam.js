import { useQuery } from 'react-query'
import { getTeam } from 'api'
import { extractData } from 'utils'

const useTeam = (teamId) => {
    const { data, isLoading, error } = useQuery(['team', teamId], getTeam, {
        enabled: !!teamId,
    })
    const team = extractData(data)
    return { team, isLoading, error }
}

export default useTeam
