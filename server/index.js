require('dotenv').config()

const connectDB = require('./db')
const initApp = require('./app')

const DB_URI = process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017/dribblrDB'
const dbName = 'dribblrDB'
connectDB(DB_URI, dbName).then(() => {
    const app = initApp()
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})
