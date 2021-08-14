const mongoose = require('mongoose')
const connectDB = require('../db')
const User = require('../models/user')

/*
 * to be called before declaring tests
 * this function sets up a testing database and
 * cleans it up after tests have finished
 * optionally, a default user can be created
 * for testing authenticated endpoints
 */
function setupTestEnv(dbName, options) {
    beforeAll(async () => {
        await connectDB('mongodb://localhost:27017/', dbName)
        await mongoose.connection.dropDatabase()

        if (options?.createDefaultUser) {
            const userDetails = {
                email: 'john.smith@example.com',
                firstName: 'John',
                lastName: 'Smith'
            }
            const password = 'S3cur3 P4ssw0rd 123!'
            const newUser = new User(userDetails)
            User.register(newUser, password, (err, _) => {
                if (err) throw err
            })
        }
    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    })
}

module.exports = setupTestEnv
