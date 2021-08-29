const { ObjectId } = require('mongoose').Types
const League = require('../models/league')
const Season = require('../models/season')
const User = require('../models/user')

async function createLeague(req, res, next) {
    try {
        let { leagueName, organisationName } = req.body
        const newLeague = new League({
            name: leagueName,
            organisation: organisationName,
            creator: req.user._id,
            admins: [req.user._id],
            seasons: [],
        })
        const league = await newLeague.save()
        req.user.leagues.push(newLeague)
        await req.user.save()

        return res.status(201).json({
            success: true,
            data: league,
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
        const league = await req.league.execPopulate('seasons')
        return res.status(200).json({
            success: true,
            data: league.seasons,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

// TODO: validation on name and dates
async function createLeagueSeason(req, res, next) {
    try {
        let { seasonName, seasonStart, seasonFinish } = req.body
        const newSeason = new Season({
            name: seasonName,
            dateStart: seasonStart,
            dateFinish: seasonFinish,
            league: req.league._id,
            grades: [],
        })
        const season = await newSeason.save()
        req.league.seasons.push(newSeason)
        await req.league.save()

        return res.status(201).json({
            success: true,
            data: season,
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
                var validId = ObjectId.isValid(userId)
                var user
                if (validId) user = await User.findById(userId)
                if (!user || !validId) return next({ status: 404, message: 'Some users do not exist' })
                user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { leagues: req.league._id } }
                )
                return user
            })
        )

        const league = await League.findOneAndUpdate(
            { _id: req.league._id },
            { $addToSet: { admins: newLeagueAdmins } },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: league.admins,
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
                var validId = ObjectId.isValid(userId)
                var user
                if (validId) user = await User.findById(userId)
                if (!user || !validId) return next({ status: 404, message: 'Some users do not exist' })
                user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { leagues: { $in: req.league._id } } }
                )
                return user
            })
        )

        const league = await League.findOneAndUpdate(
            { _id: req.league._id },
            {
                $pull: { admins: { $in: toDeleteLeagueAdmins } },
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: league.admins,
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
