const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const passUsertoView = require('./middleware/pass-user-to-views')
const isSignedIn = require('./middleware/is-signed-in')
const insureadmin = require('./middleware/insureadmin')

// require controllers
const authCtrl = require('./controller/auth')
const categoriesCtrl = require('./controller/categories')
const eventCtrl = require('./controller/events')
const commentsCtrl = require('./controller/comments')

const PORT = process.env.PORT ? process.env.PORT : '3000'

//for style
const path = require('path')
app.use(express.static('public'))
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to mongoDB Database: ${mongoose.connection.name}`)
})

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passUsertoView)
app.use(express.static('public'))

app.use('/auth', authCtrl)
app.use('/categories', isSignedIn, categoriesCtrl)
app.use('/events', isSignedIn, eventCtrl)
app.use('/comments', isSignedIn, commentsCtrl)

// root route
app.get('/', async (req, res) => {
  res.render('index.ejs')
})
app.delete('/comments/my-comments/:commentsId', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentsId)
  res.redirect('/comments')
})

// use controller
app.use('/auth', authCtrl)
app.use('/categories', categoriesCtrl)

// vip lounge
app.get('/vip-lounge', isSignedIn, (req, res) => {
  res.send(`Welcome to the party ${req.session.user.username}`)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
