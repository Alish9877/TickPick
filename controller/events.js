const router = require('express').Router();
const Event = require('../models/event');
const Event = require('../models/categories');

router.get('/' , async (req,res) => {
  try { const events = await Event.find({}).populate('CategoryId')
  console.log(events)
  res.render('events/index.ejs')
}
catch (error){
  console.log(error)
  res.redirect('/')
}
})