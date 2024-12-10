const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Categories = require('../models/category')


//Root route
router.get('/' , async(req,res) => {
  const categories = await Categories.find()
  const user = await User.findById(req.session.user._id)
res.render('categories/index.ejs',{categories,user})
})

//add new category
router.get('/new', async(req,res)=>{
  res.render('categories/new.ejs')
})

router.post('/', async(req,res)=>{
req.body.owner = req.session.user._id
await Categories.create(req.body)
res.redirect('/categories')
})

//show 
//-> go to events

//delete




module.exports = router
