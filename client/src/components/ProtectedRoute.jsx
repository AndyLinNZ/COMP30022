import React from 'react'
import { useRouter } from 'next/router'
import { isBrowser } from 'utils'
import { appPaths } from 'utils/constants'

const ProtectedRoute = ({ children }) => {
    const router = useRouter()

    // auto-redirect to login page if user not logged in and
    // visits a protected route
    React.useEffect(() => {
        if (isBrowser()) {
            const isLoggedIn = !!window.localStorage.getItem('token')
            const unprotectedRoutes = [
                appPaths.LOGIN_PATH,
                appPaths.SIGN_UP_PATH,
                appPaths.HOME_PATH,
                appPaths.LEAGUE_PATH,
                appPaths.LEAGUE_SEASON_PATH,
                appPaths.LEAGUE_GRADE_PATH,
            ]

            const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1
            if (!isLoggedIn && pathIsProtected) {
                router.push(appPaths.LOGIN_PATH)
            }
        }
    }, [])

    return children
}

export default ProtectedRoute
