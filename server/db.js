const mongoose = require('mongoose')
require('dotenv').config()

function connectDB(DB_URI, dbName) {
    return new Promise((res, _) => {
        mongoose
            .connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                dbName
            })
            .then(() => {
                mongoose.set('toJSON', { virtuals: true })
                console.log('Connected to DB!')
                return res()
            })
    })
}

module.exports = connectDB
