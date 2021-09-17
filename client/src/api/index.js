import axiosInstance from './axios'

export const registerUser = async (user) => {
    const data = await axiosInstance.post('/auth/register', user)
    return data
}

export const login = async (user) => {
    const { email, password } = user
    const data = await axiosInstance.post('/auth/login', {
        username: email,
        password,
    })
    return data
}

export const getUserDetails = async () => {
    const data = await axiosInstance.get('/user/details')
    return data
}

export const createLeague = async (league) => {
    return await axiosInstance.post('/league', league)
}

export const createLeagueSeason = async (season, leagueId) => {
    return await axiosInstance.post(`/league/${leagueId}/season`, season)
}

export const getAllLeagueSeasons = async ({ queryKey }) => {
    return await axiosInstance.get(`/league/${queryKey[1]}/season`)
}

export const editLeague = async (league, leagueId) => {
    return await axiosInstance.patch(`/league/${leagueId}`, leagueId, league)
}

export const deleteLeague = async (leagueId) => {
    return await axiosInstance.delete(`/league/${leagueId}`, leagueId)
}