export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// some of the basic accessible paths
export const appPaths = {
    LOGIN_PATH: '/login',
    SIGN_UP_PATH: '/register',
    HOME_PATH: '/',
    DASHBOARD_TEAMS_PATH: '/dashboard/teams',
    DASHBOARD_TEAMS_DETAILS_PATH: '/dashboard/teams/[teamId]/games',
    DASHBOARD_CREATE_TEAM_PATH: '/dashboard/teams/create',
    DASHBOARD_LEAGUES_PATH: '/dashboard/leagues',
    DASHBOARD_CREATE_LEAGUE_PATH: '/dashboard/leagues/create',
    DASHBOARD_PROFILE_PATH: '/dashboard/profile',
    LOG_OUT_PATH: '/logout',
    LEAGUE_PATH: '/leagues',
    LEAGUE_SEASON_PATH: '/leagues/[leagueId]/seasons',
    LEAGUE_GRADE_PATH: '/leagues/[leagueId]/seasons/[seasonId]/grades',
    LEAGUE_ROUND_PATH: '/leagues/[leagueId]/seasons/[seasonId]/grades/[gradeId]/rounds',
    LEAGUE_LADDER_PATH: '/leagues/[leagueId]/seasons/[seasonId]/grades/[gradeId]/rounds/ladder',
    GAME_PATH: '/games',
    GAMES_PATH: '/games/[gameId]',
    ABOUT_PATH: '/about',
    CONTACT_PATH: '/contact',
}

export const requiredText = 'This is a required field.'
