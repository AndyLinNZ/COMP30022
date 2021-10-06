const emailValidator = require('email-validator')
const User = require('../models/user')
const { formatUserResp, formatUserDetailsResp } = require('./responseFormatters')

async function getUserDetails(req, res, next) {
    try {
        var user = await req.user.execPopulate({
            path: 'teams',
            populate: {
                path: 'games',
                model: 'Game',
            },
        })

        user = await req.user.execPopulate({
            path: 'leagues',
            populate: {
                path: 'seasons',
                model: 'Season',
            },
        })

        return res.status(200).json({
            success: true,
            data: formatUserResp(user),
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const strongPassword = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})')
async function updateUserDetails(req, res, next) {
    try {
        const { firstName, lastName, email, password } = req.body
        if(password && !password.match(strongPassword)) return next({ message: 'Password is too weak' })
        if(email && !emailValidator.validate(email)) return next({ message: 'Invalid email' })
        if(email) {
            const other = await User.findOne({ email }).select('_id').lean()
            if(other && other._id.toString() != req.user._id.toString())
                return next({ message: 'Email in use by another user' })
        }

        const updateQuery = {}

        if(firstName) updateQuery.firstName = firstName
        if(lastName) updateQuery.lastName = lastName
        if(email) updateQuery.email = email

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: updateQuery },
            { new: true, runValidators: true },
        )

        if(password) await user.setPassword(password)
        await user.save()

        return res.status(200).json({
            success: true,
            data: formatUserDetailsResp(user)
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    getUserDetails,
    updateUserDetails,
}
