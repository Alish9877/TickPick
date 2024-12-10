const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const Categories = require('../controller/categories')

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs')
})

router.use('/categories', Categories)

router.post('/sign-up', async (req, res) => {
  try {
    const UserInDataBase = await User.findOne({ username: req.body.username })
    if (UserInDataBase) {
      return res.send('Username already taken')
    }
    if (req.body.password !== req.body.confirmPassword)
      return res.send('Password must be match')

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const user = await User.create(req.body)
    res.send(`Thanks for signing up ${user.username}`)
  } catch (error) {
    console.log(error)
  }
})

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs')
})

router.post('/sign-in', async (req, res) => {
  const UserInDataBase = await User.findOne({ username: req.body.username })
  if (!UserInDataBase) {
    return res.send('Login faild , please try again')
  }
  const vaildPassword = bcrypt.compareSync(
    req.body.password,
    UserInDataBase.password
  )
  if (!vaildPassword) {
    return res.send('Login vaild , please try again')
  }
  req.session.user = {
    username: UserInDataBase.username,
    _id: UserInDataBase._id,
    role: UserInDataBase.role
  }
  res.redirect('/categories')
})

router.get('/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

//profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    if (!user) {
      return res.send('User not found')
    }
    //the render
    res.render('auth/profile.ejs', { user })
  } catch (error) {
    console.error(error)
  }
})

router.get('/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    if (!user) {
      return res.send('User not found')
    }
    //the render
    res.render('auth/edit.ejs', { user })
  } catch (error) {
    console.error(error)
  }
})

// router.put('/update/:userId',async (req,res)=>{

//   const user = await User.findById(req.params.userId)
//   const oldPassword =req.body.oldPassword
//   // old password is correct
//   const isSimilar = bcrypt.compareSync(oldPassword,user.password)

//   if(!isSimilar){
//     res.send('Old Password is Incorrect')
//   }

//   if(oldPassword === user.password){
//     res.send('New Password must be different from the old password')
//   }

//   user.img.url = req.body.img

//   if (req.body.newPassword) {
//     user.password = await bcrypt.hash(req.body.newPassword, 10)
//   }
//   await user.save()

//   await user.updateOne(req.body)
//   console.log(req.body)
//   res.redirect('/')
// })
router.put('/update/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    //is a user?
    if (!user) {
      res.send('User not Found.')
    }
    //edit username
    if (req.body.username) {
      user.username = req.body.username
    }

    //the password user inputed
    const oldPassword = req.body.oldPassword

    // Check if the real password similar to inputed password
    const isSimilar = bcrypt.compareSync(oldPassword, user.password)

    if (!isSimilar) {
      res.send('Old Password is Incorrect')
    }

    // new password is different than old one
    if (req.body.newPassword && oldPassword === req.body.newPassword) {
      res.send('New Password must be Different Than the Old Password')
    }

    // Update image
    if (req.body.img) {
      user.img.url = req.body.img
    }

    // Update password if a new one is provided
    if (req.body.newPassword) {
      user.password = await bcrypt.hash(req.body.newPassword, 10)
    }
    await user.save()

    console.log(req.body)
    res.redirect('/auth/profile')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router

router.delete('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  console.log(user)
  
  await user.deleteOne()
  res.redirect('/')
})
