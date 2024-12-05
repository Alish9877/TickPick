const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.get('/sign-up' , (req,res) => {
res.render('auth/sign-up.ejs')
})

router.post('/sign-up' , async (req,res) => {try {
  const UserInDataBase = await User.findOne({username: req.body.username})
  if(UserInDataBase) {
    return res.send('Username already taken')
  }
if (req.body.password !== req.body.confirmPassword)
  return res.send('Password must be match')

const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);
}
catch (error) {
  console.log(error)
}
})

router.get('/sign-in' , (req,res) => {
  res.render('auth/sign-in.ejs')
})

router.post('/sign-in' , async(req,res) => {
  const UserInDataBase = await User.findOne({username: req.body.username})
  if (!UserInDataBase) {
    return res.send('Login faild , please try again')
  }
  const vaildPassword = bcrypt.compareSync(req.body.password,UserInDataBase.password)
  if (!vaildPassword){
    return res.send('Login vaild , please try again')
  }
  req.session.user = {
    username: UserInDataBase.username,
    _id : UserInDataBase._id
  }
  res.redirect('/')
})

router.get('/sign-out' , (req,res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
