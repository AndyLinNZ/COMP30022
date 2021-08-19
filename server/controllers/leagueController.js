const League = require('../models/league')
const Season = require('../models/season')
const User = require('../models/user')

async function createLeague(req, res, next) {
    let { leagueName, organisationName } = req.body
    try {
        const newLeague = new League({
            name: leagueName,
            organisation: organisationName,
            creator: req.user._id,
            admins: [req.user._id],
            seasons: [],
        })
        await newLeague.save()
        req.user.leagues.push(newLeague)
        await req.user.save()

        return res.status(201).json({
            success: true,
            data: newLeague,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getAllLeagues(_, res, next) {
    try {
        const leagues = await League.find().lean()

        return res.status(200).json({
            success: true,
            data: leagues,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getLeague(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            data: req.league,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getAllLeagueSeasons(req, res, next) {
    try {
        await req.league.execPopulate('seasons')
        return res.status(200).json({
            success: true,
            data: req.league.seasons,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createLeagueSeason(req, res, next) {
    try {
        let { seasonName, seasonStart, seasonFinish } = req.body
        const newSeason = new Season({
            name: seasonName,
            dateStart: seasonStart,
            datefinish: seasonFinish,
            league: req.league._id,
            grades: [],
        })
        await newSeason.save()
        req.league.seasons.push(newSeason)
        await req.league.save()

        return res.status(201).json({
            success: true,
            data: newSeason,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createLeagueAdmins(req, res, next) {
    try {
        const newLeagueAdmins = await Promise.all(
            req.body.adminIds.map(async (userId) => {
                const user = await User.findById(userId).lean()
                if (!user) return next({ status: 404, message: 'Some users do not exist' })
                return user.update({ $addToSet: { leagues: req.league._id } })
            })
        )

        await req.league.update({ $addToSet: { admins: newLeagueAdmins } })

        return res.status(201).json({
            success: true,
            data: req.league.admins,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function deleteLeagueAdmins(req, res, next) {
    try {
        const toDeleteLeagueAdmins = await Promise.all(
            req.body.adminIds.map(async (userId) => {
                const user = await User.findById(userId).lean()
                if (!user) return next({ status: 404, message: 'Some users do not exist' })
                return user.update({ $pull: { leagues: { $in: req.params.leagueId } } })
            })
        )

        await req.league.update({ $pull: { admins: { $in: toDeleteLeagueAdmins } } })

        return res.status(200).json({
            success: true,
            data: req.league.admins,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createLeagueAdmins,
    deleteLeagueAdmins,
    getLeague,
    getAllLeagues,
    getAllLeagueSeasons,
    createLeague,
    createLeagueSeason,
}
