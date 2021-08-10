import { extendTheme } from '@chakra-ui/react'
import '@fontsource/roboto-condensed'

const theme = extendTheme({
    fonts: {
        body: 'Roboto Condensed',
        heading: 'Roboto Condensed',
    },
    colors: {
        grey: '#EBEBEB',
        white: '#fff',
        activeSeasonBg: '#FFF4DD',
        inactiveSeasonBg: '#707070',
        activeSeasonColor: '#F57405',
        inactiveSeasonColor: 'white',
        greyText: '#3E3D3D',
    },
})
export default theme
