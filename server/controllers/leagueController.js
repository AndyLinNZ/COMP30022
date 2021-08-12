const League = require('../models/league')
const Season = require('../models/season')
const User = require('../models/user')

async function createLeague(req, res, next) {
    let { leagueName, organisationName, userId } = req.body
    try {
        const user = await User.findById(userId).lean()
        if (!user) return next({ message: 'User does not exist' })

        const newLeague = new League({
            name: leagueName,
            organisation: organisationName,
            admins: [user],
            seasons: [],
        })
        await newLeague.save()

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
        const league = await League.findById(req.params.leagueId).lean()
        if (!league) return next({ message: 'League does not exist' })

        return res.status(200).json({
            success: true,
            data: league,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getAllLeagueSeasons(req, res, next) {
    try {
        const league = await League.findById(req.params.leagueId)
        if (!league) return next({ message: 'League does not exist' })

        return res.status(200).json({
            success: true,
            data: league.seasons,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createLeagueSeason(req, res, next) {
    let { seasonName, seasonStart } = req.body
    try {
        const league = await League.findById(req.params.leagueId)
        if (!league) return next({ message: 'League does not exist' })

        const newSeason = new Season({
            name: seasonName,
            dateStart: seasonStart,
            grades: [],
        })
        await newSeason.save()
        league.seasons.push(newSeason)
        await league.save()

        return res.status(201).json({
            success: true,
            data: newSeason,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function addLeagueAdmin(req, res, next) {
    try {
        // update order rating
        await League.updateOne(
            { _id: req.params.leagueId },
            { $push: { admins: req.body.adminIds } }
        )
        const updatedLeague = await League.findById(req.params.leagueId)
        if (!updatedLeague) return next({ message: 'League does not exist' })

        return res.status(200).json({
            success: true,
            data: updatedLeague.admins,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    addLeagueAdmin,
    getLeague,
    getAllLeagues,
    getAllLeagueSeasons,
    createLeague,
    createLeagueSeason,
}
