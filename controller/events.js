const router = require('express').Router();
const insureadmin = require('../middleware/insureadmin')
const Event = require('../models/event');
// const Category = require('../models/categories');

// router.get('/events' , async (req,res) => {
//   try { const events = await Event.find({}).populate('CategoryId')
//   console.log(events)
//   res.render('events/index.ejs')
// }
// catch (error){
//   console.log(error)
//   res.redirect('/')
// }
// })

router.get('/' , async(req,res) => {
  const events = await Event.find()
res.render('events/index.ejs',{events})
})

router.get('/reserve/:eventId', async(req,res) =>{
const event = await Event.findById(req.params.eventId)
if (event.tickCount <= 0)
  return res.send('Sold out!')
else if (event.tickCount > 0)
  return res.send('Ticket reserved!')
await event.save
})

router.get('/admin/add' , insureadmin ,(req,res) => {
  res.render('addEvent')
})

router.post('/events' , insureadmin , async(req,res) => {
  const newevent = await event.findById(req.session.event._id)
  newevent.event.push(req.body)
  await newevent.save()
})

router.get('/admin/edit/:eventId', insureadmin  , async(req,res) => {
  const event = await Event.findById(req.params.eventId)
  res.render('editEvent' , {event})
})

router.post('/admin/edit/:eventId', insureadmin  , async(req,res) => {
try {
  await Event.findByIdAndUpdate(req.params.eventId , req,body)
  res.redirect('/events')
}
catch (error) {
  console.log(error)
}
})


router.post('/events/delete/:eventId' , insureadmin , async(req,res) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId)
    Event.save()
    res.redirect('/events')
  }
  catch (error){
    console.log(error)
  }
})


module.exports = router