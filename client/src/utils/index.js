export const extractData = (data) => {
    return data?.data?.data
}

export const isBrowser = () => {
    return typeof window !== 'undefined'
}

export const isLoggedIn = () => {
    return !!(isBrowser() && window.localStorage.getItem('token'))
}
