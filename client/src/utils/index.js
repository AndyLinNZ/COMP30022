import router from 'next/router'

// extract data from an api call
export const extractData = (data) => {
    return data?.data?.data
}

// returns true if the page has loaded
export const isBrowser = () => {
    return typeof window !== 'undefined'
}

// determines if the user is logged in
export const isLoggedIn = () => {
    return !!(isBrowser() && window.localStorage.getItem('token'))
}

// retrieves league data given a user object
export const getLeagueFromUser = (user) => {
    return user?.leagues?.find(({ _id }) => _id === router.query.leagueId)
}

// retrieves team data given a user object
export const getTeamFromUser = (user) => {
    return user?.teams?.find(({ _id }) => _id === router.query.teamId)
}

// retrieves season data given a user object
export const getSeasonFromUser = (user) => {
    const leagues = getLeagueFromUser(user)
    return leagues?.seasons.find(({ _id }) => _id === router.query.seasonId)
}

// transforms a date string into a human readable format
export const getHumanReadableDate = (dateStr = '1970-01-01') =>
    new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateStr))

// creates an error message based on API response
export const createErrorMessage = (errMsg, pairingText, defaultText) => {
    if (errMsg === 'Input pairing not unique.') {
        return pairingText
    }
    return defaultText
}
