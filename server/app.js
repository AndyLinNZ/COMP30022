const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./docs')
const User = require('./models/user')
require('dotenv').config()

function initApp() {
    const app = express()

    // set up basic middleware
    app.use(cors())
    app.use(bodyParser.json())
    app.use(morgan('combined'))

    // set up passport auth
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
    const jwtOpts = {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        algorithms: ['HS256'],
    }
    passport.use(
        new JwtStrategy(jwtOpts, (payload, next) => {
            User.findOne({ username: payload.username })
                .then((user) => next(null, user || false))
                .catch((_) => next(null, false))
        })
    )

    // set up routing
    app.use('/api', require('./routes/api'))

    // set up swagger ui
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

    app.use((_, res) => {
        res.status(400).end('404')
    })

    return app
}

module.exports = initApp
