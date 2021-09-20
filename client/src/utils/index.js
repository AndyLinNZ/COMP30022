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
    return user?.leagues?.find(({ _id }) => _id === router.query.leagueName)
}

export const getSeasonFromUser = (user) => {
    const leagues = getLeagueFromUser(user)
    return leagues?.seasons.find(({ _id }) => _id === router.query.seasonName)
}

export const getHumanReadableDate = (dateStr = '1970-01-01') =>
    new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateStr))
