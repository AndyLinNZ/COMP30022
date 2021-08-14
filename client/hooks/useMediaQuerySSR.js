import React from 'react'
import { useMediaQuery } from '@chakra-ui/react'

const useMediaQuerySSR = (minWidth) => {
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        if (!loaded) setLoaded(true)
    }, [loaded])

    const [isDesktop] = useMediaQuery(`(min-width: ${minWidth}px)`)

    return loaded && isDesktop
}

export default useMediaQuerySSR
