#!/usr/bin/env node

const yargs = require('yargs/yargs')
const logger = require('node-color-log')
const mongoose = require('mongoose')

const connectDB = require('../db')
const User = require('../models/user')
const League = require('../models/league')
const Season = require('../models/season')
const Grade = require('../models/grade')
const Team = require('../models/team')
const Player = require('../models/player')
const Round = require('../models/round')
const Game = require('../models/game')
const PlayerStat = require('../models/playerStat')

const { InternalId, users, leagues, seasons, grades, teams, players, rounds, games } = require('./test-db-data')

const argv = yargs(process.argv)
    .option('db', {
        alias: 'd',
        type: 'string',
        required: true,
        description: 'URI of database to populate',
    })
    .option('clear', {
        alias: 'c',
        type: 'boolean',
        description: 'Clear entire database before populating (be careful with this!)'
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .argv

// attempts to convert all InternalId instances occuring in details
// into their object ids (IN-PLACE)
const populateIds = (obj) => {
    for(var k in obj) {
        if(typeof obj[k] == 'object' && obj[k] instanceof InternalId) {
            obj[k] = obj[k].objId
        } else if(typeof obj[k] == 'object') {
            populateIds(obj[k])
        }
    }
}

async function setupUsers() {
    await Promise.all(users.map(async (details) => {
        let { email, firstName, lastName } = details
        var newUser = new User({ email, firstName, lastName })
        await User.register(newUser, details.password)
        details.id.objId = newUser._id.toString()
        logger.info(`user ${details.id.name} created: ${details.id.objId}`)
    }))
}

async function setupLeagues() {
    await Promise.all(leagues.map(async (details) => {
        var leagueIID = details.id
        populateIds(details)
        var newLeague = new League(details)
        await newLeague.save()
        leagueIID.objId = newLeague._id.toString()
        logger.info(`league ${leagueIID.name} created: ${leagueIID.objId}`)

        // update the league admins
        await Promise.all(details.admins.map(async (userId) => {
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { leagues: leagueIID.objId } }
            )
        }))
    }))
}

async function setupSeasons() {
    await Promise.all(seasons.map(async (details) => {
        var seasonIID = details.id
        populateIds(details)
        var newSeason = new Season(details)
        await newSeason.save()
        seasonIID.objId = newSeason._id.toString()
        logger.info(`season ${seasonIID.name} created: ${seasonIID.objId}`)

        // update this season's parent league
        await League.findOneAndUpdate(
            { _id: details.league },
            { $push: { seasons: seasonIID.objId } }
        )
    }))
}

async function setupGrades() {
    await Promise.all(grades.map(async (details) => {
        var gradeIID = details.id
        populateIds(details)
        var newGrade = new Grade(details)
        await newGrade.save()
        gradeIID.objId = newGrade._id.toString()
        logger.info(`grade ${gradeIID.name} created: ${gradeIID.objId}`)

        // update this grades's parent season
        await Season.findOneAndUpdate(
            { _id: details.season },
            { $push: { grades: gradeIID.objId } }
        )
    }))
}

async function setupTeams() {
    await Promise.all(teams.map(async (details) => {
        var teamIID = details.id
        populateIds(details)
        var newTeam = new Team(details)
        await newTeam.save()
        teamIID.objId = newTeam._id.toString()
        logger.info(`team ${teamIID.name} created: ${teamIID.objId}`)

        // update this teams' grades
        await Promise.all(details.grades.map(async (gradeId) => {
            await Grade.findOneAndUpdate(
                { _id: gradeId },
                { $push: { teams: teamIID.objId } }
            )
        }))

        // update the team admin
        await User.findOneAndUpdate(
            { _id: details.admin },
            { $push: { teams: teamIID.objId } }
        )
    }))
}

async function setupPlayers() {
    await Promise.all(players.map(async (details) => {
        var playerIID = details.id
        populateIds(details)
        var newPlayer = new Player(details)
        await newPlayer.save()
        playerIID.objId = newPlayer._id.toString()
        logger.info(`player ${playerIID.name} created: ${playerIID.objId}`)

        // update this player's team
        await Team.findOneAndUpdate(
            { _id: details.team },
            { $push: { players: playerIID.objId } }
        )
    }))
}

async function setupRounds() {
    await Promise.all(rounds.map(async (details) => {
        var roundIID = details.id
        populateIds(details)
        var newRound = new Round(details)
        await newRound.save()
        roundIID.objId = newRound._id.toString()
        logger.info(`round ${roundIID.name} created: ${roundIID.objId}`)

        // update this rounds's parent grade's fixture
        await Grade.findOneAndUpdate(
            { _id: details.grade },
            { $push: { fixture: roundIID.objId } }
        )
    }))
}

async function setupGames() {
    await Promise.all(games.map(async (details) => {
        var gameIID = details.id
        populateIds(details)

        // iterate through the playersStats for each team,
        // create a new PlayerStat object and replace the field
        // with the new objectid
        var team1PlayerStats = await Promise.all(
            details.team1.playersStats.map(async (psDetails) => {
                populateIds(psDetails)
                var newPS = new PlayerStat(psDetails)
                await newPS.save()
                return newPS._id.toString()
            })
        )

        var team2PlayerStats = await Promise.all(
            details.team2.playersStats.map(async (psDetails) => {
                populateIds(psDetails)
                var newPS = new PlayerStat(psDetails)
                await newPS.save()
                return newPS._id.toString()
            })
        )

        details.team1.playersStats = team1PlayerStats
        details.team2.playersStats = team2PlayerStats

        var newGame = new Game(details)
        await newGame.save()
        gameIID.objId = newGame._id.toString()
        logger.info(`game ${gameIID.name} created: ${gameIID.objId}`)

        // update this games's parent round
        await Round.findOneAndUpdate(
            { _id: details.round },
            { $push: { games: gameIID.objId } }
        )

        // update the participating teams' games list
        await Team.findOneAndUpdate(
            { _id: details.team1.team },
            { $push: { games: gameIID.objId } }
        )

        await Team.findOneAndUpdate(
            { _id: details.team2.team },
            { $push: { games: gameIID.objId } }
        )
    }))
}

async function main() {
    if(argv.v) {
        logger.setLevel('debug')
    } else {
        logger.setLevel('info')
    }

    logger.debug(`Connecting to database ${argv.db}`)
    await connectDB(argv.db)

    if(argv.clear) {
        logger.warn('Clearing database!')
        await mongoose.connection.dropDatabase()
        logger.warn('Database cleared')
    }

    logger.debug('Setting up users...')
    await setupUsers()

    logger.debug('Setting up leagues...')
    await setupLeagues()

    logger.debug('Setting up seasons...')
    await setupSeasons()

    logger.debug('Setting up grades...')
    await setupGrades()

    logger.debug('Setting up teams...')
    await setupTeams()

    logger.debug('Setting up players...')
    await setupPlayers()

    logger.debug('Setting up rounds...')
    await setupRounds()

    logger.debug('Setting up games...')
    await setupGames()

    logger.debug('All done! Closing database connection...')
    await mongoose.connection.close()
}


main()
