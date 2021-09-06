import { useRouter } from 'next/router'
import { isBrowser } from 'utils'
import { appPaths } from 'utils/constants'

const ProtectedRoute = ({ children }) => {
    const router = useRouter()

    if (isBrowser()) {
        const isLoggedIn = !!window.localStorage.getItem('token')
        const unprotectedRoutes = [appPaths.LOGIN_PATH, appPaths.SIGN_UP_PATH, appPaths.HOME_PATH]
        const pathIsProtected = unprotectedRoutes.indexOf(window.location.pathname) === -1
        if (!isLoggedIn && pathIsProtected) {
            router.push(appPaths.LOGIN_PATH)
        }
    }

    return children
}

export default ProtectedRoute
