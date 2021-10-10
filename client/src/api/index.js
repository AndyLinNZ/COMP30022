import { isLoggedIn } from 'utils'
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
    return await axiosInstance.get('/user/details')
}

export const updateUserDetails = async (details) => {
    const { firstName, lastName, email, password } = details
    const data = await axiosInstance.patch('/user/details', {
        firstName,
        lastName,
        email,
        password,
    })
    return data
}

export const createLeague = async (league) => {
    return await axiosInstance.post('/league', league)
}

export const createTeam = async (team) => {
    return await axiosInstance.post('/team', team)
}

export const editTeam = async (team, teamId) => {
    return await axiosInstance.patch(`/team/${teamId}`, team)
}

export const addPlayerToTeam = async (playerNames, teamId) => {
    return await axiosInstance.post(`/team/${teamId}/player`, playerNames)
}

export const createLeagueSeason = async (season, leagueId) => {
    return await axiosInstance.post(`/league/${leagueId}/season`, season)
}

export const getAllLeagueSeasons = async ({ queryKey }) => {
    return await axiosInstance.get(`/league/${queryKey[1]}/season`)
}

export const getSeason = async ({ queryKey }) => {
    return await axiosInstance.get(`/season/${queryKey[1]}`)
}

export const editSeason = async (season, seasonId) => {
    return await axiosInstance.patch(`/season/${seasonId}`, season)
}

export const editLeague = async (league, leagueId) => {
    return await axiosInstance.patch(`/league/${leagueId}`, league)
}

export const deleteLeague = async (leagueId) => {
    return await axiosInstance.delete(`/league/${leagueId}`)
}

export const getAllSeasonGrades = async ({ queryKey }) => {
    return await axiosInstance.get(`/season/${queryKey[1]}/grade`)
}

export const createSeasonGrade = async (grade, seasonId) => {
    return await axiosInstance.post(`/season/${seasonId}/grade`, grade)
}

export const deleteSeason = async (seasonId) => {
    return await axiosInstance.delete(`/season/${seasonId}`)
}

export const getAllleagues = async () => {
    return await axiosInstance.get('/league')
}

export const getLeague = async ({ queryKey }) => {
    return await axiosInstance.get(`/league/${queryKey[1]}`)
}

export const getAllTeams = async () => {
    return await axiosInstance.get(`/team`)
}

export const getGrade = async ({ queryKey }) => {
    return await axiosInstance.get(`/grade/${queryKey[1]}`)
}

export const getGame = async ({ queryKey }) => {
    return await axiosInstance.get(`/game/${queryKey[1]}`)
}


export const editGame = async (game, gameId) => {
    return await axiosInstance.patch(`/game/${gameId}/details`, game)
}
