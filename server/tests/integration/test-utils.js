const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const connectDB = require('../../db')
const User = require('../../models/user')
require('dotenv').config()

/*
 * to be called before declaring tests
 * this function sets up a testing database and
 * cleans it up after tests have finished
 * optionally, default users can be created
 * for testing authenticated endpoints
 */
function setupTestEnv(dbName, ret, options={}) {
    beforeAll(async () => {
        await connectDB('mongodb://localhost:27017/', dbName)
        await mongoose.connection.dropDatabase()

        if (options?.createDefaultUsers) {
            const usersDetails = [
                [{
                    email: 'john.smith@example.com',
                    firstName: 'John',
                    lastName: 'Smith'
                }, 'S3cur3 P4ssw0rd 123!'],
                [{
                    email: 'jane.doe@example.com',
                    firstName: 'Jane',
                    lastName: 'Doe'
                }, 'PassworD!!1!1']
            ]
            var auth_promises = usersDetails.map(async (details) => {
                var [userDetails, password] = details
                var newUser = new User(userDetails)
                await User.register(newUser, password)
                var auth_token = JWT.sign({ userid: newUser._id },
                    process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '2d' })
                return [newUser._id.toString(), auth_token]
            })
            ret.auth_tokens = await Promise.all(auth_promises)
        }
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    })
}

module.exports = setupTestEnv
