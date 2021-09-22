import router from 'next/router'

export const extractData = (data) => {
    return data?.data?.data
}

export const isBrowser = () => {
    return typeof window !== 'undefined'
}

export const isLoggedIn = () => {
    return !!(isBrowser() && window.localStorage.getItem('token'))
}

export const getLeagueFromUser = (user) => {
    return user?.leagues?.find(({ _id }) => _id === router.query.leagueId)
}

export const getTeamFromUser = (user) => {
    return user?.teams?.find(({ _id }) => _id === router.query.teamId)
}

export const getSeasonFromUser = (user) => {
    const leagues = getLeagueFromUser(user)
    return leagues?.seasons.find(({ _id }) => _id === router.query.seasonId)
}

export const getHumanReadableDate = (dateStr) =>
    new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateStr))
