const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const methdOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected' , () => {
  console.log(`Connected to mongoDB Database: ${mongoose.connection.name}`)
})


const PORT = process.env.PORT ? process.env.PORT : '3000'
app.listen(PORT , () => {
  console.log(`Listening on port ${PORT}`)
})