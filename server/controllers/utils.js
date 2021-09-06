const { ObjectId } = require('mongoose').Types
const User = require('../models/user')
const Player = require('../models/player')
const GameResult = require('../models/gameResult')

// returns true if all items in arr are valid object ids
const allValidIds = (arr) => arr.every(ObjectId.isValid)

// returns false if any of the given ids are invalid object ids
// or if any of them do not correspond to a user in the database
// returns true otherwise
async function allValidUserIds(ids) {
    if(!allValidIds(ids)) return Promise.resolve(false)
    const users = await User.find({
        _id: { $in: ids.map(ObjectId) }
    })
    return Promise.resolve(users.length === ids.length)
}

// returns false if any of the given ids are invalid object ids
// or if any of them do not correspond to a player in the database
// returns true otherwise
async function allValidPlayerIds(ids) {
    if(!allValidIds(ids)) return Promise.resolve(false)
    const players = await Player.find({
        _id: { $in: ids.map(ObjectId) }
    })
    return Promise.resolve(players.length === ids.length)
}

// returns false if any of the given ids are invalid object ids
// of if any of them do not correspond to a gameResult in the database
// returns true otherwise
async function allValidGameResultIds(ids) {
    if(!allValidIds(ids)) return Promise.resolve(false)
    const gameResults = await GameResult.find({
        _id: { $in: ids.map(ObjectId) }
    })
    return Promise.resolve(gameResults.length === ids.length)
}

// creates a new object containing the key:values specified
// from the original object
const pick = (obj, keys) => {
    var newObj = {}
    keys.forEach(k => {
        newObj[k] = obj[k]
    })
    return newObj
}

module.exports = {
    allValidUserIds,
    allValidPlayerIds,
    allValidGameResultIds,
    pick
}
