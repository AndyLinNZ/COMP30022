import { useQuery } from 'react-query'
import { getUserDetails } from 'api'
import { extractData } from 'utils'

const useUserDetails = (options = {}) => {
    const { data, isLoading, error } = useQuery('user', getUserDetails, options)
    const user = extractData(data)
    return { user, isLoading, error }
}

export default useUserDetails
