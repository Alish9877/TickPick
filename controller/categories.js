const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Comment = require('../models/comment')
const Categories = require('../models/category')
//root
router.get('/',async(req,res)=>{
  const user = await User.findById(req.session.user._id)
res.render('categories/index.ejs',{user})
})
module.exports = router