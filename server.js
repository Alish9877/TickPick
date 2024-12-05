const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')

//middlewares require
const passUserToView = require('./middleware/pass-user-to-views')
const isSignedIn = require('./middleware/is-signed-in')



//Data connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected' , () => {
  console.log(`Connected to mongoDB Database: ${mongoose.connection.name}`)
})

// Middlewares
app.use(morgan('dev'))






// port
const PORT = process.env.PORT ? process.env.PORT : '3000'
app.listen(PORT , () => {
  console.log(`Listening on port ${PORT}`)
})