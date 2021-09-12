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

// TODO: what if there are 2 leagues with the same name?
export const getLeagueFromUser = (user) => {
    return user?.leagues?.find(({ name }) => name === router.query.leagueName)
}

export const getHumanReadableDate = (dateStr) =>
    new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateStr))
